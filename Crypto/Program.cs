using Crypto.Services.Interfaces;
using DBRepository;
using DBRepository.Interfaces;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Quartz;
using Quartz.Impl;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Crypto
{
	public class Program
    {
		public static async Task Main(string[] args)
		{
			var host = BuildWebHost(args);
			await InitService.GetSystemService(host);

			#region Scheduler 

			StdSchedulerFactory factory = new StdSchedulerFactory();
			IScheduler scheduler = await factory.GetScheduler();
			await scheduler.Start();

			#region Scheduler Calculate Money
			IJobDetail CalcMoneyJob = JobBuilder.Create<CalcMoney>()
				.WithIdentity("CalcMoneyJob", "GroupCalc")
				.Build();

			ITrigger TriggerCalc = TriggerBuilder.Create()
				.WithIdentity("TriggerCalc", "GroupCalc")
				.WithCronSchedule("0 58 17 ? * FRI *")
				.ForJob("CalcMoneyJob", "GroupCalc")
				.Build();
			await scheduler.ScheduleJob(CalcMoneyJob, TriggerCalc);

			#endregion

			#region Scheduler Update BTC

			IJobDetail UpdateBTCJob = JobBuilder.Create<UpdateBTC>()
				.WithIdentity("UpdateBTCJob", "GroupBTC")
				.Build();

			ITrigger TriggerBTC = TriggerBuilder.Create()
				.WithIdentity("TriggerBTC", "GroupBTC")
				.WithCronSchedule("* * * ? * * *")
				.ForJob("UpdateBTCJob", "GroupBTC")
				.Build();
			await scheduler.ScheduleJob(UpdateBTCJob, TriggerBTC);
            
			#endregion
            
			#endregion

            host.Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>()
				.Build();
	}

	public class CalcMoney : IJob
	{
		public async Task Execute(IJobExecutionContext context)
		{
			var system = InitService.service;
			await system.AddCommission();
			await system.AddProfit();
		}
	}

	public class UpdateBTC : IJob
	{
		public async Task Execute(IJobExecutionContext context)
		{
			var system = InitService.service;
			await system.UpdateBTCRate();
		}
	}

	static class InitService
	{
		public static ISystemService service;
		public static async Task GetSystemService(IWebHost host)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(Directory.GetCurrentDirectory())
				.AddJsonFile("appsettings.json");
			var config = builder.Build();

			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;

				var factory = services.GetRequiredService<IRepositoryContextFactory>();
				try
				{
					using (var context = factory.CreateDbContext(config.GetConnectionString("DefaultConnection")))
					{
						await DbInitializer.Initialize(context);
					}
				}
				catch (Exception e)
				{
					Console.Beep();
					Console.WriteLine(e.Message);
					Console.ReadLine();
					Environment.Exit(-1);
				}

				service = services.GetRequiredService<ISystemService>();
			}
		}
	}

}

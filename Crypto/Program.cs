using Crypto.Services.Interfaces;
using DBRepository;
using DBRepository.Interfaces;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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
				catch (System.Data.SqlClient.SqlException e)
				{
					Console.Beep();
					Console.WriteLine(e.Message);
					Console.ReadLine();
					Environment.Exit(-1);
				}

				var systemService = services.GetRequiredService<ISystemService>();
				Helpers.TaskScheduler.Instance.ScheduleTask(0, 5, () => { systemService.UpdateBTCRate(); });

				int Day = 0;
				if (DateTime.Now.DayOfWeek == DayOfWeek.Saturday)
					Day = 6;
				else
				{
					if (DateTime.Now.DayOfWeek == DayOfWeek.Friday)
						Day = 0;
					else
						Day = DayOfWeek.Friday - DateTime.Now.DayOfWeek;
				}
				int Hour = 17 - DateTime.Now.Hour;
				int AddHour = (Day * 24) + Hour;
				int AddMinute = 59 - DateTime.Now.Minute;
				if (AddHour < 0)
					AddHour += 168;


				Helpers.TaskScheduler.Instance.ScheduleTask(AddHour, AddMinute, 168, () => { systemService.AddCommission(); });
				Helpers.TaskScheduler.Instance.ScheduleTask(AddHour, AddMinute, 168, () => { systemService.AddProfit(); });
			}

			host.Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>()
				.Build();
	}
}

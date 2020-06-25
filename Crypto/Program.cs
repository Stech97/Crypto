﻿using Crypto.Services.Interfaces;
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
					Environment.Exit(-1);
				}
				var adminService = services.GetRequiredService<IAdministratorService>();
				Helpers.TaskScheduler.Instance.ScheduleTask(0, 5, () => { adminService.UpdateBTCRate(); });
			}

			host.Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>()
				.Build();
	}
}

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DBRepository.Interfaces;
using DBRepository.Repositories;
using Microsoft.AspNetCore.Http;
using DBRepository;
using AutoMapper;
using Crypto.Services.Interfaces;
using Crypto.Services.Implementation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Crypto.Helpers;
using System;
using Microsoft.Extensions.Hosting;

namespace Crypto
{
    public class Startup
    {
		public Startup(IConfiguration configuration) => Configuration = configuration;

		public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
					.AddJwtBearer(options =>
					{
						options.RequireHttpsMetadata = false;
						options.SaveToken = true;
						options.TokenValidationParameters = new TokenValidationParameters
						{
							ValidIssuer = AuthOptions.ISSUER,
							ValidAudience = AuthOptions.AUDIENCE,
							IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
							ValidateLifetime = true,
							ValidateIssuerSigningKey = true,
							ClockSkew = TimeSpan.Zero
						};
					});

			services.AddControllers();
			services.AddAutoMapper();

			services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();

			services.AddScoped<IIdentityRepository>(provider => new IdentityRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));

			services.AddScoped<IInvestmentRepository>(provider => new InvestmentRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));

			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddSingleton(Configuration);
			services.AddScoped<IIdentityService, IdentityService>();
			services.AddScoped<IInvestmentService, InvestmentService>();
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();
			app.UseRouting();
			app.UseAuthorization();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "DefaultApi",
					pattern: "api/{controller}/{action}/{id?}");
			});
		}
    }
}

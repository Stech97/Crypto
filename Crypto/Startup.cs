using Microsoft.AspNetCore.Builder;
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
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Crypto
{
    public class Startup
    {
		public Startup(IConfiguration configuration) => Configuration = configuration;

		public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
			services.AddCors(options =>
			{
				options.AddPolicy("CorsPolicy",
					builder => builder.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader());
			});
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

            #region Repository
            services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
			services.AddScoped<IIdentityRepository>(provider => 
			new IdentityRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
			
			services.AddScoped<IInvestmentRepository>(provider => 
			new InvestmentRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
			
			services.AddScoped<IEmailRepository>(provider => 
			new EmailRepository (Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));

			services.AddScoped<IDashboardRepository>(provider => 
			new DashboardRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
            
			services.AddScoped<IAdministratorRepository>(provider =>
			new AdminstratorRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));

			services.AddScoped<ISystemRepository>(provider =>
			new SystemRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
			#endregion

			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddSingleton(Configuration);

			#region Service
			services.AddScoped<IIdentityService, IdentityService>();
			services.AddScoped<IInvestmentService, InvestmentService>();
			services.AddScoped<IEmailService, EmailService>();
			services.AddScoped<IDashboardService, DashboardService>();
			services.AddScoped<IAdministratorService, AdministratorService>();
			services.AddScoped<ISystemService, SystemService>();
            #endregion
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
			if (env.IsDevelopment())
				app.UseDeveloperExceptionPage();
			/*else
				app.UseHsts();

			app.UseHttpsRedirection();*/
			app.UseAuthentication(); 
			app.UseCors("CorsPolicy");
			app.UseRouting();
			app.UseAuthorization();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
    }
}

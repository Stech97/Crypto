using Crypto.Helpers;
using Crypto.Services.Interfaces;
using Crypto.Services.Implementation;
using DBRepository;
using DBRepository.Interfaces;
using DBRepository.Repositories;
using AutoMapper;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;

namespace Crypto
{
    public class Startup
    {

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }
		public IAntiforgery Antiforgery { get; }

		public void ConfigureServices(IServiceCollection services)
        {
			services.ConfigureApplicationCookie(options => {
				options.Cookie.SameSite = SameSiteMode.Strict;
			});

			services.AddCors(options =>
			{
				options.AddPolicy("CorsPolicy",
				builder => 
					builder.WithOrigins("https://defima.io", "http://localhost:3000", "https://administrator.defima.io")
					.WithMethods("GET", "POST", "PUT", "DELETE", "PATCH")
					.AllowAnyHeader()
					.AllowCredentials());
			});

			services.AddAuthentication(opt =>
			{
				opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}) 
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

			services.AddAuthentication(options => 
			{
				options.DefaultScheme = "Cookies";
			})
			.AddCookie("Cookies", options => 
			{
				options.Cookie.Name = ".AspNetCore.Application.Id";
				options.Cookie.SameSite = SameSiteMode.Strict;
				options.Events = new CookieAuthenticationEvents
				{
					OnRedirectToLogin = redirectContext =>
					{
						redirectContext.HttpContext.Response.StatusCode = 401;
						return Task.CompletedTask;
					}
				};
			});


			services.AddAuthorization(options =>
			{
				options.DefaultPolicy = new AuthorizationPolicyBuilder(
					JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();
			});

			services.AddAntiforgery(options => { options.HeaderName = "x-xsrf-token"; });

			services.AddControllers();
			services.AddAutoMapper(typeof(MappingProfile));

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

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery  antiforgery)
        {
			if (env.IsDevelopment())
				app.UseDeveloperExceptionPage();
			else
				app.UseHsts();

			app.UseHttpsRedirection();
			app.UseCors("CorsPolicy");

			app.UseCookiePolicy(new CookiePolicyOptions
			{
				MinimumSameSitePolicy = SameSiteMode.Strict,
				HttpOnly = HttpOnlyPolicy.Always,
				Secure = CookieSecurePolicy.Always
			});

			app.UseSecureJwt(); 
			app.UseAuthentication();
			app.UseXsrfProtection(antiforgery);

			app.UseRouting();
			app.UseAuthorization();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
    }
}

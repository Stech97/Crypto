using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Crypto.Helpers;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Crypto.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private readonly IIdentityService _identityService;

		public IdentityController(IIdentityService identityService)
		{
			_identityService = identityService;
		}

		[Route("token")]
		[HttpPost]
		public async Task<IActionResult> Token([FromBody] IdentityViewModel model)
		{
			ClaimsIdentity identity = null;
			var user = await _identityService.GetUser(model.Username);
			if (user != null)
			{
				var sha256 = new SHA256Managed();
				var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(model.Password)));
				var passwordUser = user.Password;
				var username = user.Username;
                if (passwordHash == passwordUser)
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, username),
                    };
                    identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                }
				LoginHistoryViewModel request = new LoginHistoryViewModel
				{
					IP = model.IP,
					LoginTime = DateTime.Now,
					UserId = user.UserId
				};
				await _identityService.SetLoginHistory(request);
			}
			if (identity == null)
				return Unauthorized();

			var now = DateTime.UtcNow;
			// создаем JWT-токен
			var jwt = new JwtSecurityToken(
					issuer: AuthOptions.ISSUER,
					audience: AuthOptions.AUDIENCE,
					notBefore: now,
					claims: identity.Claims,
					expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
					signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			var response = new
			{
				access_token = encodedJwt,
				username = identity.Name
			};

			return Ok(response);
		}

		[Route("CreateLogin")]
		[HttpPost]
		public async Task<IActionResult> CreateLogin(LoginViewModel login)
		{
			using (SHA256Managed sha256 = new SHA256Managed())
			{
				login.Password = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(login.Password)));
			}
			await _identityService.AddUser(login);
			return Ok();
		}
	}
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Crypto.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using Crypto.Helpers;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using Crypto.ViewModels;

namespace Crypto.Controllers
{
	[Route("api/[controller]")]
	public class IdentityController : Controller
    {
		IIdentityService _service;

		public IdentityController(IIdentityService service)
		{
			_service = service;
		}

		[Route("token")]
		[HttpPost]
		public async Task<IActionResult> Token([FromBody]IdentityViewModel model)
		{
			var identity = await GetIdentity(model.Username, model.Password);
			if (identity == null)
			{
				return Unauthorized();
			}

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

		private async Task<ClaimsIdentity> GetIdentity(string userName, string password)
		{
			ClaimsIdentity identity = null;
			object user = await _service.GetUser(userName);
			if (user != null)
			{
				var sha256 = new SHA256Managed();
				var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
				string passwordUser = user.GetType().GetProperty("Password").GetValue(user).ToString();
				string username = user.GetType().GetProperty("Username").GetValue(user).ToString();
				if (passwordHash == passwordUser)
				{
					var claims = new List<Claim>
					{
						new Claim(ClaimsIdentity.DefaultNameClaimType, username),
					};
					identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
				}
			}
			return identity;
		}
	}
}
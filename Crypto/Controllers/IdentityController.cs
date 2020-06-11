using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Crypto.Helpers;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Identity;
using Microsoft.AspNetCore.Authorization;
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
						new Claim(ClaimsIdentity.DefaultRoleClaimType, "admin")
					};
					identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
				}
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

			LoginHistoryViewModel request = new LoginHistoryViewModel
			{
				IP = model.IP,
				LoginTime = DateTime.Now,
				UserId = user.Id,
				Country = model.Country,
				Token = encodedJwt
			};

			await _identityService.SetLoginHistory(request);

			UserViewModel response = new UserViewModel
			{
				Id = user.Id,
				Username = user.Username,
				FirstName = user.FirstName,
				LastName = user.LastName,
				Email = user.Email,
				Token = encodedJwt,
				IsVerified = user.IsVerified
			};
			var timeOut = DateTime.Now.AddMinutes(AuthOptions.LIFETIME);
			Helpers.TaskScheduler.Instance.ScheduleTask
				(timeOut.Hour, timeOut.Minute, timeOut.Second, timeOut.Millisecond, 0, () => { _identityService.SignOut(user.Id); });
			return Ok(response);
		}

		[Route("GetUser")]
		[HttpGet]
		public async Task<IActionResult> GetUser(int Id)
		{
			return Ok(await _identityService.GetUser(Id));
		}

		[Route("CreateLogin")]
		[HttpPost]
		public async Task<IActionResult> CreateLogin([FromBody] LoginViewModel login)
		{
			using (SHA256Managed sha256 = new SHA256Managed())
			{
				login.Password = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(login.Password)));
			}

			var ConfirmEmail = new
			{
				hash = await _identityService.AddUser(login)
			};
			return Ok(ConfirmEmail);
		}

		//[Authorize]
		[Route("SignOut")]
		[HttpDelete]
		public async Task<IActionResult> SignOut(int Id)
		{
			await _identityService.SignOut(Id);
			return NoContent();
		}

		//[Authorize]
		[Route("ChangePassword")]
		[HttpPatch]
		public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel request, int Id)
		{
			using (SHA256Managed sha256 = new SHA256Managed())
			{
				request.Password = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(request.Password)));
			}
			await _identityService.ChangePassword(request, Id);
			return Ok();
		}

		[Route("CheckInfo")]
		[HttpPost]
		public async Task<IActionResult> CheckInfo([FromBody] CheckViewModel request)
		{
			var result = await _identityService.CheckInfo(request);
			if (result != null)
				return Ok(result);
			else
				return Ok();

		}

		[Route("ConfirmEmail")]
		[HttpGet]
		public async Task<IActionResult> ConfirmEmail(string Id)
		{
			return Ok(await _identityService.ConfirmEmail(Id));
		}

		[Route("FogotPassword")]
		[HttpPost]
		public async Task<IActionResult> FogotPassword(CheckViewModel request)
		{
			return Ok(await _identityService.FogotPassword(request));
		}

		[Route("AcceptFogot")]
		[HttpGet]
		public async Task<IActionResult> AcceptFogot(string Id)
		{
			return Ok(await _identityService.AcceptFogot(Id));
		}
	}
}

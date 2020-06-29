using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
	[Route("[controller]")]
	public class IdentityController : Controller
	{
		private readonly IIdentityService _identityService;

		public IdentityController(IIdentityService identityService)
		{
			_identityService = identityService;
		}

		#region No Authorize

		#region Confirm
		[Route("ConfirmEmail")]
		[HttpGet]
		public async Task<IActionResult> ConfirmEmail(string Id)
		{
			var response = await _identityService.ConfirmEmail(Id);
			string Keys = response.ElementAt(0).Key;
			switch (Keys)
			{
				case "Ok":
					return Ok(response[Keys]);
				case "No login":
					return NotFound(response[Keys]);
				case "No user":
					return BadRequest(response[Keys]);
				default:
					return NoContent();
			}
		}

		[Route("ForgotPassword")]
		[HttpPost]
		public async Task<IActionResult> ForgotPassword(CheckViewModel request)
		{
			var response = await _identityService.FogotPassword(request);
			string Keys = response.ElementAt(0).Key;
			switch (Keys)
			{
				case "Ok":
					return Ok(response[Keys]);
				case "Not found":
					return NotFound(response[Keys]);
				case "Blocked":
					return BadRequest(response[Keys]);
				default:
					return NoContent();
			}
		}

		[Route("AcceptForgot")]
		[HttpGet]
		public async Task<IActionResult> AcceptForgot(string Id)
		{
			var response = await _identityService.AcceptFogot(Id);
			string Keys = response.ElementAt(0).Key;
			switch (Keys)
			{
				case "Ok":
					return Ok(response[Keys]);
				case "Not found":
					return NotFound(response[Keys]);
				default:
					return NoContent();
			}
		}

		[Route("RecoveryPassword")]
		[HttpPost]
		public async Task<IActionResult> RecoveryPassword([FromBody] ChangePasswordViewModel request, int Id)
		{
			using (SHA256Managed sha256 = new SHA256Managed())
			{
				request.Password = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(request.Password)));
			}
			await _identityService.RecoveryPassword(request, Id);
			return Ok();
		}
		#endregion

		[Route("token")]
		[HttpPost]
		public async Task<IActionResult> Token([FromBody] IdentityViewModel model)
		{
			ClaimsIdentity identity = null;
			var user = await _identityService.GetUser(model.Username);
			if (user != null)
			{
				if (!user.IsFogotPassword || !user.IsBlock)
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
							new Claim(ClaimsIdentity.DefaultRoleClaimType, "Client")
						};
						identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
					}
				}
				else
					return Forbid();
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

		[Route("CreateLogin")]
		[HttpPost]
		public async Task<IActionResult> CreateLogin([FromBody] LoginViewModel login)
		{
			using (SHA256Managed sha256 = new SHA256Managed())
			{
				login.Password = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(login.Password)));
			}
			var result = await _identityService.AddUser(login);
			if (result != null)
			{
				var ConfirmEmail = new
				{
					hash = result
				};
				return Ok(ConfirmEmail);
			}
			else
			{
				string res = "Username or Email already exists";
				return BadRequest(res);
			}
			
		}

		//Проверка на наличие в БД Username и Email
		[Route("CheckInfo")]
		[HttpPost]
		public async Task<IActionResult> CheckInfo([FromBody] CheckViewModel request)
		{
			var result = await _identityService.CheckInfo(request);
			if (result == null)
				return Ok();
			else
				return BadRequest(result);

		}
		#endregion

		#region Authorize
		//[Authorize]
		[Route("GetUser")]
		[HttpGet]
		public async Task<IActionResult> GetUser(int Id)
		{
			var response = await _identityService.GetUser(Id);
			string Keys = response.ElementAt(0).Key;
			switch (Keys)
			{
				case "Ok":
					return Ok(response[Keys]);
				case "No login":
					return NotFound(response[Keys]);
				default:
					return NoContent();
			}
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

		//[Authorize]
		[Route("UpdateInfo")]
		[HttpPatch]
		public async Task<IActionResult> UpdateInfo([FromBody] UpdateInfoViewModel request, int Id)
		{
			await _identityService.UpdateInfo(request, Id);
			return Ok();
		}
		//[Authorize]
		[Route("ReInvest")]
		[HttpPatch]
		public async Task<IActionResult> ReInvest(int Id, bool ReInvest)
		{
			var result = await _identityService.ReInvest(Id, ReInvest);
			var response = new
			{
				reinvest = result
			};
			return Ok(response);
				
		}
        #endregion
    }
}

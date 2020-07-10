﻿using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Administrator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace Crypto.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class AdministratorController : ControllerBase
	{
		private readonly IAdministratorService _administratorService;
		private readonly ISystemService _systemService;
		public AdministratorController(IAdministratorService administratorService, ISystemService systemService)
		{
			_systemService = systemService;
			_administratorService = administratorService;
		}

		#region Files
		//[Authorize]
		[Route("UploadFiles")]
		[HttpPatch]
		public async Task<IActionResult> UploadFiles(string Content)
		{
			byte[] image = null;
			string name = "";
			var files = Request.Form.Files;
			long size = files.Sum(f => f.Length);
			foreach (var file in files)
				if (file.Length > 0)
					using (var stream = new MemoryStream())
					{
						await file.CopyToAsync(stream);
						image = stream.ToArray();
						name = file.FileName;
					}
			await _administratorService.UploadFiles(image, name, Content);
			return Ok();
		}
		#endregion

		#region Users
		//[Authorize]
		[Route("GetUsersInfo")]
		[HttpGet]
		public async Task<IActionResult> GetUsersInfo()
		{
			var response = await _administratorService.GetUsersInfo();
			if (response == null)
				return BadRequest();
			return Ok();
		}
        #endregion

        #region News
        //[Authorize(Roles = "Client")]
        [Route("AddNews")]
		[HttpPost]
		public async Task<IActionResult> AddNews([FromBody] AddNewsViewModel model)
		{
			var response = await _administratorService.AddNews(model);
			return Ok(response);
		}

		//[Authorize]
		[Route("UpdateNews")]
		[HttpPatch]
		public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsViewModel model, string heder)
		{
			var response = await _administratorService.UpdateNews(model, heder);
			if (response == null)
				return BadRequest("News not found");
			return Ok(response);
		}

		//[Authorize]
		[Route("DeleteNews")]
		[HttpDelete]
		public async Task<IActionResult> DeleteNews(string heder)
		{
			await _administratorService.DeleteNews(heder);
			return NoContent();
		}
		#endregion

		#region Main Page

		//[Authorize]
		[Route("GetSingleTextInfo")]
		[HttpGet]
		public async Task<IActionResult> GetInfo(string Component)
		{
			var response = await _administratorService.GetInfo(Component);
			if (response == null)
				return BadRequest();
			return Ok(response);
		}

		//[Authorize]
		[Route("UpdateSingleTextInfo")]
		[HttpPatch]
		public async Task<IActionResult> UpdateInfo([FromBody] SingleTextViewModel model)
		{
			await _administratorService.UpdateInfo(model);
			return Ok();
		}

		//[Authorize]
		[Route("GetFAQ")]
		[HttpGet]
		public async Task<IActionResult> GetFAQ(string Component)
		{
			var response = await _administratorService.GetFAQ(Component);
			if (response == null)
				return BadRequest();
			return Ok(response);
		}

		//[Authorize]
		[Route("UpdateFAQ")]
		[HttpPatch]
		public async Task<IActionResult> UpdateFAQ([FromBody] FAQ model)
		{
			await _administratorService.UpdateFAQ(model);
			return Ok();
		}


		//[Authorize]
		[Route("GetPic")]
		[HttpGet]
		public async Task<IActionResult> GetPic(string Component)
		{
			var response = await _administratorService.GetPic(Component);
			if (response != null)
			{
				var type = response.ImageName.Substring(response.ImageName.IndexOf('.') + 1);
				var mimeType = "application/" + type;

				return new FileContentResult(response.Image, mimeType)
				{
					FileDownloadName = response.ImageName
				};
			}
			return NotFound("User or file not found");
		}

		//[Authorize]
		[Route("UpdatePic")]
		[HttpPatch]
		public async Task<IActionResult> UpdatePic(string Component)
		{
			byte[] image = null;
			string name = "";
			var files = Request.Form.Files;
			long size = files.Sum(f => f.Length);
			foreach (var file in files)
				if (file.Length > 0)
					using (var stream = new MemoryStream())
					{
						await file.CopyToAsync(stream);
						image = stream.ToArray();
						name = file.FileName;
					}
			await _administratorService.UpdatePic(image, name, Component);
			return Ok();
		}

		#endregion

		#region Get User Picture
		//[Authorize]
		[Route("GetPassportPicture")]
		[HttpGet]
		public async Task<IActionResult> GetPassportPicture(int UserId)
		{
			var response = await _administratorService.GetPassportPicture(UserId);
			if (response != null)
			{
				var type = response.ImageName.Substring(response.ImageName.IndexOf('.') + 1);
				var mimeType = "application/" + type;

				return new FileContentResult(response.Image, mimeType)
				{
					FileDownloadName = response.ImageName
				};
			}
			return NotFound("User or file not found");
		}

		//[Authorize]
		[Route("GetProofPicture")]
		[HttpGet]
		public async Task<IActionResult> GetProofPicture(int UserId)
		{
			var response = await _administratorService.GetProofPicture(UserId);
			if (response != null)
			{
				var type = response.ImageName.Substring(response.ImageName.IndexOf('.') + 1);
				var mimeType = "application/" + type;

				return new FileContentResult(response.Image, mimeType)
				{
					FileDownloadName = response.ImageName
				};
			}
			return NotFound("User or file not found");
		}

		//[Authorize]
		[Route("GetSelfiPicture")]
		[HttpGet]
		public async Task<IActionResult> GetSelfiPicture(int UserId)
		{
			var response = await _administratorService.GetSelfiPicture(UserId);
			if (response != null)
			{
				var type = response.ImageName.Substring(response.ImageName.IndexOf('.') + 1);
				var mimeType = "application/" + type;

				return new FileContentResult(response.Image, mimeType)
				{
					FileDownloadName = response.ImageName
				};
			}
			return NotFound("User or file not found");
		}
		#endregion

		#region Finance 
		//[Authorize]
		[Route("GetRate")]
		[HttpGet]
		public async Task<IActionResult> GetRate()
		{
			var response = await _administratorService.GetRate();
			return Ok(response);
		}
        
        

		//[Authorize]
		[Route("UpdateRate")]
		[HttpPatch]
		public async Task<IActionResult> UpdateRate([FromBody] RateDETViewModel request)
		{
			await _administratorService.UpdateDETRate(request);
			return Ok();
		}
        
		//[Authorize]
		[Route("GetCommission")]
		[HttpGet]
		public async Task<IActionResult> GetCommission()
		{
			var response = await _administratorService.GetCommission();
			return Ok(response);
        }
        
		//[Authorize]
		[Route("UpdateCommission")]
		[HttpPatch]
		public async Task<IActionResult> UpdateCommission([FromBody] List<CommissionViewModel> request)
		{
			await _administratorService.UpdateCommission(request);
			return Ok();
		}

		//[Authorize]
		[Route("GetProfit")]
		[HttpGet]
		public async Task<IActionResult> GetProfit()
		{
			var response = await _administratorService.GetProfit();
			return Ok(response);
		}

		//[Authorize]
		[Route("UpdateProfit")]
		[HttpPatch]
		public async Task<IActionResult> UpdateProfit([FromBody] List<ProfitViewModel> request)
		{
			await _administratorService.UpdateProfit(request);
			return Ok();
		}
		#endregion

		#region Dashboard
		//[Authorize]
		[Route("GetAddedFounds")]
		[HttpGet]
		public async Task<IActionResult> GetAddedFounds()
		{
			var resp = await _administratorService.GetAddedFounds();

			var responce = new
			{
				AddedFound = resp
			};

			return Ok(responce);
		}

		//[Authorize]
		[Route("GetInvestedAmount")]
		[HttpGet]
		public async Task<IActionResult> GetInvestedAmount()
		{
			var resp = await _administratorService.GetInvestedAmount();
			if (resp == null)
			{
				var response = new
				{
					USD = 0,
					DET = 0
				};
				return Ok(response);
			}

			return Ok(resp);
		}

		//[Authorize]
		[Route("GetCountUser")]
		[HttpGet]
		public async Task<IActionResult> GetCountUser()
		{
			var resp = await _administratorService.GetCountUser();
			var response = new
			{
				CountUser = resp
			};

			return Ok(response);
		}

		//[Authorize]
		[Route("GetCountUserWithInvest")]
		[HttpGet]
		public async Task<IActionResult> GetCountUserWithInvest()
		{
			var resp = await _administratorService.GetCountUserWithInvest();
			var response = new
			{
				CountUserWithInvest = resp
			};
			return Ok(response);
		}

		//[Authorize]
		[Route("GetWithdrawnAmount")]
		[HttpGet]
		public async Task<IActionResult> GetWithdrawnAmount()
		{
			var resp = await _administratorService.GetWithdrawnAmount();
			var response = new
			{
				WithdrawnAmount = resp
			};
			return Ok(response);
		}

		//[Authorize]
		[Route("GetAllUsersBalance")]
		[HttpGet]
		public async Task<IActionResult> GetAllUsersBalance()
		{
			var resp = await _administratorService.GetAllUsersBalance();
			if (resp == null)
			{
				var response = new
				{
					USD = 0,
					DET = 0
				};
				return Ok(response);
			}
			return Ok(resp);
		}

		//[Authorize]
		[Route("GetAllCommission")]
		[HttpGet]
		public async Task<IActionResult> GetAllCommission()
		{
			var resp = await _administratorService.GetAllCommission();
			var response = new
			{
				AllCommission = resp
			};
			return Ok(response);
		}

		//[Authorize]
		[Route("GetWithdrawalRequest")]
		[HttpGet]
		public async Task<IActionResult> GetWithdrawalRequest()
		{
			var response = await _administratorService.GetWithdrawalRequest();
			if (response.Count == 0)
				return NotFound("No Users");
			return Ok(response);
		}

		//[Authorize]
		[Route("GetKYC")]
		[HttpGet]
		public async Task<IActionResult> GetKYC()
		{
			var response = await _administratorService.GetKYC();
			if (response.Count == 0)
				return NotFound("No Users");
			return Ok(response);
		}

		//[Authorize]
		[Route("AcceptAllWithdrawal")]
		[HttpPatch]
		public async Task<IActionResult> AcceptAllWithdrawal()
		{
			await _administratorService.AcceptAllWithdrawal();
			return Ok();
		}

		//[Authorize]
		[Route("AcceptWithdrawal")]
		[HttpPatch]
		public async Task<IActionResult> AcceptWithdrawal(int UserId)
		{
			await _administratorService.AcceptWithdrawal(UserId);
			return Ok();
		}


		//[Authorize]
		[Route("AcceptAllKYC")]
		[HttpPatch]
		public async Task<IActionResult> AcceptAllKYC()
		{
			await _administratorService.AcceptAllKYC();
			return Ok();
		}

		//[Authorize]
		[Route("AcceptKYC")]
		[HttpPatch]
		public async Task<IActionResult> AcceptKYC(int UserId)
		{
			await _administratorService.AcceptKYC(UserId);
			return Ok();
		}

		#endregion

		#region Dev

		[Route("DelUser")]
		[HttpGet]
		public async Task<IActionResult> DelUser(int Id)
		{
			await _administratorService.DelUser(Id);
			return Ok();
		}
		[Route("GetUsers")]
		[HttpGet]
		public async Task<IActionResult> GetUsers()
		{
			return Ok(await _administratorService.GetUsers());
		}

		[Route("Dev")]
		[HttpGet]
		public IActionResult Dev()
		{
			_systemService.AddCommission();
			_systemService.AddProfit();

			return Ok();
		}


		#endregion
	}
}

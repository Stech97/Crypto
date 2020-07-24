using System.Threading.Tasks;
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
	//[Authorize]
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
		[Route("GetUsersInfo")]
		[HttpGet]
		public async Task<IActionResult> GetUsersInfo()
		{
			var response = await _administratorService.GetUsersInfo();
			if (response == null)
				return BadRequest();
			return Ok(response);
		}

		[Route("Super")]
		[HttpPatch]
		public async Task<IActionResult> Super(int Id, bool Super)
		{
			var result = await _administratorService.Super(Id, Super);
			var response = new
			{
				super = result
			};
			return Ok(response);
		}
		#endregion

		#region News
		[Route("AddNews")]
		[HttpPost]
		public async Task<IActionResult> AddNews([FromBody] AddNewsViewModel model)
		{
			var response = await _administratorService.AddNews(model);
			return Ok(response);
		}
		
		[Route("UpdateNews")]
		[HttpPatch]
		public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsViewModel model, string heder)
		{
			var response = await _administratorService.UpdateNews(model, heder);
			if (response == null)
				return BadRequest("News not found");
			return Ok(response);
		}
		
		[Route("DeleteNews")]
		[HttpDelete]
		public async Task<IActionResult> DeleteNews(string heder)
		{
			await _administratorService.DeleteNews(heder);
			return NoContent();
		}
		#endregion

		#region Main Page
		
		[Route("GetSingleTextInfo")]
		[HttpGet]
		public async Task<IActionResult> GetInfo(string Component)
		{
			var response = await _administratorService.GetInfo(Component);
			if (response == null)
				return BadRequest();
			return Ok(response);
		}
		
		[Route("UpdateSingleTextInfo")]
		[HttpPatch]
		public async Task<IActionResult> UpdateInfo([FromBody] SingleTextViewModel model)
		{
			await _administratorService.UpdateInfo(model);
			return Ok();
		}
	
		[Route("GetFAQ")]
		[HttpGet]
		public async Task<IActionResult> GetFAQ()
		{
			var response = await _administratorService.GetFAQ();
			if (response == null)
				return BadRequest();
			return Ok(response);
		}
	
		[Route("UpdateFAQ")]
		[HttpPatch]
		public async Task<IActionResult> UpdateFAQ([FromBody] FAQViewModel model)
		{
			await _administratorService.UpdateFAQ(model);
			return Ok();
		}

		[Route("GetAbout")]
		[HttpGet]
		public async Task<IActionResult> GetAbout()
		{
			var response = await _administratorService.GetAbout();
			if (response == null)
				return BadRequest();
			return Ok(response);
		}

		[Route("UpdateAbout")]
		[HttpPatch]
		public async Task<IActionResult> UpdateAbout([FromBody] AboutUsViewModel model)
		{
			await _administratorService.UpdateAbout(model);
			return Ok();
		}

		[Route("GetPic")]
		[HttpGet]
		public async Task<IActionResult> GetPic(string Component)
		{
			var response = await _administratorService.GetPic(Component, 0);
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


		[Route("GetPicAbout")]
		[HttpGet]
		public async Task<IActionResult> GetPicAbout(int NamePic)
		{

			var responses = await _administratorService.GetPic("About us", NamePic);
			if (responses != null)
			{
				var type = responses.ImageName.Substring(responses.ImageName.IndexOf('.') + 1);
				var mimeType = "application/" + type;

				return new FileContentResult(responses.Image, mimeType)
				{
					FileDownloadName = responses.ImageName
				};
			}
			return NotFound("File not found");
		}

		[Route("UpdatePic")]
		[HttpPatch]
		public async Task<IActionResult> UpdatePic(string Component)
		{
			byte[] image = null;
			string name = "";
			var files = Request.Form.Files;

			if (Component == "About us")
			{
				int i = 0;
				foreach (var file in files)
				{
					i++;
					if (file.Length > 0)
						using (var stream = new MemoryStream())
						{
							await file.CopyToAsync(stream);
							image = stream.ToArray();
							name = file.FileName;
						}
					await _administratorService.UpdatePic(image, name, Component, i);
				}
			}

			foreach (var file in files)
			{
				if (file.Length > 0)
					using (var stream = new MemoryStream())
					{
						await file.CopyToAsync(stream);
						image = stream.ToArray();
						name = file.FileName;
					}
				await _administratorService.UpdatePic(image, name, Component, 0);
			}

			return Ok();
		}

		#endregion

		#region Get User Picture	
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
		[Route("GetRate")]
		[HttpGet]
		public async Task<IActionResult> GetRate()
		{
			var response = await _administratorService.GetRate();
			return Ok(response);
		} 
	
		[Route("UpdateRate")]
		[HttpPatch]
		public async Task<IActionResult> UpdateRate([FromBody] RateDETViewModel request)
		{
			await _administratorService.UpdateDETRate(request);
			return Ok();
		}
        
		[Route("GetCommission")]
		[HttpGet]
		public async Task<IActionResult> GetCommission()
		{
			var response = await _administratorService.GetCommission();
			return Ok(response);
        }
        
		[Route("UpdateCommission")]
		[HttpPatch]
		public async Task<IActionResult> UpdateCommission([FromBody] List<CommissionViewModel> request)
		{
			await _administratorService.UpdateCommission(request);
			return Ok();
		}

		[Route("GetProfit")]
		[HttpGet]
		public async Task<IActionResult> GetProfit()
		{
			var response = await _administratorService.GetProfit();
			return Ok(response);
		}

		[Route("UpdateProfit")]
		[HttpPatch]
		public async Task<IActionResult> UpdateProfit([FromBody] List<ProfitViewModel> request)
		{
			await _administratorService.UpdateProfit(request);
			return Ok();
		}
		#endregion

		#region Dashboard
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

		[Route("GetWithdrawalRequest")]
		[HttpGet]
		public async Task<IActionResult> GetWithdrawalRequest()
		{
			var response = await _administratorService.GetWithdrawalRequest();
			if (response.Count == 0)
				return NotFound("No Users");
			return Ok(response);
		}
	
		[Route("GetKYC")]
		[HttpGet]
		public async Task<IActionResult> GetKYC()
		{
			var response = await _administratorService.GetKYC();
			if (response.Count == 0)
				return NotFound("No Users");
			return Ok(response);
		}

		[Route("AcceptAllWithdrawal")]
		[HttpPatch]
		public async Task<IActionResult> AcceptAllWithdrawal()
		{
			var response = await _administratorService.AcceptAllWithdrawal();
			return Ok(response);
		}

		[Route("AcceptWithdrawal")]
		[HttpPatch]
		public async Task<IActionResult> AcceptWithdrawal(int UserId)
		{
			var response = await _administratorService.AcceptWithdrawal(UserId);
			return Ok(response);
		}

		[Route("DiscardWithdraw")]
		[HttpPatch]
		public async Task<IActionResult> DiscardWithdraw(int UserId)
		{
			await _administratorService.DiscardWithdraw(UserId);
			return Ok();
		}

		[Route("AcceptAllKYC")]
		[HttpPatch]
		public async Task<IActionResult> AcceptAllKYC()
		{
			await _administratorService.AcceptAllKYC();
			return Ok();
		}

		[Route("AcceptKYC")]
		[HttpPatch]
		public async Task<IActionResult> AcceptKYC(int UserId)
		{
			await _administratorService.AcceptKYC(UserId);
			return Ok();
		}

		[Route("DiscardKYC")]
		[HttpPatch]
		public async Task<IActionResult> DiscardKYC([FromBody] DiscardKYCViewModel model)
		{
			await _administratorService.DiscardKYC(model);
			return Ok();
		}

		#endregion

		#region Dev
		[AllowAnonymous]
		[Route("DelUser")]
		[HttpGet]
		public async Task<IActionResult> DelUser(int Id)
		{
			await _administratorService.DelUser(Id);
			return Ok();
		}

		[AllowAnonymous]
		[Route("GetUsers")]
		[HttpGet]
		public async Task<IActionResult> GetUsers()
		{
			return Ok(await _administratorService.GetUsers());
		}

		[AllowAnonymous]
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

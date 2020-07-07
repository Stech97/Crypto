using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Administrator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;

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

		#region Main Page
		//[Authorize]
		[Route("UpdateInfo")]
		[HttpPatch]
		public async Task<IActionResult> UpdateInfo([FromBody] SingleTextViewModel model)
		{
			await _administratorService.UpdateInfo(model);
			return Ok();
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
		[Route("GetInfo")]
		[HttpGet]
		public async Task<IActionResult> GetInfo(string Component)
		{
			var response = await _administratorService.GetInfo(Component);
			if (response == null)
				return BadRequest();
			return Ok(response);
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
		[Route("GeProofPicture")]
		[HttpGet]
		public async Task<IActionResult> GeProofPicture(int UserId)
		{
			var response = await _administratorService.GeProofPicture(UserId);
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

		#region Dashboard
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

		//[Authorize]
		[Route("UpdateRate")]
		[HttpPatch]
		public async Task<IActionResult> UpdateRate([FromBody] RateDETViewModel request)
		{
			return Ok(await _administratorService.UpdateDETRate(request));
		}

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

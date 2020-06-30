using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Administrator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdministratorController : ControllerBase
    {
		readonly IAdministratorService _administratorService;
		public AdministratorController(IAdministratorService administratorService)
		{
			_administratorService = administratorService;
		}

		//[Authorize(Roles = "Client")]
		[Route("AddNews")]
		[HttpPost]
		public async Task<IActionResult> AddNews([FromBody] AddNewsViewModel model)
		{
			await _administratorService.AddNews(model);
			return Ok();
		}

		//[Authorize]
		[Route("UpdateNews")]
		[HttpPatch]
		public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsViewModel model, string heder)
		{
			await _administratorService.UpdateNews(model, heder);
			return Ok();
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

		#endregion
	}
}

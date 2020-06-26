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

        [Authorize(Roles = "Client")]
		[Route("DeleteInvestment")]
		[HttpDelete]
		public async Task<IActionResult> DeleteInvestment(int Id)
		{
			await _administratorService.DeleteInvestment(Id);
			return NoContent();
		}

		//[Authorize]
		[Route("AddInvestment")]
		[HttpPost]
		public async Task<IActionResult> AddInvestment([FromBody] InvestmentViewModel request)
		{
			await _administratorService.AddInvestment(request);
			return Ok();
		}

		//[Authorize]
		[Route("AddNews")]
		[HttpPost]
		public async Task<IActionResult> AddNews([FromBody] NewsViewModel request)
		{
			await _administratorService.AddNews(request);
			return Ok();
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

using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Crypto.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class InvestmentController : Controller
	{
		readonly IInvestmentService _investmentService;
		public InvestmentController(IInvestmentService investmentService)
		{
			_investmentService = investmentService;
		}

		//[Authorize]
		[Route("GetInvestments")]
		[HttpGet]
		public async Task<IActionResult> GetInvestments(int UserId, int Take)
		{
			return Ok(await _investmentService.GetInvestments(UserId, Take));
		}
		
		//[Authorize]
		[Route("GetTotalInvestment")]
		[HttpGet]
		public async Task<IActionResult> GetTotalInvestment(int UserId)
		{
			return Ok(await _investmentService.GetTotalInvestment(UserId));
		}

		//[Authorize]
		[Route("GetLastDayInvestment")]
		[HttpGet]
		public async Task<IActionResult> GetLastDayInvestment(int UserId)
		{
			return Ok(await _investmentService.GetLastDayInvestment(UserId));
		}

		/*public async Task<IActionResult> BuyInvestment()
		{
			return Ok();
		}*/
	}
}

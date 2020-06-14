using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Investment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Crypto.Controllers
{
	[ApiController]
	[Route("[controller]")]
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

		//[Authorize]
		[Route("BuyInvestment")]
		[HttpPost]
		public async Task<IActionResult> BuyInvestment([FromBody] BuyInvestmentViewModel request, int Id)
		{
			return Ok(await _investmentService.BuyInvestment(request, Id));
		}
	}
}

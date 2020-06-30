using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Investment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;


namespace Crypto.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class InvestmentController : Controller
	{
		private readonly IWebHostEnvironment _appEnvironment;
		private readonly IInvestmentService _investmentService;
		public InvestmentController(IInvestmentService investmentService, IWebHostEnvironment appEnvironment)
		{
			_investmentService = investmentService;
			_appEnvironment = appEnvironment;
		}

		//[Authorize]
		[Route("GetInvestments")]
		[HttpGet]
		public async Task<IActionResult> GetInvestments(int UserId)
		{
			return Ok(await _investmentService.GetInvestments(UserId));
		}

		//[Authorize]
		[Route("BuyInvestment")]
		[HttpPost]
		public async Task<IActionResult> BuyInvestment([FromBody] BuyInvestmentViewModel request, int Id)
		{
			var response = await _investmentService.BuyInvestment(request, Id);
			if (response == null)
				return BadRequest();
			return Ok(response);
		}

		//[Authorize]
		[Route("GetTeamPop")]
		[HttpGet]
		public async Task<IActionResult> GetTeamPop(int UserId, int Level)
		{
			var result = await _investmentService.GetTeamPop(UserId, Level);
			if (result == null)
				return BadRequest("count level less query");
			return Ok(result);
		}

		//[Authorize]
		[Route("GetTeamLevel")]
		[HttpGet]
		public async Task<IActionResult> GetTeamLevel(int UserId)
		{
			var result = await _investmentService.GetTeamLevel(UserId);
			if (result == null)
				return BadRequest("");
			return Ok(result);
		}

		//[Authorize]
		[Route("GetBalanceHistory")]
		[HttpGet]
		public async Task<IActionResult> GetBalanceHistory(int UserId)
		{
			var result = await _investmentService.GetBalanceHistory(UserId);
			if (result == null)
				return BadRequest();
			return Ok(result);
		}

	}
}

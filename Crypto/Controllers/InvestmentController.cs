using System.Collections.Generic;
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
		public async Task<List<Investment>> GetInvestments()
		{
			return await _investmentService.GetInvestments();
		}
		//[Authorize]
		[Route("GetInvestment")]
		[HttpGet]
		public async Task<Investment> GetInvestment(int InvestmentId)
		{
			return await _investmentService.GetInvestment(InvestmentId);
		}

		//[Authorize]
		[Route("UpdateInvestment")]
		[HttpPatch]
		public async Task<IActionResult> UpdateInvestment([FromBody] InvestmentViewModel request, int Id)
		{
			await _investmentService.UpdateInvestment(request, Id);
			return Ok();
		}

		//[Authorize]
		[Route("AddInvestment")]
		[HttpPost]
		public async Task<IActionResult> AddInvestment([FromBody] InvestmentViewModel request)
		{
			await _investmentService.AddInvestment(request);
			return Ok();
		}

		//[Authorize]
		[Route("DeleteInvestment")]
		[HttpDelete]
		public async Task<IActionResult> DeleteInvestment(int InvestmentId)
		{
			await _investmentService.DeleteInvestment(InvestmentId);
			return NoContent();
		}
	}
}

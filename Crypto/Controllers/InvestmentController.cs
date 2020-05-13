using System.Collections.Generic;
using System.Threading.Tasks;
using Crypto.Services.Interfaces;
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

		[Route("GetInvestments")]
		[HttpGet]
		public async Task<List<Investment>> GetInvestments()
		{
			return await _investmentService.GetInvestments();
		}

		[Route("GetInvestment")]
		[HttpGet]
		public async Task<Investment> GetInvestment(int InvestmentId)
		{
			return await _investmentService.GetInvestment(InvestmentId);
		}

		[Authorize]
		[Route("DeleteInvestment")]
		[HttpDelete]
		public async Task DeleteInvestment(int InvestmentId)
		{
			await _investmentService.DeleteInvestment(InvestmentId);
		}
	}
}

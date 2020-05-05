using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Crypto.Controllers
{
	[Route("api/[controller]")]
	public class InvestmentController
	{
		readonly IInvestmentService _investmentService;
		public InvestmentController(IInvestmentService investmentService)
		{
			_investmentService = investmentService;
		}

		/*[Route("GetInvestments")]
		[HttpGet]
		public async Task<List<InvestmentViewModel>> GetInvestments()
		{
			return await _investmentService.GetInvestments();
		}*/

		[Route("GetInvestment")]
		[HttpGet]
		public async Task<Investment> GetInvestment(int investmentId)
		{
			return await _investmentService.GetInvestment(investmentId);
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

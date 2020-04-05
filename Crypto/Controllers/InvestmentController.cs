using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using System.Threading.Tasks;

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

		[Route("investPage")]
		[HttpGet]
		public async Task<Page<InvestmentViewModel>> GetInvestments(int pageIndex)
		{
			return await _investmentService.GetInvestments(pageIndex);
		}

		[Route("investment")]
		[HttpGet]
		public async Task<Investment> GetInvestment(int investId)
		{
			return await _investmentService.GetInvestment(investId);
		}
		[Authorize]
		[Route("invest")]
		[HttpPost]
		public async Task AddInvestment([FromBody] InvestmentViewModel request)
		{
			await _investmentService.AddInvestment(request);
		}

		[Authorize]
		[Route("invest")]
		[HttpDelete]
		public async Task DeleteInvestment(int InvestmenttId)
		{
			await _investmentService.DeleteInvestment(InvestmenttId);
		}
	}
}

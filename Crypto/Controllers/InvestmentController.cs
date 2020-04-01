using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using System.Collections.Generic;
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

		public async Task<Page<InvestmentViewModel>> GetInvestments(int pageIndex, string name)
		{
			return await _investmentService.GetInvestments(pageIndex, name);
		}

		[Authorize]
		[Route("investment")]
		[HttpPost]
		public async Task AddInvestment([FromBody] InvestmentViewModel request)
		{
			await _investmentService.AddInvestment(request);
		}

		[Authorize]
		[Route("investment")]
		[HttpDelete]
		public async Task DeleteInvestment(int InvestmenttId)
		{
			await _investmentService.DeleteInvestment(InvestmenttId);
		}
	}
}

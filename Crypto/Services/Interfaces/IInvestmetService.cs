using Crypto.ViewModels;
using Crypto.ViewModels.Investment;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IInvestmentService
	{
		Task<List<InvestmentViewModel>> GetInvestments(int UserId, int Take);
		Task<double> GetTotalInvestment(int UserId);
		Task<double> GetLastDayInvestment(int UserId);
		Task<string> BuyInvestment(BuyInvestmentViewModel request, int Id);
	}
}

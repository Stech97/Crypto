using Crypto.ViewModels;
using Crypto.ViewModels.Dashdoard;
using Crypto.ViewModels.Investment;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IInvestmentService
	{
		Task<List<InvestmentViewModel>> GetInvestments(int UserId, int Take);
		Task<double> GetLastDayInvestment(int UserId);
		Task<BalanceViewModel> BuyInvestment(BuyInvestmentViewModel request, int Id);
	}
}

using Crypto.ViewModels;
using Crypto.ViewModels.Dashdoard;
using Crypto.ViewModels.Investment;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IInvestmentService
	{
		Task<List<InvestmentViewModel>> GetInvestments(int UserId, int Take);
		Task<double> GetLastDayInvestment(int UserId);
		Task<BalanceViewModel> BuyInvestment(BuyInvestmentViewModel request, int Id);
		Task<List<PopupTeam>> GetTeamPop(int UserId, int level);
		Task<List<Team>> GetTeamLevel(int UserId);
		Task<List<BalanceHistoryViewModel>> GetBalanceHistory(int UserId);
	}
}

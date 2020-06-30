using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
	public interface IInvestmentRepository
	{
		Task<List<Investment>> GetInvestments(int UserId, int Take);
		Task<double> GetLastDayInvestment(int UserId);
		Task<Balance> BuyInvestment(Investment investment, string cur, int Id);
		Task<List<PopupTeam>> GetTeamPop(int UserId, int level);
		Task<List<Team>> GetTeamLevel(int UserId);
		Task<List<BalanceHistory>> GetBalanceHistory(int UserId);
	}
}

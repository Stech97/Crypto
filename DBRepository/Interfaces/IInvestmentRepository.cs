using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
	public interface IInvestmentRepository
	{
		Task<List<Investment>> GetInvestments(int UserId, int Take);
		Task<double> GetLastDayInvestment(int UserId);
		Task<object> BuyInvestment(Investment investment, string cur, int Id);
	}
}

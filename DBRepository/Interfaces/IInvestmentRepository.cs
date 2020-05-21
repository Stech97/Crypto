using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
	public interface IInvestmentRepository
	{
		Task<List<Investment>> GetInvestments();
		Task<Investment> GetInvestment(int investID);
		Task AddInvestment(Investment investment);
		Task DeleteInvestment(int investID);
	}
}

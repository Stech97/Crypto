using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
	public interface IInvestmentRepository
	{
		Task<Investment> GetInvestment(string name);
		Task AddInvestment(Investment investment);
		Task DeleteInvestment(int investID);
	}
}

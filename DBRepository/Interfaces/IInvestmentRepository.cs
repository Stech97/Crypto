using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
	public interface IInvestmentRepository
	{
		Task<Page<Investment>> GetPosts(int index, int pageSize, string investment = null);
		Task<Investment> GetInvestment(string name);
		Task AddInvestment(Investment investment);
		Task DeleteInvestment(int investID);
	}
}

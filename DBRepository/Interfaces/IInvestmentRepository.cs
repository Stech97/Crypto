using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
	public interface IInvestmentRepository
	{
		Task<Page<Investment>> GetPosts(int index, int pageSize);
		Task<Investment> GetInvestment(int investID);
		Task AddInvestment(Investment investment);
		Task DeleteInvestment(int investID);
	}
}

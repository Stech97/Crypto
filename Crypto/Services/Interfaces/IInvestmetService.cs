using Crypto.ViewModels;
using Models;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IInvestmentService
	{
		Task<Page<InvestmentViewModel>> GetInvestments(int pageIndex, string name);
		Task<Investment> GetInvestment(string name);
		Task AddInvestment(InvestmentViewModel request);
		Task DeleteInvestment(int investID);
	}
}

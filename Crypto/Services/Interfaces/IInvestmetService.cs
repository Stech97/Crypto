using Crypto.ViewModels;
using Models;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IInvestmentService
	{
		Task<Page<InvestmentViewModel>> GetInvestments(int pageIndex);
		Task<Investment> GetInvestment(int investId);
		Task AddInvestment(InvestmentViewModel request);
		Task DeleteInvestment(int investID);
	}
}

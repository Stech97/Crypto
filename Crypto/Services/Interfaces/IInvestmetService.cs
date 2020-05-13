using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IInvestmentService
	{
		Task<List<Investment>> GetInvestments();
		Task<Investment> GetInvestment(int investId);
		//Task AddInvestment(InvestmentViewModel request);
		Task DeleteInvestment(int investID);
	}
}

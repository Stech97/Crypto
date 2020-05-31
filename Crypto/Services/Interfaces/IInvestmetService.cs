using Crypto.ViewModels;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IInvestmentService
	{
		Task<List<InvestmentViewModel>> GetInvestments(int UserId, int Take);
		Task<double> GetTotalInvestment(int UserId);
		Task<double> GetLastDayInvestment(int UserId);
	}
}

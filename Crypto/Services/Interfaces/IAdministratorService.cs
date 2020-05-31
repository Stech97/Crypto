using Crypto.ViewModels;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IAdministratorService
    {
        Task DeleteInvestment(int investID);
        Task AddNews(NewsViewModel request);
        Task AddInvestment(InvestmentViewModel request);
    }
}

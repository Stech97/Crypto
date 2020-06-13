using Crypto.ViewModels.Administrator;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IAdministratorService
    {
        Task DeleteInvestment(int investID);
        Task AddNews(NewsViewModel request);
        Task AddInvestment(InvestmentViewModel request);
        Task<RateDETViewModel> UpdateDETRate(RateDETViewModel request);
        void UpdateBTCRate();
        Task DelUser(int Id);
        Task<List<RefUserViewModel>> GetRef(int Ref);
    }
}

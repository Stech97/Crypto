using Crypto.ViewModels.Dashdoard;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<BalanceViewModel> GetBalance(int Id);
        Task<RefLinkViewModel> GetRefLink(int Id);
        Task<List<LoginHistoryViewModel>> GetLoginHistory(int Id);
        Task<List<NewsViewModel>> GetNews(int Take, int Skip);
        Task<object> ExchangeBalance(ExchangeViewModel request, int UserId);
        Task<CashBTCViewModel> CashBTC(CashBTCViewModel request, int Id);
        Task<double> GetRate(RateViewModel request);
        Task<RefUserViewModel> GetTeam(int Ref);
        Task<double> GetTotalProfit(int Id);
        Task<double> GetTotalInvestment(int Id);
        Task<int> GetTotalMembers(int Id);
    }
}

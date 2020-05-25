using Crypto.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<BalanceViewModel> GetBalance(int Id);
        Task<RefLinkViewModel> GetRefLink(int Id);
        Task<List<LoginHistoryViewModel>> GetLoginHistory(int Id);
        Task UpdateBalance(BalanceViewModel request, int Id);
    }
}

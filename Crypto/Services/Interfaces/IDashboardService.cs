using Crypto.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<BalanceViewModel> GetBalance(string Username);
        Task<List<LoginHistoryViewModel>> GetLoginHistory(string Username);

    }
}

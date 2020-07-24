using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IDashboardRepository
    {
        Task<Balance> GetBalance(int Id);
        Task<User> GetRefLink(int Id);
        Task<List<LoginHistory>> GetLoginHistory(int Id);
        Task<List<News>> GetNews(int Take, int Skip);
        Task<bool> ExchangeBalance(string exchnge, double amount, int UserId);
        Task<string> CashBTC(Balance balance, int UserId);
        Task<double> GetRate(string rate);
        Task<User> GetTeam(int Ref);
        Task<object> GetProfitFromInvest(int Id);
        Task<object> GetTotalInvestment(int Id);
        Task<int> GetTotalMembers(int Id);
        Task<object> GetEarningsTeam(int Id);
        Task<object> GetTotalProfit(int Id);
        Task<object> GetLastWeekProfit(int Id);
    }
}

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
        Task<object> ExchangeBalance(string exchnge, double amount, int UserId);
        Task<Balance> CashBTC(Balance balance, int UserId);
        Task<double> GetRate(string rate);
        Task<User> GetTeam(int Ref);
        Task<double> ProfitFromInvest(int Id);
        Task<double> GetTotalInvestment(int Id);
        Task<int> GetTotalMembers(int Id);
        Task<double> GetEarningsTeam(int Id);
        Task<double> GetTotalProfit(int Id);
        Task<double> GetLastDayProfit(int Id);
    }
}

using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IDashboardRepository
    {
        Task<Balance> GetBalance(int Id);
        Task<List<LoginHistory>> GetLoginHistory(int Id);
        Task SetLoginHistory(LoginHistory loginHistory);
    }
}

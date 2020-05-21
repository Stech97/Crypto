using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IDashboardRepository
    {
        Task<Balance> GetBalance(string UserName);
        Task<List<LoginHistory>> GetLoginHistory(string Username);
    }
}

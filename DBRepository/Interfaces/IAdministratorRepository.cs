using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        Task AddNews(News news); 
        Task<Balance> UpdateDETRate(Balance balance);
        Task UpdateBTCRate(Balance balance);
        Task AddProfit();
        Task AddCommission();

        #region Dev
        Task DelUser(int Id);
        Task<List<object>> GetUsers();
        #endregion
    }
}

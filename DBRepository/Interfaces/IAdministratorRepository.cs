using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        Task<News> AddNews(News news); 
        Task<Balance> UpdateDETRate(Balance balance);
        Task<News> UpdateNews(News news, string heder);
        Task DeleteNews(string heder);

        #region Dev
        Task DelUser(int Id);
        Task<List<object>> GetUsers();
        #endregion
    }
}

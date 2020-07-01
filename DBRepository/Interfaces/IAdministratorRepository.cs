using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        #region
        Task UpdateInfo(MainPage mainPage);
        Task UpdatePic(byte[] inmage, string nameFile, string Component);
        Task<MainPage> GetPic(string Component);
        Task<MainPage> GetInfo(string Component);
        #endregion
        #region Dashboard
        Task<News> AddNews(News news); 
        Task<Balance> UpdateDETRate(Balance balance);
        Task<News> UpdateNews(News news, string heder);
        Task DeleteNews(string heder);
        #endregion
        #region Dev
        Task DelUser(int Id);
        Task<List<object>> GetUsers();
        #endregion
    }
}

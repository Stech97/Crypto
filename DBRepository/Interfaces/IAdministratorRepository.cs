using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        #region GetPicture
        Task UpdateInfo(MainPage mainPage);
        Task UpdatePic(byte[] inmage, string nameFile, string Component);
        Task<Images> GetPic(string Component);
        Task<MainPage> GetInfo(string Component);
        Task<Images> GetPassportPicture(int UserId);
        Task<Images> GeProofPicture(int UserId);
        Task<Images> GetSelfiPicture(int UserId);
        #endregion

        #region Dashboard
        Task<News> AddNews(News news); 
        Task<Rate> UpdateDETRate(Rate balance);
        Task<News> UpdateNews(News news, string heder);
        Task DeleteNews(string heder);
        Task<double> GetAddedFounds();
        #endregion

        #region Dev
        Task DelUser(int Id);
        Task<List<object>> GetUsers();
        #endregion
    }
}

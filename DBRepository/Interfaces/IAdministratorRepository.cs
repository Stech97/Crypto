using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {

        #region Main Page
        Task UpdateInfo(MainPage mainPage);
        Task UpdatePic(byte[] inmage, string nameFile, string Component);
        Task<Images> GetPic(string Component);
        Task<MainPage> GetInfo(string Component);
        #endregion

        #region News
        Task<News> AddNews(News news);
        Task<News> UpdateNews(News news, string heder);
        Task DeleteNews(string heder);

        #endregion

        #region Get User Picture
        Task<Images> GetPassportPicture(int UserId);
        Task<Images> GeProofPicture(int UserId);
        Task<Images> GetSelfiPicture(int UserId);
        #endregion

        #region Finance
        Task<Rate> UpdateDETRate(Rate balance);
        Task<List<TypeCommission>> GetCommission();
        #endregion

        #region Dashboard
        Task<double> GetAddedFounds();
        Task<object> GetInvestedAmount();
        Task<int> GetCountUser();
        Task<int> GetCountUserWithInvest();
        Task<double> GetWithdrawnAmount();
        Task<object> GetAllUsersBalance();
        Task<double> GetAllCommission();
        #endregion

        #region Dev
        Task DelUser(int Id);
        Task<List<object>> GetUsers();
        #endregion
    }
}

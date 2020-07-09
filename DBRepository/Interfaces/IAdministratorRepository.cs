using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        Task<object> GetUsersInfo();

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
        Task<Rate> GetRate();
        Task UpdateDETRate(Rate balance);
        Task<List<TypeCommission>> GetCommission();
        Task UpdateCommission(List<TypeCommission> typeCommission);
        Task<List<TypeInvestment>> GetProfit();
        Task UpdateProfit(List<TypeInvestment> typeInvestment);
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

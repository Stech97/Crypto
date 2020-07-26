using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        #region Upload Files
        Task UploadFiles(byte[] image, string content, string Component);
        #endregion

        #region Users
        Task<object> GetUsersInfo();
        Task<bool> Super(int id, bool super);
        Task<User> GetUser(string userName);

        #endregion

        #region Main Page
        Task<MainPage> GetInfo(string Component);
        Task UpdateInfo(MainPage mainPage);

        Task<MainPage> GetFAQ();
        Task UpdateFAQ(MainPage mainPage);

        Task<MainPage> GetAbout();
        Task UpdateAbout(MainPage mainPage);

        Task<Images> GetPic(string Component, int Possition);
        Task UpdatePic(byte[] inmage, string nameFile, string Component, int Possition);
        #endregion

        #region News
        Task<News> AddNews(News news);
        Task<News> UpdateNews(News news, string heder);
        Task DeleteNews(string heder);

        #endregion

        #region Get User Picture
        Task<Images> GetPassportPicture(int UserId);
        Task<Images> GetProofPicture(int UserId);
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
        Task<List<WithdrawAll>> GetWithdrawalRequest();
        Task<List<object>> GetKYC();
        Task<List<string>> AcceptAllWithdrawal();
        Task<string> AcceptWithdrawal(int UserId);
        Task DiscardWithdraw(int UserId);
        Task AcceptAllKYC();
        Task AcceptKYC(int UserId);
        Task DiscardKYC(int UserId, string Error);
        #endregion

        #region Dev
        Task DelUser(int Id);
        Task<List<object>> GetUsers();
        #endregion
    }
}

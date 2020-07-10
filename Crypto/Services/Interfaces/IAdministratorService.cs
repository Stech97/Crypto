using Crypto.ViewModels.Administrator;
using Crypto.ViewModels.Dashdoard;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IAdministratorService
    {
        #region Upload Files
        Task UploadFiles(byte[] image, string content, string Component);
        #endregion

        #region Users
        Task<object> GetUsersInfo();
        #endregion
        
        #region News
        Task<NewsViewModel> AddNews(AddNewsViewModel requmodelest);
        Task<NewsViewModel> UpdateNews(UpdateNewsViewModel model, string heder);
        Task DeleteNews(string heder);
        #endregion

        #region Main Page
        Task<SingleTextViewModel> GetInfo(string Component);
        Task UpdateInfo(SingleTextViewModel model);

        Task<FAQViewModel> GetFAQ();
        Task UpdateFAQ(FAQViewModel model);

        Task<AboutUsViewModel> GetAbout();
        Task UpdateAbout(AboutUsViewModel model);

        Task<Images> GetPic(string Component, int Position);
        Task UpdatePic(byte[] image, string nameFile, string Component, int Position);

        #endregion

        #region Finance
        Task<RateDETViewModel> GetRate();
        Task UpdateDETRate(RateDETViewModel request);
        Task<List<CommissionViewModel>> GetCommission();
        Task UpdateCommission(List<CommissionViewModel> request);
        Task<List<ProfitViewModel>> GetProfit();
        Task UpdateProfit(List<ProfitViewModel> request);
        #endregion

        #region Get User Picture
        Task<Images> GetPassportPicture(int userId);
        Task<Images> GetProofPicture(int UserId);
        Task<Images> GetSelfiPicture(int UserId);
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
        Task AcceptAllWithdrawal();
        Task AcceptWithdrawal(int UserId);
        Task AcceptAllKYC();
        Task AcceptKYC(int UserId);
        #endregion

        #region Dev
        Task DelUser(int Id);
        Task<List<UserViewModel>> GetUsers();
        #endregion
    }
}

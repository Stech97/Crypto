using Crypto.ViewModels.Administrator;
using Crypto.ViewModels.Dashdoard;
using Models;
using Models.Enum;
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
        Task<bool> Super(int id, bool Super);
        Task<User> GetUser(string userName);

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

        #region Period
        Task<double> GetAddedFounds(EnumTypePeriod Period);
        Task<object> GetInvestedAmount(EnumTypePeriod Period);
        Task<int> GetCountUser(EnumTypePeriod Period);
        Task<int> GetCountUserWithInvest();
        Task<double> GetWithdrawnAmount(EnumTypePeriod Period);
        Task<object> GetAllUsersBalance();
        Task<double> GetAllCommission(EnumTypePeriod Period);
            #endregion

        Task<List<WithdrawAll>> GetWithdrawalRequest();
        Task<List<object>> GetKYC();
        Task<List<string>> AcceptAllWithdrawal();
        Task<string> AcceptWithdrawal(int UserId);
        Task DiscardWithdraw(int UserId);
        Task AcceptAllKYC();
        Task AcceptKYC(int UserId);
        Task DiscardKYC(DiscardKYCViewModel model);
        #endregion

        #region Dev
        Task DelUser(int Id);
        Task<List<UserViewModel>> GetUsers();
        #endregion
    }
}

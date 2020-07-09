﻿using Crypto.ViewModels.Administrator;
using Crypto.ViewModels.Dashdoard;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IAdministratorService
    {
        Task<object> GetUsersInfo();

        #region News
        Task<NewsViewModel> AddNews(AddNewsViewModel requmodelest);
        Task<NewsViewModel> UpdateNews(UpdateNewsViewModel model, string heder);
        Task DeleteNews(string heder);
        #endregion

        #region Main Page
        Task UpdateInfo(SingleTextViewModel model);
        Task UpdatePic(byte[] image, string nameFile, string Component);
        Task<Images> GetPic(string Component);
        Task<SingleTextViewModel> GetInfo(string Component);
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
        Task<Images> GeProofPicture(int UserId);
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
        #endregion

        #region Dev
        Task DelUser(int Id);
        Task<List<UserViewModel>> GetUsers();
        #endregion
    }
}

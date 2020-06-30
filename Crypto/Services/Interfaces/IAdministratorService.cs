﻿using Crypto.ViewModels.Administrator;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IAdministratorService
    {
        Task AddNews(NewsViewModel request);
        Task<RateDETViewModel> UpdateDETRate(RateDETViewModel request);
        void UpdateBTCRate();
        void AddProfit();
        void AddCommission();

        #region Dev
        Task DelUser(int Id);
        Task<List<UserViewModel>> GetUsers();
        #endregion
    }
}

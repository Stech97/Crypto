﻿using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        Task DeleteInvestment(int investID);
        Task AddNews(News news); 
        Task AddInvestment(Investment investment);
        Task<Balance> UpdateDETRate(Balance balance);
        Task UpdateBTCRate(Balance balance);
        Task AddProfit();
        Task AddCommission();

        #region Dev
        Task DelUser(int Id);
        Task<List<object>> GetUsers();
        #endregion
    }
}

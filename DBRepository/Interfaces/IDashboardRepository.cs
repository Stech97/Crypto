﻿using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IDashboardRepository
    {
        Task<Balance> GetBalance(int Id);
        Task<List<LoginHistory>> GetLoginHistory(int Id);
        Task UpdateBalance(Balance balance, int Id);
        Task<List<News>> GetNews(int Take, int Skip);
    }
}

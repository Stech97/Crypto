﻿using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public class DashboardRepository : BaseRepository, IDashboardRepository
    {
        public DashboardRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory)
        { }

        public async Task<Balance> GetBalance(string Username)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.Balances.FirstOrDefaultAsync(b => b.User.Username == Username);
        }

        public async Task<List<LoginHistory>> GetLoginHistory(string Username)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.LoginHistories.Where(lh => lh.User.Username == Username).ToListAsync();
        }

        public async Task SetLoginHistory(LoginHistory loginHistory)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.LoginHistories.Add(loginHistory);
                await context.SaveChangesAsync();
            }
        }
    }
}

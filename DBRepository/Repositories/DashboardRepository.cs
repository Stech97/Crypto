﻿using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public class DashboardRepository : BaseRepository, IDashboardRepository
    {
        public DashboardRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<Balance> GetBalance(int Id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.Balances.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == Id);
        }

        public async Task<List<LoginHistory>> GetLoginHistory(int Id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.LoginHistories.AsNoTracking().Where(lh => lh.UserId == Id).ToListAsync();
        }

        public async Task<List<News>> GetNews(int Take, int Skip)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var LastMonths = DateTime.Today.AddMonths(-1);
                return await context.News.AsNoTracking()
                    .Where(n=>n.LastChangeDate >= LastMonths).OrderByDescending(n => n.LastChangeDate)
                    .Skip(Skip).Take(Take).ToListAsync();
            }
        }

        public async Task<Balance> ExchangeBalance(Balance balance, int UserId)
        {
            Balance balanceNew = new Balance();

            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                balanceNew = await context.Balances.AsNoTracking()
                    .FirstOrDefaultAsync(b => b.UserId == UserId);

            if (balance.BitcoinBalance != 0)
            {
                if (balance.USDBalance != 0)
                {
                    balanceNew.BitcoinBalance = balance.BitcoinBalance;
                    balanceNew.USDBalance = balance.USDBalance;
                }
                else
                {
                    balanceNew.BitcoinBalance = balance.BitcoinBalance;
                    balanceNew.DefimaBalance = balance.DefimaBalance;
                }
            }
            else
            {
                balanceNew.DefimaBalance = balance.DefimaBalance;
                balanceNew.USDBalance = balance.USDBalance;
            }

            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Balances.Update(balanceNew);
                await context.SaveChangesAsync();
            }

            return balanceNew;
        }
    }
}
                                                                                                                                                        
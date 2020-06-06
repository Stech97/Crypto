using DBRepository.Interfaces;
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
                return await context.LoginHistories.AsNoTracking()
                    .OrderByDescending(lh => lh.LoginTime).Where(lh => lh.UserId == Id).ToListAsync();
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

        public async Task<object> ExchangeBalance(string exchnge, double amount, int UserId)
        {
           using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                object ret = "xcxcx";
                var balanceNew = await context.Balances.FirstOrDefaultAsync(b => b.UserId == UserId);

                if (amount > 0)
                {
                    switch (exchnge)
                    {
                        case "BTCUSD":
                            if (balanceNew.BitcoinBalance > amount)
                            {
                                balanceNew.BitcoinBalance -= amount;
                                balanceNew.USDBalance += (amount * (await GetRate(exchnge)));
                            }
                            else
                                return null;
                            break;
                        case "USDBTC":
                            if (balanceNew.USDBalance > amount)
                            {
                                balanceNew.USDBalance -= amount;
                                balanceNew.BitcoinBalance += (amount * (await GetRate(exchnge)));
                            }
                            else
                                return null;
                            break;
                        case "USDDET":
                            if (balanceNew.USDBalance > amount)
                            {
                                balanceNew.USDBalance -= amount;
                                balanceNew.DefimaBalance += (amount * (await GetRate(exchnge)));
                            }
                            else
                                return null;
                            break;
                        case "DETUSD":
                            if (balanceNew.DefimaBalance > amount)
                            {
                                balanceNew.DefimaBalance -= amount;
                                balanceNew.USDBalance += (amount * (await GetRate(exchnge)));
                            }
                            else
                                return null;
                            break;
                    }

                    context.Balances.Update(balanceNew);
                    await context.SaveChangesAsync();
                    return ret;
                }
                else
                    return null;
            }
        }

        public async Task<Balance> CashBTC(Balance balance, int UserId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var balanceOld = await context.Balances.FirstOrDefaultAsync(b => b.UserId == UserId);
                if ((Math.Abs(balanceOld.BitcoinBalance) < Math.Abs(balance.BitcoinBalance)) && (balance.BitcoinBalance < 0) )
                    return null;
                else
                {
                    balanceOld.BitcoinBalance += balance.BitcoinBalance;
                    context.Balances.Update(balanceOld);
                    await context.SaveChangesAsync();
                    return balanceOld;
                }
            }    
        }
        
        public async Task<double> GetRate(string rate)
        {
            double OutRate;

            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                switch (rate)
                {
                    case "BTCUSD":
                        OutRate = 1 /  await context.Balances.AsNoTracking().Where(b => b.Id == 1).Select(b => b.RateBTC_USD).FirstAsync();
                        break;
                    case "USDBTC":
                        OutRate =  await context.Balances.AsNoTracking().Where(b => b.Id == 1).Select(b => b.RateBTC_USD).FirstAsync();
                        break;
                    case "USDDET":
                        OutRate = await context.Balances.AsNoTracking().Where(b => b.Id == 1).Select(b => b.RateUSD_DEF).FirstAsync();
                        break;
                    case "DETUSD":
                        OutRate = 1 / await context.Balances.AsNoTracking().Where(b => b.Id == 1).Select(b => b.RateUSD_DEF).FirstAsync();
                        break;
                    default:
                        OutRate = 0;
                        break;
                }
            }

            return OutRate;
        }
    
    }
}
                                                                                                                                                        
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
                    .OrderByDescending(lh => lh.LoginTime).Take(15).Where(lh => lh.UserId == Id).ToListAsync();
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
                            if (balanceNew.BitcoinBalance >= amount)
                            {
                                balanceNew.BitcoinBalance -= amount;
                                balanceNew.USDBalance += (amount * (await GetRate(exchnge)));
                            }
                            else
                                return null;
                            break;
                        case "USDBTC":
                            if (balanceNew.USDBalance >= amount)
                            {
                                balanceNew.USDBalance -= amount;
                                balanceNew.BitcoinBalance += (amount * (await GetRate(exchnge)));
                            }
                            else
                                return null;
                            break;
                        case "USDDET":
                            if (balanceNew.USDBalance >= amount)
                            {
                                balanceNew.USDBalance -= amount;
                                balanceNew.DefimaBalance += (amount * (await GetRate(exchnge)));
                            }
                            else
                                return null;
                            break;
                        case "DETUSD":
                            if (balanceNew.DefimaBalance >= amount)
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
                        OutRate =  await context.Balances.AsNoTracking().Where(b => b.Id == 1).Select(b => b.RateBTC_USD).FirstAsync();
                        break;
                    case "USDBTC":
                        OutRate = 1 / await context.Balances.AsNoTracking().Where(b => b.Id == 1).Select(b => b.RateBTC_USD).FirstAsync();
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

        public async Task<User> GetRefLink(int Id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.FirstOrDefaultAsync(u => u.Id == Id);
            }
        }

        public async Task<User> GetTeam(int Ref)
        {
            int countLevel = 0;
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var RefUser = await context.Users.AsNoTracking().Where(u => u.Id == Ref)
                    .Select(u => new User
                    {
                        Id = u.Id,
                        ParentId = u.ParentId ?? 0,
                        RefLink = u.RefLink
                    }).FirstOrDefaultAsync();
                
                RefUser.Children = GetChildrenByParentIdTeam(RefUser.Id, ref countLevel);
                return RefUser;
            }
        }

        public async Task<double> ProfitFromInvest(int Id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.Investments.AsNoTracking().Where(i => i.UserId == Id).SumAsync(i => i.Profit);
        }

        public async Task<double> GetEarningsTeam(int Id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                double Profit = 0;

                var RefUser = await context.Users.Where(u => u.Id == Id)
                    .Select(u => new User
                    {
                        Id = u.Id,
                        ParentId = u.ParentId ?? 0
                    }).AsNoTracking().FirstOrDefaultAsync();
                GetChildrenByParentId(RefUser.Id, ref Profit);

                var UserProfits = await context.Investments.AsNoTracking().Where(i => i.UserId == RefUser.Id).ToListAsync();
                double ProfitTeam = 0;
                foreach (var UserProfit in UserProfits)
                {
                    ProfitTeam += UserProfit.Profit;
                }
                ProfitTeam += Profit;
                return ProfitTeam;
            }
        }

        public async Task<int> GetTotalMembers(int Id)
        {
            int count = 0;
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var RefUser = await context.Users.Where(u => u.Id == Id)
                    .Select(u => new User
                    {
                        Id = u.Id,
                        ParentId = u.ParentId ?? 0
                    }).FirstOrDefaultAsync();
                GetChildrenByParentId(RefUser.Id, ref count);
            }
            return count;
        }

        public async Task<double> GetTotalInvestment(int UserId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.Investments.AsNoTracking()
                    .Where(i => i.UserId == UserId).SumAsync(i => i.AddCash);
        }

        public async Task<double> GetTotalProfit(int Id)
        {
            double TotalProfit = await GetEarningsTeam(Id);
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var Invest = await context.Investments.FirstOrDefaultAsync(i => i.UserId == Id);
                if (Invest != null)
                    TotalProfit += Invest.TotalCommission;
            }
            return TotalProfit;
        }

        public async Task<double> GetLastDayProfit(int Id)
        {
            if (DateTime.Now.DayOfWeek == DayOfWeek.Friday)
            {
                using (var context = ContextFactory.CreateDbContext(ConnectionString))
                {
                    var Invest = await context.Investments.FirstOrDefaultAsync(i => i.UserId == Id);
                    if (Invest != null)
                        return  Invest.LastCommission;
                }
            }
                return 0;
        }

        #region Private
        private IEnumerable<User> GetChildrenByParentIdTeam(int parentId, ref int countLevel)
        {
            var children = new List<User>();
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var RefUsers = context.Users.Where(u => u.ParentId == parentId);
                foreach (var Ref in RefUsers)
                {
                   if (countLevel > 7)
                        return children;
                    var thread = new User
                    {
                        Id = Ref.Id,
                        ParentId = Ref.ParentId ?? 0,
                        RefLink = Ref.RefLink,
                        Children = GetChildrenByParentIdTeam(Ref.Id, ref countLevel)
                    };

                    children.Add(thread);
                    if (thread.Children.Count() == 0)
                        countLevel++;
                }
            }
            return children;
        }

        private void GetChildrenByParentId(int parentId, ref int count)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var RefUsers = context.Users.Where(u => u.ParentId == parentId);
                count += RefUsers.Count();
                foreach (var Ref in RefUsers)
                {
                    GetChildrenByParentId(Ref.Id, ref count);
                }
            }
        }

        private void GetChildrenByParentId(int parentId, ref double profit)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var RefUsers = context.Users.Where(u => u.ParentId == parentId);
                foreach (var Ref in RefUsers)
                {
                    var Children = context.Investments.FirstOrDefault(i => i.UserId == Ref.Id);
                    if (Children != null)                    
                        profit += Children.Profit;

                    GetChildrenByParentId(Ref.Id, ref profit);
                }
            }
        }
//ДЛя начисления коммиссии
        private double GetChildrenByParentIdCommission(int parentId, ref int level)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var RefUsers = context.Users.Where(u => u.ParentId == parentId);
                foreach (var Ref in RefUsers)
                {
                    var thread = new User
                    {
                        Id = Ref.Id,
                        ParentId = Ref.ParentId ?? 0,
                    };
                    GetChildrenByParentIdCommission(Ref.Id, ref level);

                    if (thread.Children.Count() == 0)
                        level++;
                }
            }
            return 0;
        }
        #endregion
    }
}
                                                                                                                                                        
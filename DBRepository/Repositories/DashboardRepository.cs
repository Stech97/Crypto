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

        public async Task<bool> ExchangeBalance(string exchnge, double amount, int UserId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                bool IsExchage = false;
                var balanceNew = await context.Balances.FirstOrDefaultAsync(b => b.UserId == UserId);
                switch (exchnge)
                {
                    case "BTCUSD":
                        if (balanceNew.BitcoinBalance >= amount)
                        {
                            balanceNew.BitcoinBalance -= amount;
                            balanceNew.USDBalance += (amount * (await GetRate(exchnge)));
                            IsExchage = true;
                        }
                        else
                            IsExchage = false;
                        break;
                    case "USDBTC":
                        if (balanceNew.USDBalance >= amount)
                        {
                            balanceNew.USDBalance -= amount;
                            balanceNew.BitcoinBalance += (amount * (await GetRate(exchnge))); 
                            IsExchage = true;
                        }
                        else
                            IsExchage = false;
                        break;
                    case "USDDET":
                        if (balanceNew.USDBalance >= amount)
                        {
                            balanceNew.USDBalance -= amount;
                            balanceNew.DefimaBalance += (amount * (await GetRate(exchnge)));
                            IsExchage = true;
                        }
                        else
                            IsExchage = false;
                        break;
                    case "DETUSD":
                        if (balanceNew.DefimaBalance >= amount)
                        {
                            balanceNew.DefimaBalance -= amount;
                            balanceNew.USDBalance += (amount * (await GetRate(exchnge)));
                            IsExchage = true;
                        }
                        else
                            IsExchage = false;
                        break;
                }

                context.Balances.Update(balanceNew);
                await context.SaveChangesAsync();
                return IsExchage;
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

                    var BalanceHistory = new BalanceHistory()
                    {
                        Amount = balance.BitcoinBalance / balance.RateBTC_USD,
                        Balance = balanceOld.BitcoinBalance / balance.RateBTC_USD,
                        Time = DateTime.Now,
                        UserId = UserId
                    };

                    if (balance.BitcoinBalance > 0)
                        BalanceHistory.TypeInvestmentId = (int)EnumTypeInvestment.Add;
                    else
                        BalanceHistory.TypeInvestmentId = (int)EnumTypeInvestment.Withdraw;

                    context.Balances.Update(balanceOld);
                    context.BalanceHistories.Add(BalanceHistory);

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
                        OutRate =  await context.Balances.AsNoTracking().Select(b => b.RateBTC_USD).FirstAsync();
                        break;
                    case "USDBTC":
                        OutRate = 1 / await context.Balances.AsNoTracking().Select(b => b.RateBTC_USD).FirstAsync();
                        break;
                    case "USDDET":
                        OutRate = await context.Balances.AsNoTracking().Select(b => b.RateUSD_DEF).FirstAsync();
                        break;
                    case "DETUSD":
                        OutRate = 1 / await context.Balances.AsNoTracking().Select(b => b.RateUSD_DEF).FirstAsync();
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
                    }).FirstOrDefaultAsync();
                
                RefUser.Children = GetChildrenByParentIdTeam(RefUser.Id, ref countLevel);
                return RefUser;
            }
        }


        public async Task<object> GetTotalInvestment(int UserId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var rate = await context.Balances.AsNoTracking().Select(b => b.RateBTC_USD).FirstAsync();
                var TotalInvestmentsUSD = await context.Investments.AsNoTracking().Where(i => i.UserId == UserId).SumAsync(i => i.AddCash);
                var TotalInvestmentsBTC = TotalInvestmentsUSD / rate;
                var response = new
                {
                    BTC = TotalInvestmentsBTC,
                    USD = TotalInvestmentsUSD
                };
                return response;
            }
        }

        public async Task<object> GetProfitFromInvest(int Id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var rate = await context.Balances.AsNoTracking().Select(b => b.RateUSD_DEF).FirstAsync();
                var ProfitUSD = await context.Investments.AsNoTracking().Where(i => i.UserId == Id).SumAsync(i => i.Profit);
                var ProfitDET = ProfitUSD * rate;

                var response = new
                {
                    DET = ProfitDET,
                    USD = ProfitUSD
                };

                return response;
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

        public async Task<object> GetEarningsTeam(int Id)
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
                double ProfitTeamUSD = 0;
                foreach (var UserProfit in UserProfits)
                {
                    ProfitTeamUSD += UserProfit.Profit;
                }

                ProfitTeamUSD += Profit;
                var rate = await context.Balances.AsNoTracking().Select(b => b.RateUSD_DEF).FirstAsync();
                double ProfitTeamDET = ProfitTeamUSD * rate;

                var response = new
                {
                    DET = ProfitTeamDET,
                    USD = ProfitTeamUSD
                };

                return response;
            }
        }

        public async Task<object> GetTotalProfit(int Id)
        {
            double TotalProfitUSD = await GetEarningTeam(Id);
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var Invest = await context.Investments.FirstOrDefaultAsync(i => i.UserId == Id);
                if (Invest != null)
                    TotalProfitUSD += Invest.TotalCommission;

                var rate = await context.Balances.AsNoTracking().Select(b => b.RateUSD_DEF).FirstAsync();
                var TotalProfitDET = TotalProfitUSD * rate;

                var response = new
                {
                    DET = TotalProfitDET,
                    USD = TotalProfitUSD
                };

                return response;
            }
        }

        public async Task<object> GetLastWeekProfit(int Id)
        {
            double CommissionUSD = 0;

            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                if (DateTime.Now.DayOfWeek == DayOfWeek.Friday && DateTime.Now.Hour == 18 && DateTime.Now.Minute == 0)
                {
                    var Invest = await context.Investments.FirstOrDefaultAsync(i => i.UserId == Id);
                    if (Invest != null)
                        CommissionUSD = Invest.CurrentCommission;
                }
                else
                {
                    var Invest = await context.Investments.FirstOrDefaultAsync(i => i.UserId == Id);
                    if (Invest != null)
                        CommissionUSD = Invest.LastCommission;
                }
                var rate = await context.Balances.AsNoTracking().Select(b => b.RateUSD_DEF).FirstAsync();
                var CommissionDET = CommissionUSD * rate;

                var response = new
                {
                    DET = CommissionDET,
                    USD = CommissionUSD
                };
                return response;
            }

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
        private async Task<double> GetEarningTeam(int Id)
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
                double ProfitTeamUSD = 0;
                foreach (var UserProfit in UserProfits)
                {
                    ProfitTeamUSD += UserProfit.Profit;
                }

                ProfitTeamUSD += Profit;

                return ProfitTeamUSD;
            }
        }

        #endregion
    }
}
                                                                                                                                                        
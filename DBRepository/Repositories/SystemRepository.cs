using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.Enum;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public class SystemRepository : BaseRepository, ISystemRepository
    {
        public SystemRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task UpdateBTCRate(Rate rate)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Rates = await context.Rates.FirstOrDefaultAsync();
				Rates.BTC_USD = rate.BTC_USD;
				context.Rates.Update(Rates);
				await context.SaveChangesAsync();
			}
		}

		public async Task AddProfit()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Invests = await context.Investments.ToListAsync();
				var Rates = await context.Rates.FirstOrDefaultAsync();

				foreach (var Invest in Invests)
				{
					var Balance = await context.Balances.FirstOrDefaultAsync(b => b.UserId == Invest.UserId);

					var Persent = await context.TypeInvestments.AsNoTracking()
						.Where(ti => ti.Type == Invest.TypeInvest).Select(ti => ti.Persent).FirstOrDefaultAsync();

					if (Invest.Profit == 0)
					{
						var Profit = Invest.AddCash * Persent / 100;
						Invest.Profit = Profit;
						Balance.DefimaBalance += Profit;
					}
					else
					{
						if (!Invest.IsFullInvest)
						{
							var Profit = Invest.Profit * Persent / 100;
							Invest.Profit += Profit;
							if (Invest.Profit >= Invest.AddCash * 3)
							{
								Invest.IsFullInvest = true;
								Invest.Profit = Invest.AddCash * 3;
								Invest.TypeInvest = EnumTypeInvestment.None;
							}
							Balance.DefimaBalance += Profit;
						}
						else
						{
							bool ReInvest = (await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Invest.UserId)).IsReInvest;

							if (ReInvest && Balance.DefimaBalance > Invest.AddCash)
							{
								Invest.IsFullInvest = false;
								Invest.Profit = 0;
								Balance.DefimaBalance -= Invest.AddCash;
								context.Balances.Update(Balance);
								await context.SaveChangesAsync();
							}
						}
					}

					var BalanceHistory = new BalanceHistory()
					{
						Amount = Invest.Profit,
						Balance = Balance.DefimaBalance / Rates.USD_DET,
						Time = System.DateTime.Now,
						UserId = Invest.UserId
					};
					switch (Invest.TypeInvest)
					{
						case EnumTypeInvestment.Small:
							BalanceHistory.TypeHistory = EnumTypeHistory.ProfitSmall;
							break;
						case EnumTypeInvestment.Medium:
							BalanceHistory.TypeHistory = EnumTypeHistory.ProfitMedium;
							break;
						case EnumTypeInvestment.Large:
							BalanceHistory.TypeHistory = EnumTypeHistory.ProfitLarge;
							break;
					}

					context.BalanceHistories.Add(BalanceHistory);
					await context.SaveChangesAsync();

					context.Investments.Update(Invest);
					await context.SaveChangesAsync();
				}
			}
		}

		public async Task AddCommission()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var AllInvests = await context.Investments.ToListAsync();
				var Invests = AllInvests.GroupBy(i => i.UserId).Select(ii => ii.FirstOrDefault()).ToList();
				var Rates = await context.Rates.FirstOrDefaultAsync();
				foreach (var Invest in Invests)
				{
					int level = 1;
					double CurrentCommission = 0;
					var TypeInvest = Invest.TypeInvest;
					int MaxLevel = 0;
                    switch (TypeInvest)
                    {
                        case EnumTypeInvestment.Small:
                            MaxLevel = 2;
                            break;
                        case EnumTypeInvestment.Medium:
                            MaxLevel = 4;
                            break;
                        case EnumTypeInvestment.Large:
                            MaxLevel = 7;
                            break;
                        case EnumTypeInvestment.None:
                            MaxLevel = 0;
                            break;
                    }
                    GetChildren(Invest.UserId, level, MaxLevel, ref CurrentCommission);

					Invest.LastCommission = Invest.CurrentCommission;
					Invest.CurrentCommission = CurrentCommission;
					Invest.TotalCommission += CurrentCommission;

					var Balance = await context.Balances.FirstOrDefaultAsync(b => b.UserId == Invest.UserId);
					Balance.DefimaBalance += CurrentCommission * Rates.USD_DET;

					var BalanceHistory = new BalanceHistory()
					{
						Amount = CurrentCommission,
						Balance = Balance.DefimaBalance / Rates.USD_DET,
						Time = System.DateTime.Now,
						TypeHistory = EnumTypeHistory.Comission,
						UserId = Invest.UserId
					};

					context.BalanceHistories.Add(BalanceHistory);
					context.Investments.Update(Invest);
					await context.SaveChangesAsync();
                }
            }
        }

        #region Private Methods
        private void GetChildren(int parentId, int level, int MaxLevel, ref double CurrentCommission)
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
						Children = GetChildren(Ref.Id)
					};

					var Persent = context.TypeCommissions.FirstOrDefault(tc => tc.Level == level);

					var invest = context.Investments.FirstOrDefault(i => i.UserId == Ref.Id);

					if (level > MaxLevel)
						return;
					if (level > 0 || level < 8)
						if (invest != null)
							CurrentCommission += Persent.Value * invest.Profit;
						else
							if (Ref.IsSuper && invest != null)
							CurrentCommission += 0.005 * invest.Profit;

					if (thread.Children.Count() > 0)
					{
						level++;
						GetChildren(Ref.Id, level, MaxLevel, ref CurrentCommission);
					}

				}
			}
		}

		private IEnumerable<User> GetChildren(int parentId)
		{
			var children = new List<User>();
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var RefUsers = context.Users.Where(u => u.ParentId == parentId);
				foreach (var Ref in RefUsers)
				{
					var thread = new User
					{
						Id = Ref.Id,
						ParentId = Ref.ParentId ?? 0,
						Children = GetChildren(Ref.Id)
					};

					children.Add(thread);
				}
			}
			return children;
		}

        #endregion

    }
}

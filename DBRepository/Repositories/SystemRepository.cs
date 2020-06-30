using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public class SystemRepository : BaseRepository, ISystemRepository
    {
        public SystemRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task UpdateBTCRate(Balance balance)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				await context.Balances.ForEachAsync(x => { x.RateBTC_USD = balance.RateBTC_USD; });
				await context.SaveChangesAsync();
			}
		}

		public async Task AddProfit()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Invests = await context.Investments.ToListAsync();

				foreach (var Invest in Invests)
				{
					var Persent = await context.TypeInvestments.AsNoTracking()
						.Where(ti => ti.Id == Invest.TypeInvestmentId).Select(ti => ti.Persent).FirstOrDefaultAsync();

					if (Invest.Profit == 0)
					{
						var Profit = Invest.AddCash * Persent / 100;
						Invest.Profit = Profit;
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
								Invest.TypeInvestmentId = 0;
							}
						}
						else
						{
							bool ReInvest = (await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Invest.UserId)).IsReInvest;
							var Balance = await context.Balances.FirstOrDefaultAsync(b => b.UserId == Invest.UserId);

							if (ReInvest && Balance.DefimaBalance > Invest.AddCash)
							{
								Invest.IsFullInvest = false;
								Invest.Profit = 0;
								Balance.DefimaBalance -= Invest.AddCash;
								context.Balances.Update(Balance);
							}
						}
					}
					context.Investments.Update(Invest);
				}
			}
		}

		public async Task AddCommission()
		{
			DashboardRepository dashboardRepository = new DashboardRepository(ConnectionString, ContextFactory);

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var AllInvests = await context.Investments.ToListAsync();
				var Invests = AllInvests.GroupBy(i => i.UserId).Select(ii => ii.FirstOrDefault()).ToList();
				foreach (var Invest in Invests)
				{
					int level = 1;
					double CurrentCommission = 0;
					int TypeInvest = Invest.TypeInvestmentId;
					int MaxLevel = 0;
					switch (TypeInvest)
					{
						case 1:
							MaxLevel = 1;
							break;
						case 2:
							MaxLevel = 4;
							break;
						case 3:
							MaxLevel = 7;
							break;
						default:
							MaxLevel = 0;
							break;
					}
					GetChildren(Invest.UserId, level, MaxLevel, ref CurrentCommission);

					Invest.LastCommission = Invest.CurrentCommission;
					Invest.CurrentCommission = CurrentCommission;
					Invest.TotalCommission += CurrentCommission;

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

					if (level >= MaxLevel)
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

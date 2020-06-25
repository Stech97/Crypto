using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
	public class AdminstratorRepository : BaseRepository, IAdministratorRepository
	{
		public AdminstratorRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task DeleteInvestment(int investID)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var invest = new Investment() { Id = investID };
				context.Investments.Remove(invest);
				await context.SaveChangesAsync();
			}
		}

		public async Task AddInvestment(Investment investment)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.Investments.Add(investment);
				await context.SaveChangesAsync();
			}
		}

		public async Task AddNews(News news)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.News.Add(news);
				await context.SaveChangesAsync();
			}
		}

        public async Task<Balance> UpdateDETRate(Balance balance)
        {
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				await context.Balances.ForEachAsync(x => { x.RateUSD_DEF = balance.RateUSD_DEF; });
				await context.SaveChangesAsync();
				return await context.Balances.AsNoTracking().FirstOrDefaultAsync();
			}
		}

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
					var Persent = (await context.TypeInvestments.AsNoTracking().FirstOrDefaultAsync(ti => ti.Id == Invest.TypeInvestmentId)).Persent;
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

        #region Dev
        public async Task DelUser(int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var user = new User() { Id = Id };
				context.Remove(user);
				await context.SaveChangesAsync();
			}
		}

		public async Task<List<object>> GetUsers()
		{
			List<object> response = new List<object>();
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Users = await context.Users.AsNoTracking().ToListAsync();
				foreach (var user in Users)
				{
					var token = await context.CurrentSessions.FirstOrDefaultAsync(cs => cs.UserId == user.Id);
					if (token != null)
					{
						var Res = new
						{
							user.Id,
							user.Username,
							user.FirstName,
							user.LastName,
							user.Email,
							user.IsVerified,
							token.Token
						};
						response.Add(Res);
					}
					else
					{
						var Res = new
						{
							user.Id,
							user.Username,
							user.FirstName,
							user.LastName,
							user.Email,
							user.IsVerified,
							token = ""
						};
						response.Add(Res);
					}
				}
				return response;
			}

		}
        #endregion
	}
}

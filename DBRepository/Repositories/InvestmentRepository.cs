using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace DBRepository.Repositories
{
	public class InvestmentRepository : BaseRepository, IInvestmentRepository
	{
		public InvestmentRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task<double> GetLastDayInvestment(int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var LastDay = System.DateTime.Now.AddDays(-1);
				return await context.Investments.AsNoTracking()
					.Where(i => i.DateInvestment >= LastDay && i.UserId == UserId).SumAsync(i => i.AddCash);
			}
		}

		public async Task<List<Investment>> GetInvestments(int UserId, int Take)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
				return await context.Investments.AsNoTracking()
					.Where(i => i.UserId == UserId).OrderByDescending(i => i.DateInvestment).Take(Take).ToListAsync();
		}

		public async Task<string> BuyInvestment(Investment investment, string cur, int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var balance = context.Balances.FirstOrDefault(b => b.UserId == UserId);
				switch (cur)
				{
					case "BTC":
						if (balance.BitcoinBalance >= investment.AddCash)
						{
							balance.BitcoinBalance -= investment.AddCash;
							investment.UserId = UserId;
							context.Investments.Add(investment);
							context.Balances.Update(balance);
							await context.SaveChangesAsync();
							return "Ok";
						}
						else
							return "Balance less";						
					case "USD":
						if (balance.USDBalance >= investment.AddCash)
						{
							balance.USDBalance -= investment.AddCash;
							investment.UserId = UserId;
							context.Investments.Add(investment);
							context.Balances.Update(balance);
							await context.SaveChangesAsync();
							return "Ok";
						}
						else
							return "Balance less";
					case "DET":
						if (balance.DefimaBalance >= investment.AddCash)
						{
							balance.DefimaBalance -= investment.AddCash;
							investment.UserId = UserId;
							context.Investments.Add(investment);
							context.Balances.Update(balance);
							await context.SaveChangesAsync();
							return "Ok";
						}
						else
							return "Balance less";
					default:
						return "No found";
				}
			}
		}
	}
}

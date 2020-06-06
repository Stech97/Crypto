using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Models;
using System.Collections.Generic;
using System.Linq;

namespace DBRepository.Repositories
{
	public class InvestmentRepository : BaseRepository, IInvestmentRepository
	{
		public InvestmentRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task<double> GetTotalInvestment(int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
				return await context.Investments.AsNoTracking()
					.Where(i => i.UserId == UserId).SumAsync(i => i.AddCash);
		}

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

		/*public async Task BuyInvestment(Investment investment, Balance balance, int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var x = context.Balances.FirstOrDefault(b => b.UserId == UserId);
			}
		}*/
	}
}

using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Models;
using System.Linq;
using System.Collections.Generic;

namespace DBRepository.Repositories
{
	public class InvestmentRepository : BaseRepository, IInvestmentRepository
	{
		public InvestmentRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task<Investment> GetInvestment(int investID)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
				return await context.Investments.FirstOrDefaultAsync(i => i.InvestmentID == investID);
		}

		public async Task <List<Investment>> GetInvestments()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
				return await context.Investments.ToListAsync();
		}

		public async Task AddInvestment(Investment investment)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.Investments.Add(investment);
				await context.SaveChangesAsync();
			}
		}

		public async Task DeleteInvestment(int investID)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var invest = new Investment() { InvestmentID = investID };
				context.Investments.Remove(invest);
				await context.SaveChangesAsync();
			}
		}

		public async Task<Balance> GetBalance(string UserName)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
				return await context.Balances.FirstOrDefaultAsync(b => b.User.Username == UserName);
		}
	}
}

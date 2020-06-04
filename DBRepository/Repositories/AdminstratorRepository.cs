using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Extensions.Internal;
using Models;
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

        public async Task<Balance> UpdateRate(Balance balance)
        {
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				await context.Balances.ForEachAsync(x => { x.RateUSD_DEF = balance.RateUSD_DEF; });
				await context.SaveChangesAsync();
				return await context.Balances.AsNoTracking().FirstOrDefaultAsync();
			}
		}
    }
}

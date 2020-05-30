using DBRepository.Interfaces;
using Models;
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
	}
}

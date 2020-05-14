using DBRepository.Interfaces;
using Models;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
	public class EmailRepository : BaseRepository, IEmailRepository
	{
		public EmailRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task AddEmail(Email email)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.Emails.Add(email);
				await context.SaveChangesAsync();
			}
		}
	}
}

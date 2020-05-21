using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Repositories
{
    public class IdentityRepository : BaseRepository, IIdentityRepository
	{
		public IdentityRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task<User> GetUser(string userName)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Users.FirstOrDefaultAsync(u => u.Username == userName);
			}
		}

		public async Task<User> GetUser(int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Users.FirstOrDefaultAsync(u => u.UserId == Id);
			}
		}

		public async Task AddUser(User user)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.Users.Add(user);
				await context.SaveChangesAsync();
			}
		}
	}
}

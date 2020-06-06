using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Models;
using Microsoft.EntityFrameworkCore.Extensions.Internal;

namespace DBRepository.Repositories
{
	public class IdentityRepository : BaseRepository, IIdentityRepository
	{
		public IdentityRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task<User> GetUser(string userName)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == userName);
			}
		}

		public async Task<User> GetUser(int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Id);
			}
		}

		public async Task AddUser(User user)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.Users.Add(user);
				await context.SaveChangesAsync();

				var newUser = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == user.Username);
				var rateBTC = await context.Balances.AsNoTracking().Where(b => b.Id == 1).Select(b => b.RateBTC_USD).FirstAsync();
				var rateDEF = await context.Balances.AsNoTracking().Where(b => b.Id == 1).Select(b => b.RateUSD_DEF).FirstAsync();
				var newWallet = new Balance
				{
					USDBalance = 0,
					BitcoinBalance = 0,
					DefimaBalance = 0,
					RateBTC_USD = rateBTC,
					RateUSD_DEF = rateDEF,
					User = newUser,
					UserId = newUser.Id
				};

				context.Balances.Add(newWallet);
				await context.SaveChangesAsync();

			}
		}

		public async Task SetLoginHistory(LoginHistory loginHistory)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.LoginHistories.Add(loginHistory);
				await context.SaveChangesAsync();
			}
		}

		public async Task SetCurrentSession(CurrentSession currentSession)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.CurrentSessions.Add(currentSession);
				await context.SaveChangesAsync();
			}
		}

		public async Task SignOut(int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var currentSession = await context.CurrentSessions.FirstOrDefaultAsync(cs => cs.UserId == Id);
				context.CurrentSessions.Remove(currentSession);
				await context.SaveChangesAsync();
			}
		}

		public async Task ChangePassword(User user, int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var newPassword = await context.Users.FirstOrDefaultAsync(u => u.Id == Id && u.Username == user.Username);
				newPassword.Password = user.Password;
				context.Users.Update(newPassword);
				await context.SaveChangesAsync();
			}
		}

		public async Task<User> CheckInfo(User user)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == user.Username || u.Email == user.Email);
		}
	}
}

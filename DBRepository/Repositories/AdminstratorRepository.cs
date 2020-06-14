using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
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

        public async Task<List<User>> GetRef(int Ref)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var RefUsers = await context.Users.Where(u => u.Id == Ref)
					.Select(u => new User
					{
						Id = u.Id,
						ParentId = u.ParentId ?? 0,
						RefLink = u.RefLink
					}).ToListAsync();
				foreach (var RefUser in RefUsers)
				{
					RefUser.Children = GetChildrenByParentId(RefUser.Id);
				}
				return RefUsers;
			}
		}

		private IEnumerable<User> GetChildrenByParentId(int parentId)
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
						RefLink = Ref.RefLink,
						Children = GetChildrenByParentId(Ref.Id)
					};

					children.Add(thread);
				}
			}

			return children;
		}
	}
}

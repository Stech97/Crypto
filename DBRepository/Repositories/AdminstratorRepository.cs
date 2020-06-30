using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
	public class AdminstratorRepository : BaseRepository, IAdministratorRepository
	{
		public AdminstratorRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task AddNews(News news)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.News.Add(news);
				await context.SaveChangesAsync();
			}
		}

		public async Task UpdateNews(News news, string heder)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var oldNews = await context.News.FirstOrDefaultAsync(n => n.Header == heder);

				if (oldNews != null)
				{
					if (news.Header != null)
						oldNews.Header = news.Header;
					if (news.Description != null)
						oldNews.Description = news.Description;
					if (news.Body != null)
						oldNews.Body = news.Body;
					oldNews.LastChangeDate = news.LastChangeDate;

					context.News.Update(oldNews);
					await context.SaveChangesAsync();
				}
			}
		}

		public async Task DeleteNews(string heder)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var news = await context.News.FirstOrDefaultAsync(n => n.Header == heder);
				if (news != null)
				{
					context.News.Remove(news);
					await context.SaveChangesAsync();
				}
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

		#region Dev
		public async Task DelUser(int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var user = new User() { Id = Id };
				context.Users.Remove(user);
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

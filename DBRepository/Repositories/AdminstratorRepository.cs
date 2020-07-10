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

		#region Upload Files
		public async Task UploadFiles(byte[] image, string name, string Component)
		{
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Market = await contex.MarketFiles.FirstOrDefaultAsync(mf => mf.Component == Component);
				if (Market != null)
				{
					Market.Content = image;
					Market.Name = name;
				}

				contex.MarketFiles.Update(Market);
				await contex.SaveChangesAsync();
			}
		}
		#endregion

		#region Users
		public async Task<object> GetUsersInfo()
		{
			List<object> response = new List<object>();

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Users = await context.Users.ToListAsync();
				var Rates = await context.Rates.FirstOrDefaultAsync();

				foreach (var user in Users)
				{
					var Invest = await context.Investments.FirstOrDefaultAsync(i => i.UserId == user.Id);
					var BalanceHistory = await context.BalanceHistories.FirstOrDefaultAsync(i => i.UserId == user.Id);

					if (Invest != null && BalanceHistory != null)
					{
						var TotalAdded = await context.Investments.Where(i => i.UserId == user.Id).SumAsync(i => i.AddCash);

						var TotalCommission = (await context.Investments.FirstOrDefaultAsync(i => i.UserId == user.Id)).TotalCommission;

						var TotalWitdrowed = await context.BalanceHistories
							.Where(bh => bh.UserId == user.Id && bh.TypeHistory == EnumTypeHistory.Withdraw).SumAsync(bh => bh.Amount);

						var TotalTeamCommission = await context.BalanceHistories
							.Where(bh => bh.UserId == user.Id && bh.TypeHistory == EnumTypeHistory.Comission).SumAsync(bh => bh.Amount);

						var resp = new
						{
							Name = user.FirstName + " " + user.LastName,
							user.Email,
							user.Phone,
							TotalAdded,
							TotalCommission,
							TotalTeamCommission,
							TotalWitdrowed,
							SuperUser = user.IsSuper,
						};
						response.Add(resp);
					}
					else
					{
						var resp = new
						{
							Name = user.FirstName + " " + user.LastName,
							user.Email,
							user.Phone,
							TotalAdded = 0,
							TotalCommission = 0,
							TotalTeamCommission = 0,
							TotalWitdrowed = 0,
							SuperUser = user.IsSuper,
						};
						response.Add(resp);
					}
				}
			}
			return response;
		}
        #endregion

        #region News
        public async Task<News> AddNews(News news)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.News.Add(news);
				await context.SaveChangesAsync();
				return news;
			}
		}

		public async Task<News> UpdateNews(News news, string heder)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var oldNews = await context.News.FirstOrDefaultAsync(n => n.Header == heder);

				if (oldNews == null)
					return null;

				if (news.Header != null)
					oldNews.Header = news.Header;
				if (news.Description != null)
					oldNews.Description = news.Description;
				if (news.Body != null)
					oldNews.Body = news.Body;
				oldNews.LastChangeDate = news.LastChangeDate;

				context.News.Update(oldNews);
				await context.SaveChangesAsync();
				return oldNews;
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
		#endregion

		#region Main Page
		public async Task<MainPage> GetInfo(string Component)
		{
			MainPage response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == Component);
				if (main != null)
				{
					response = new MainPage()
					{
						Component = main.Component,
						Header = main.Header,
						SubHeader = main.SubHeader,
						Text = main.Text
					};
				}
			}
			return response;
		}

		public async Task UpdateInfo(MainPage mainPage)
		{
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == mainPage.Component);
				if (main != null)
				{
					if (mainPage.Header != null)
						main.Header = mainPage.Header;
					if (mainPage.SubHeader != null)
						main.SubHeader = mainPage.SubHeader;
					if (mainPage.Text != null)
						main.Text = mainPage.Text;

					contex.MainPages.Update(main);
					await contex.SaveChangesAsync();
				}
			}
		}

		public async Task<MainPage> GetFAQ()
		{
			MainPage response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == "FAQ");
				if (main != null)
				{
					response = new MainPage()
					{
						Component = main.Component,
						Header = main.Header,
						Text = main.Text,
						Question1Header = main.Question1Header,
						Question2Header = main.Question2Header,
						Question3Header = main.Question3Header,
						Question1Text = main.Question1Text,
						Question2Text = main.Question2Text,
						Question3Text = main.Question3Text
					};
				}
			}
			return response;
		}

		public async Task UpdateFAQ(MainPage mainPage)
		{
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == mainPage.Component);
				if (main != null)
				{
					if (mainPage.Header != null)
						main.Header = mainPage.Header;
					if (mainPage.Text != null)
						main.Text = mainPage.Text;

					if (mainPage.Question1Header != null)
						main.Question1Header = mainPage.Question1Header;
					if (mainPage.Question2Header != null)
						main.Question2Header = mainPage.Question2Header;
					if (mainPage.Question3Header != null)
						main.Question3Header = mainPage.Question3Header;

					if (mainPage.Question1Text != null)
						main.Question1Text = mainPage.Question1Text;
					if (mainPage.Question2Text != null)
						main.Question2Text = mainPage.Question2Text;
					if (mainPage.Question3Text != null)
						main.Question3Text = mainPage.Question3Text;

					contex.MainPages.Update(main);
					await contex.SaveChangesAsync();
				}
			}
		}

		public async Task<MainPage> GetAbout()
		{
			MainPage response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == "FAQ");
				if (main != null)
				{
					response = new MainPage()
					{
						Component = main.Component,
						Header = main.Header,
						SubHeader = main.SubHeader,
						Text = main.Text,
						Name1 = main.Name1,
						Name2 = main.Name2,
						Name3 = main.Name3,
						Title1 = main.Title1,
						Title2 = main.Title2,
						Title3 = main.Title3,
						Link1 = main.Link1,
						Link2 = main.Link2,
						Link3 = main.Link3
					};
				}
			}
			return response;
		}

		public async Task UpdateAbout(MainPage mainPage)
		{
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == mainPage.Component);
				if (main != null)
				{
					if (mainPage.Header != null)
						main.Header = mainPage.Header;
					if (mainPage.SubHeader != null)
						main.SubHeader = mainPage.SubHeader;
					if (mainPage.Text != null)
						main.Text = mainPage.Text;

					if (mainPage.Name1 != null)
						main.Name1 = mainPage.Name1;
					if (mainPage.Name2 != null)
						main.Name2 = mainPage.Name2;
					if (mainPage.Name3 != null)
						main.Name3 = mainPage.Name3;

					if (mainPage.Title1 != null)
						main.Title1 = mainPage.Title1;
					if (mainPage.Title2 != null)
						main.Title2 = mainPage.Title2;
					if (mainPage.Title3 != null)
						main.Title3 = mainPage.Title3;

					if (mainPage.Link1 != null)
						main.Link1 = mainPage.Link1;
					if (mainPage.Link2 != null)
						main.Link2 = mainPage.Link2;
					if (mainPage.Link3 != null)
						main.Link3 = mainPage.Link3;

					contex.MainPages.Update(main);
					await contex.SaveChangesAsync();
				}
			}
		}

		public async Task<Images> GetPic(string Component)
		{
			Images response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == Component);
				if (main != null)
				{
					response = new Images()
					{
						Image = main.Image,
						ImageName = main.ImageName
					};
				}
			}
			return response;
		}

		public async Task UpdatePic(byte[] image, string nameFile, string Component)
		{
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == Component);
				if (main != null)
				{
					main.Image = image;
					main.ImageName = nameFile;
				}

				contex.MainPages.Update(main);
				await contex.SaveChangesAsync();
			}
		}
        
		#endregion

        #region Get Picture 
        public async Task<Images> GetPassportPicture(int UserId)
		{
			Images response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var user = await contex.Users.FirstOrDefaultAsync(u => u.Id == UserId);
				if (user != null)
				{
					response = new Images()
					{
						Image = user.PassportPicture,
						ImageName = user.PassportPictureName
					};
				}
			}
			return response;
		}

		public async Task<Images> GetProofPicture(int UserId)
		{
			Images response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var user = await contex.Users.FirstOrDefaultAsync(u => u.Id == UserId);
				if (user != null)
				{
					response = new Images()
					{
						Image = user.ProofPicture,
						ImageName = user.ProofPictureName
					};
				}
			}
			return response;
		}

		public async Task<Images> GetSelfiPicture(int UserId)
		{
			Images response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var user = await contex.Users.FirstOrDefaultAsync(u => u.Id == UserId);
				if (user != null)
				{
					response = new Images()
					{
						Image = user.SelfiPicture,
						ImageName = user.SelfiPictureName
					};
				}
			}
			return response;
		}

		#endregion

		#region Finance
		public async Task<Rate> GetRate()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Rates.AsNoTracking().FirstOrDefaultAsync();
			}
		}

		public async Task UpdateDETRate(Rate rate)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Rate = await context.Rates.FirstOrDefaultAsync();
				Rate.USD_DET = rate.USD_DET;
				context.Rates.Update(Rate);
				await context.SaveChangesAsync();
			}
		}

		public async Task<List<TypeCommission>> GetCommission()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.TypeCommissions.ToListAsync();
			}
		}

		public async Task UpdateCommission(List<TypeCommission> Types)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.UpdateRange(Types);
				await context.SaveChangesAsync();
			}
		}

		public async Task<List<TypeInvestment>> GetProfit()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.TypeInvestments.ToListAsync();
			}
		}

		public async Task UpdateProfit(List<TypeInvestment> Types)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				context.UpdateRange(Types);
				await context.SaveChangesAsync();
			}
		}

		#endregion

		#region Dashboard
		public async Task<double> GetAddedFounds()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.BalanceHistories.AsNoTracking()
					.Where(bh => bh.TypeHistory == EnumTypeHistory.Add).SumAsync(bh => bh.Amount);
			}
		}

		public async Task<object> GetInvestedAmount()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Invest = await context.Investments.AsNoTracking().SumAsync(i => i.AddCash);
				var Rate = await context.Rates.AsNoTracking().FirstOrDefaultAsync();

				var response = new
				{
					USD = Invest,
					DET = Invest / Rate.USD_DET
				};

				return response;
			}
		}

		public async Task<int> GetCountUser()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Users.AsNoTracking().CountAsync();
			}
		}

		public async Task<int> GetCountUserWithInvest()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var CountInvests = (await context.Investments.AsNoTracking().ToListAsync())
					.GroupBy(i => i.UserId).Select(ii => ii.FirstOrDefault()).ToList().Count;
				return CountInvests;
			}
		}

		public async Task<double> GetWithdrawnAmount()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.BalanceHistories.AsNoTracking()
					.Where(bh => bh.TypeHistory == EnumTypeHistory.Withdraw).SumAsync(bh => bh.Amount);
			}
		}

		public async Task<object> GetAllUsersBalance()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var BalanceUSD = await context.Balances.AsNoTracking().SumAsync(b => b.USDBalance);
				var BalanceDET = await context.Balances.AsNoTracking().SumAsync(b => b.DefimaBalance);

				var response = new
				{
					USD = BalanceUSD,
					DET = BalanceDET
				};
				return response;
			}
		}

		public async Task<double> GetAllCommission()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.Investments.SumAsync(i => i.TotalCommission);
			}
		}

		public async Task<List<WithdrawAll>> GetWithdrawalRequest()
		{
			var response = new List<WithdrawAll>(); 

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Rate = await context.Rates.AsNoTracking().FirstOrDefaultAsync();

				var Withdraws = await context.BalanceHistories.AsNoTracking()
					.Where(bh => bh.TypeHistory == EnumTypeHistory.Withdraw).ToListAsync();
				
				foreach (var Withdraw in Withdraws)
				{
					var Username = await context.Users.FirstOrDefaultAsync(u => u.Id == Withdraw.UserId);

					if (Username.IsKYC)
					{
						var resp = new WithdrawAll()
						{
							Amount = Withdraw.Amount / Rate.BTC_USD,
							Username = Username.Username,
							UserId = Withdraw.UserId
						};
						response.Add(resp);
					}
				}
			}

			return response;
		}

		public async Task<List<object>> GetKYC()
		{
			var response = new List<object>();

			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Users =  await contex.Users.Where(u => !u.IsKYC).ToListAsync();
				foreach (var user in Users)
				{
					var resp = new
					{
						user.Id,
						user.Username
					};
					response.Add(resp);
				}
			}

			return response;
		}

		public async Task AcceptAllWithdrawal()
		{
			/*using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Users = context.Users.Where(u => !u.IsKYC).ToList();
				foreach (var user in Users)
				{
					user.IsKYC = true;
					context.Users.Update(user);
					await context.SaveChangesAsync();
				}
			}*/
		}

		public async Task AcceptWithdrawal(int UserId)
		{
			/*using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var user = context.Users.Where(u => !u.IsKYC).FirstOrDefault(u => u.Id == UserId);
				user.IsKYC = true;
				context.Users.Update(user);
				await context.SaveChangesAsync();
			}*/
		}

		public async Task AcceptAllKYC()
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Users = context.Users.Where(u => !u.IsKYC).ToList();
				foreach (var user in Users)
				{
					user.IsKYC = true;
					context.Users.Update(user);
					await context.SaveChangesAsync();
				}
			}
		}

		public async Task AcceptKYC(int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var user = context.Users.Where(u => !u.IsKYC).FirstOrDefault(u => u.Id == UserId);
					user.IsKYC = true;
					context.Users.Update(user);
					await context.SaveChangesAsync();
			}
		}

		#endregion

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

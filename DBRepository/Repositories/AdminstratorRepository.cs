using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTO;
using Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
	public class AdminstratorRepository : BaseRepository, IAdministratorRepository
	{
		public AdminstratorRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		#region Files Market
		public async Task UploadFiles(byte[] image, string name, string Component)
		{
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
            var Market = await contex.MarketFiles.FirstOrDefaultAsync(mf => mf.Component == Component);
            if (Market != null)
            {
                Market.Content = image;
                Market.Name = name;
            }

            contex.MarketFiles.Update(Market);
            await contex.SaveChangesAsync();
        }

		public async Task<Market> DowloadFiles(string Component)
		{
			using var contex = ContextFactory.CreateDbContext(ConnectionString);
			var Market = await contex.MarketFiles.FirstOrDefaultAsync(mf => mf.Component == Component);
			var MarketOut = new Market()
			{
				Content = Market.Content,
				Name = Market.Name
			};
			return MarketOut;
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
							user.Id,
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
							user.Id,
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
        
		public async Task<bool> Super(int Id, bool Super)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == Id);
            user.IsSuper = Super;
            context.Users.Update(user);
            await context.SaveChangesAsync();
            return user.IsSuper;
        }

		public async Task<User> GetUser(string userName)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            return await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == userName);
        }

		public async Task<ReAuth> ReAuth(int UserId)
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
			var CurrentSession = await context.CurrentSessions.FirstOrDefaultAsync(cs => cs.UserId == UserId);
			if (CurrentSession == null)
				return null;

			ReAuth reAuth = null;
			var DifTime = CurrentSession.LoginTime.AddMinutes(60) - DateTime.Now;

			if (DifTime.Minutes > 5)
				reAuth = new ReAuth() { Status = EnumTypeAuth.TimeOk };

			if (DifTime.Minutes > 0 && DifTime.Minutes <= 5)
			{
				var Users = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == UserId);

				reAuth = new ReAuth()
				{
					Username = Users.Username,
					IsVerified = Users.IsVerified,
					IsFogotPassword = Users.IsFogotPassword,
					IsBlock = Users.IsBlock,
					IsAdmin = Users.IsAdmin,
					Status = EnumTypeAuth.EndTime
				};

				CurrentSession.LoginTime = DateTime.Now;
				context.Update(CurrentSession);
				await context.SaveChangesAsync();
			}

			if (DifTime.Minutes <= 0)
			{
				reAuth = new ReAuth() { Status = EnumTypeAuth.NoAuth };

				context.Remove(CurrentSession);
				await context.SaveChangesAsync();
			}

			return reAuth;
		}

		public async Task SetCurrentSession(CurrentSession currentSession)
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
			var current = await context.CurrentSessions.FirstOrDefaultAsync(cs => cs.UserId == currentSession.UserId);

			if (current != null)
			{
				current.LoginTime = currentSession.LoginTime;
				context.CurrentSessions.Update(current);
			}
			else
				context.CurrentSessions.Add(currentSession);

			await context.SaveChangesAsync();
		}

		#endregion

		#region News
		public async Task<News> AddNews(News news)
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
				context.News.Add(news);
				await context.SaveChangesAsync();
				return news;
		}

		public async Task<News> UpdateNews(News news, string heder)
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
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

		public async Task DeleteNews(string heder)
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
				var news = await context.News.FirstOrDefaultAsync(n => n.Header == heder);
				if (news != null)
				{
					context.News.Remove(news);
					await context.SaveChangesAsync();
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
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
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
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
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

		public async Task<MainPage> GetAbout()
		{
			MainPage response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == "about_us");
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
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
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

		public async Task<Images> GetPic(string Component, int Possition)
		{
			Images response = null;
			using (var contex = ContextFactory.CreateDbContext(ConnectionString))
			{
				var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == Component);
				if (main != null)
				{
					if (Component == "about_us")
					{
						switch (Possition)
						{
							case 1:

								response = new Images()
								{
									Image = main.Picture1,
									ImageName = main.Picture1Name
								};
								break;
							case 2:

								response = new Images()
								{
									Image = main.Picture2,
									ImageName = main.Picture2Name
								};
								break;
							case 3:

								response = new Images()
								{
									Image = main.Picture3,
									ImageName = main.Picture3Name
								};
								break;
						}
					}
					else
					{
						response = new Images()
						{
							Image = main.Image,
							ImageName = main.ImageName
						};
					}
				}
			}
			return response;
		}

		public async Task UpdatePic(byte[] image, string nameFile, string Component, int Possition)
		{
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
            var main = await contex.MainPages.FirstOrDefaultAsync(mp => mp.Component == Component);
            if (main != null)
            {
                switch (Possition)
                {
                    case 0:
                        main.Image = image;
                        main.ImageName = nameFile;
                        break;
                    case 1:
                        main.Picture1 = image;
                        main.Picture1Name = nameFile;
                        break;
                    case 2:
                        main.Picture2 = image;
                        main.Picture2Name = nameFile;
                        break;
                    case 3:
                        main.Picture3 = image;
                        main.Picture3Name = nameFile;
                        break;
                }
            }

            contex.MainPages.Update(main);
            await contex.SaveChangesAsync();
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
		public async Task<Models.Rate> GetRate()
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
				return await context.Rates.AsNoTracking().FirstOrDefaultAsync();
		}

		public async Task UpdateDETRate(Models.Rate rate)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var Rate = await context.Rates.FirstOrDefaultAsync();
            Rate.USD_DET = rate.USD_DET;
            context.Rates.Update(Rate);
            await context.SaveChangesAsync();
        }

		public async Task<List<TypeCommission>> GetCommission()
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            return await context.TypeCommissions.ToListAsync();
        }

		public async Task UpdateCommission(List<TypeCommission> Types)
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
				context.UpdateRange(Types);
				await context.SaveChangesAsync();
		}

		public async Task<List<TypeInvestment>> GetProfit()
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
				return await context.TypeInvestments.ToListAsync();
		}

		public async Task UpdateProfit(List<TypeInvestment> Types)
		{
			using var context = ContextFactory.CreateDbContext(ConnectionString);
				context.UpdateRange(Types);
				await context.SaveChangesAsync();
		}

        #endregion

        #region Dashboard

        #region Period

        public async Task<double> GetAddedFounds(EnumTypePeriod Period)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            DateTime timePeriod = DateTime.Now;

            switch (Period)
            {
                case EnumTypePeriod.None:
                    timePeriod = DateTime.MinValue;
                    break;
                case EnumTypePeriod.Week:
                    timePeriod = timePeriod.AddDays(-7);
                    break;
                case EnumTypePeriod.Month:
                    timePeriod = timePeriod.AddMonths(-1);
                    break;
                case EnumTypePeriod.Month3:
                    timePeriod = timePeriod.AddMonths(-3);
                    break;
                case EnumTypePeriod.Month6:
                    timePeriod = timePeriod.AddMonths(-6);
                    break;
                case EnumTypePeriod.Year:
                    timePeriod = timePeriod.AddYears(-1);
                    break;
            }

            return await context.BalanceHistories.AsNoTracking()
                .Where(bh => bh.TypeHistory == EnumTypeHistory.Add && bh.DateTransaction >= timePeriod).SumAsync(bh => bh.Amount);
        }

		public async Task<object> GetInvestedAmount(EnumTypePeriod Period)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            DateTime timePeriod = DateTime.Now;

            switch (Period)
            {
                case EnumTypePeriod.None:
                    timePeriod = DateTime.MinValue;
                    break;
                case EnumTypePeriod.Week:
                    timePeriod = timePeriod.AddDays(-7);
                    break;
                case EnumTypePeriod.Month:
                    timePeriod = timePeriod.AddMonths(-1);
                    break;
                case EnumTypePeriod.Month3:
                    timePeriod = timePeriod.AddMonths(-3);
                    break;
                case EnumTypePeriod.Month6:
                    timePeriod = timePeriod.AddMonths(-6);
                    break;
                case EnumTypePeriod.Year:
                    timePeriod = timePeriod.AddYears(-1);
                    break;
            }

            var Invest = await context.Investments.AsNoTracking().Where(i => i.DateInvestment >= timePeriod).SumAsync(i => i.AddCash);
            var Rate = await context.Rates.AsNoTracking().FirstOrDefaultAsync();

            var response = new
            {
                USD = Invest,
                DET = Invest / Rate.USD_DET
            };

            return response;
        }

		public async Task<int> GetCountUser(EnumTypePeriod Period)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            DateTime timePeriod = DateTime.Now;

            switch (Period)
            {
                case EnumTypePeriod.None:
                    timePeriod = DateTime.MinValue;
                    break;
                case EnumTypePeriod.Week:
                    timePeriod = timePeriod.AddDays(-7);
                    break;
                case EnumTypePeriod.Month:
                    timePeriod = timePeriod.AddMonths(-1);
                    break;
                case EnumTypePeriod.Month3:
                    timePeriod = timePeriod.AddMonths(-3);
                    break;
                case EnumTypePeriod.Month6:
                    timePeriod = timePeriod.AddMonths(-6);
                    break;
                case EnumTypePeriod.Year:
                    timePeriod = timePeriod.AddYears(-1);
                    break;
            }

            return await context.Users.AsNoTracking().Where(u => u.DateCreate >= timePeriod).CountAsync();
        }

		public async Task<int> GetCountUserWithInvest()
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var CountInvests = (await context.Investments.AsNoTracking().ToListAsync())
                .GroupBy(i => i.UserId).Select(ii => ii.FirstOrDefault()).ToList().Count;
            return CountInvests;
        }

		public async Task<double> GetWithdrawnAmount(EnumTypePeriod Period)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            DateTime timePeriod = DateTime.Now;

            switch (Period)
            {
                case EnumTypePeriod.None:
                    timePeriod = DateTime.MinValue;
                    break;
                case EnumTypePeriod.Week:
                    timePeriod = timePeriod.AddDays(-7);
                    break;
                case EnumTypePeriod.Month:
                    timePeriod = timePeriod.AddMonths(-1);
                    break;
                case EnumTypePeriod.Month3:
                    timePeriod = timePeriod.AddMonths(-3);
                    break;
                case EnumTypePeriod.Month6:
                    timePeriod = timePeriod.AddMonths(-6);
                    break;
                case EnumTypePeriod.Year:
                    timePeriod = timePeriod.AddYears(-1);
                    break;
            }

            return await context.BalanceHistories.AsNoTracking()
                .Where(bh => bh.TypeHistory == EnumTypeHistory.Withdraw && bh.DateTransaction >= timePeriod).SumAsync(bh => bh.Amount);
        }

		public async Task<object> GetAllUsersBalance()
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var BalanceUSD = await context.Balances.AsNoTracking().SumAsync(b => b.USDBalance);
            var BalanceDET = await context.Balances.AsNoTracking().SumAsync(b => b.DefimaBalance);

            var response = new
            {
                USD = BalanceUSD,
                DET = BalanceDET
            };
            return response;
        }

		public async Task<double> GetAllCommission(EnumTypePeriod Period)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            DateTime timePeriod = DateTime.Now;

            switch (Period)
            {
                case EnumTypePeriod.None:
                    timePeriod = DateTime.MinValue;
                    break;
                case EnumTypePeriod.Week:
                    timePeriod = timePeriod.AddDays(-7);
                    break;
                case EnumTypePeriod.Month:
                    timePeriod = timePeriod.AddMonths(-1);
                    break;
                case EnumTypePeriod.Month3:
                    timePeriod = timePeriod.AddMonths(-3);
                    break;
                case EnumTypePeriod.Month6:
                    timePeriod = timePeriod.AddMonths(-6);
                    break;
                case EnumTypePeriod.Year:
                    timePeriod = timePeriod.AddYears(-1);
                    break;
            }

            return await context.Investments.Where(i => i.DateInvestment >= timePeriod).SumAsync(i => i.TotalCommission);
        }

        #endregion

        public async Task<List<WithdrawAll>> GetWithdrawalRequest()
		{
			var response = new List<WithdrawAll>(); 

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Rate = await context.Rates.AsNoTracking().FirstOrDefaultAsync();

				var Withdraws = await context.BalanceHistories.AsNoTracking()
					.Where(bh => 
						   bh.TypeHistory == EnumTypeHistory.Withdraw ||
						   bh.TypeHistory == EnumTypeHistory.AcceptWithdraw ||
						   bh.TypeHistory == EnumTypeHistory.DiscardWithdraw)
					.ToListAsync();
				
				foreach (var Withdraw in Withdraws)
				{
					var Username = await context.Users.FirstOrDefaultAsync(u => u.Id == Withdraw.UserId);
					var Balance = await context.Balances.FirstOrDefaultAsync(b => b.UserId == Withdraw.UserId);

					if (Username.IsKYC)
					{
						var resp = new WithdrawAll()
						{
							Amount = Withdraw.Amount / Rate.BTC_USD,
							Username = Username.Username,
							UserId = Withdraw.UserId,
							Wallet = Balance.BitcoinWallet
						};

						switch (Withdraw.TypeHistory)
						{
							case EnumTypeHistory.AcceptWithdraw:
								resp.Status = EnumTypeWithdraw.Accept;
								break;
							case EnumTypeHistory.DiscardWithdraw:
								resp.Status = EnumTypeWithdraw.Discard;
								break;
							case EnumTypeHistory.Withdraw:
								resp.Status = EnumTypeWithdraw.Withdraw;
								break;
						}

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
				var Users =  await contex.Users.Where(u => (u.SelfiPicture != null && u.SelfiPictureName != null) &&
														   (u.PassportPicture != null && u.PassportPictureName != null) &&
														   (u.ProofPicture != null && u.ProofPictureName != null)).ToListAsync();
				foreach (var user in Users)
				{
					var resp = new
					{
						user.Id,
						user.Username,
						user.IsKYC
					};
					response.Add(resp);
				}
			}

			return response;
		}

		public async Task<List<string>> AcceptAllWithdrawal()
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var balance = await context.Balances.Select(b => b.BitcoinWallet).Where(b => b != null).ToListAsync();
            await context.BalanceHistories.ForEachAsync(x => { x.TypeHistory = EnumTypeHistory.AcceptWithdraw; });

            await context.SaveChangesAsync();

            return balance;
        }

		public async Task<string> AcceptWithdrawal(int UserId)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var balance = await context.Balances.FirstOrDefaultAsync(u => u.UserId == UserId);
            var balanceHistory = await context.BalanceHistories
                    .Where(bh => bh.TypeHistory == EnumTypeHistory.Withdraw).LastOrDefaultAsync(u => u.UserId == UserId);

            if (balance != null && balanceHistory != null)
            {
                var Rate = await context.Rates.FirstOrDefaultAsync();

                balanceHistory.TypeHistory = EnumTypeHistory.AcceptWithdraw;
                context.BalanceHistories.Update(balanceHistory);
                ;
                await context.SaveChangesAsync();
            }
            return null;
        }

		public async Task DiscardWithdraw(int UserId)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var Rates = await context.Rates.FirstOrDefaultAsync();
            var balance = await context.Balances.FirstOrDefaultAsync(u => u.UserId == UserId);
            var balanceHistory = await context.BalanceHistories.Where(bh => bh.TypeHistory == EnumTypeHistory.Withdraw)
                .LastOrDefaultAsync(u => u.UserId == UserId);

            balance.BitcoinBalance = balanceHistory.Amount / Rates.BTC_USD;
            balanceHistory.TypeHistory = EnumTypeHistory.DiscardWithdraw;
            context.BalanceHistories.Update(balanceHistory);
            context.Balances.Update(balance);

            await context.SaveChangesAsync();
        }

		public async Task AcceptAllKYC()
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            await context.Users.Where(u => !u.IsKYC && (u.SelfiPicture != null && u.SelfiPictureName != null) &&
                                                 (u.PassportPicture != null && u.PassportPictureName != null) &&
                                                 (u.ProofPicture != null && u.ProofPictureName != null))
                                                    .ForEachAsync(u => { u.IsKYC = true; });
            await context.SaveChangesAsync();
        }

		public async Task AcceptKYC(int UserId)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            user.IsKYC = true;
            user.IsDiscard = false;
            user.ErrorDiscard = null;
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }

		public async Task DiscardKYC(int UserId, string Error)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var user = context.Users.FirstOrDefault(u => u.Id == UserId);
            user.IsKYC = false;
            user.IsDiscard = true;
            user.ErrorDiscard = Error;
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }

		#endregion

		#region Dev
		public async Task DelUser(int Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var user = new User() { Id = Id };
            context.Users.Remove(user);
            await context.SaveChangesAsync();
        }

		public async Task<List<UserInfoDTO>> GetUsers()
		{
			List<UserInfoDTO> response = new List<UserInfoDTO>();
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var Users = await context.Users.AsNoTracking().ToListAsync();
            foreach (var user in Users)
            {
                var Res = new UserInfoDTO()
                {
                    Id = user.Id,
                    Username = user.Username,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    IsVerified = user.IsVerified,
                };
                response.Add(Res);
            }
            return response;

        }
		#endregion
    }
}

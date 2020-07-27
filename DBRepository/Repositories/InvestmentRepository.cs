using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Models;
using System.Collections.Generic;
using System.Linq;
using Models.Enum;

namespace DBRepository.Repositories
{
	public class InvestmentRepository : BaseRepository, IInvestmentRepository
	{
		public InvestmentRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task<List<Investment>> GetInvestments(int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
				return await context.Investments.AsNoTracking()
					.Where(i => i.UserId == UserId).OrderByDescending(i => i.DateInvestment).ToListAsync();
		}

		public async Task<Balance> BuyInvestment(Investment investment, string cur, int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var balance = context.Balances.FirstOrDefault(b => b.UserId == UserId);
				var Rates = await context.Rates.FirstOrDefaultAsync();

				switch (cur)
				{
					case "BTC":
						if (balance.BitcoinBalance >= investment.AddCash)
						{
							balance.BitcoinBalance -= investment.AddCash;
							investment.UserId = UserId;
							investment.AddCash *= Rates.BTC_USD;
							context.Investments.Add(investment);

							var BalanceHistory = new BalanceHistory()
							{
								Time = investment.DateInvestment,
								Amount = investment.AddCash,
								Balance = balance.BitcoinBalance * Rates.BTC_USD,
								UserId = UserId
							};

							switch (investment.TypeInvest)
							{
								case EnumTypeInvestment.Small:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuySmall;
									break;
								case EnumTypeInvestment.Medium:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuyMedium;
									break;
								case EnumTypeInvestment.Large:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuyLarge;
									break;
							}

							context.BalanceHistories.Add(BalanceHistory);

							context.Balances.Update(balance);
							await context.SaveChangesAsync();

							return await context.Balances.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == UserId);
						}
						else
							return await context.Balances.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == UserId);
					case "USD":
						if (balance.USDBalance >= investment.AddCash)
						{
							balance.USDBalance -= investment.AddCash;
							investment.UserId = UserId;
							context.Investments.Add(investment);

							var BalanceHistory = new BalanceHistory()
							{
								Time = investment.DateInvestment,
								Amount = investment.AddCash,
								Balance = balance.USDBalance,
								UserId = UserId
							};

							switch (investment.TypeInvest)
							{
								case EnumTypeInvestment.Small:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuySmall;
									break;
								case EnumTypeInvestment.Medium:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuyMedium;
									break;
								case EnumTypeInvestment.Large:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuyLarge;
									break;
							}

							context.BalanceHistories.Add(BalanceHistory);

							context.Balances.Update(balance);
							await context.SaveChangesAsync();

							return await context.Balances.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == UserId);
						}
						else
							return await context.Balances.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == UserId);
					case "DET":
						if (balance.DefimaBalance >= investment.AddCash)
						{
							balance.DefimaBalance -= investment.AddCash;
							investment.UserId = UserId;
							investment.AddCash /= Rates.USD_DET;
							context.Investments.Add(investment);

							var BalanceHistory = new BalanceHistory()
							{
								Time = investment.DateInvestment,
								Amount = investment.AddCash,
								Balance = balance.DefimaBalance / Rates.USD_DET,
								UserId = UserId
							};

							switch (investment.TypeInvest)
							{
								case EnumTypeInvestment.Small:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuySmall;
									break;
								case EnumTypeInvestment.Medium:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuyMedium;
									break;
								case EnumTypeInvestment.Large:
									BalanceHistory.TypeHistory = EnumTypeHistory.BuyLarge;
									break;
							}

							context.BalanceHistories.Add(BalanceHistory);

							context.Balances.Update(balance);
							await context.SaveChangesAsync();

							return await context.Balances.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == UserId);
						}
						else
							return await context.Balances.AsNoTracking().FirstOrDefaultAsync(b => b.UserId == UserId);
					default:
						return null;
				}
			}
		}

		public async Task<List<PopupTeam>> GetTeamPop(int UserId, int Level)
		{
			int countLevel = 1;
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var RefUser = await context.Users.AsNoTracking().Where(u => u.Id == UserId)
					.Select(u => new User
					{
						Id = u.Id,
						ParentId = u.ParentId ?? 0
					}).FirstOrDefaultAsync();

				RefUser.Children = GetChildrenByParentIdTeam(RefUser.Id, ref countLevel);

				if (Level > countLevel)
					return null;

				var Users = BreadthFirst(RefUser, Level);
				List<PopupTeam> popupTeams = new List<PopupTeam>();
				foreach (var User in Users)
				{
					var Invest = await context.Investments.AsNoTracking().FirstOrDefaultAsync(u => u.UserId == User.Id);
					if (Invest != null)
					{
						var TotalInvestments = await context.Investments.AsNoTracking().Where(i => i.UserId == User.Id).SumAsync(i => i.AddCash);
						var Persent = context.TypeCommissions.FirstOrDefault(tc => tc.Level == Level);
						PopupTeam team = null;
						if (Level == 1 && User.IsShowInfo)
						{
							team = new PopupTeam()
							{
								Username = User.Username,
								Email = User.Email,
								ProditsPaid = Invest.Profit,
								TotalInvestments = TotalInvestments
							};
						}
						else
						{
							team = new PopupTeam()
							{
								Username = User.Username,
								Email = "XXX",
								ProditsPaid = Invest.Profit,
								TotalInvestments = TotalInvestments
							};
						}
						team.TotalEarning = team.ProditsPaid * Persent.Value;
						popupTeams.Add(team);
					}
				}
				return popupTeams;

			}
		}

		public async Task<List<Team>> GetTeamLevel(int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var Teams = new List<Team>();
				for (int i = 1; i < 8; i++)
				{
					var Persent = context.TypeCommissions.FirstOrDefault(tc => tc.Level == i);
					var Level = await GetTeamPop(UserId, i);
					if (Level != null)
					{
						var team = new Team()
						{
							Level = i,
							Members = Level.Count(),
							TotalInvested = Level.Sum(l => l.TotalInvestments),
							ProfitsPaid = Level.Sum(l => l.ProditsPaid),
							Commission = Persent.Value,
							TotalEarning = Level.Sum(l => l.TotalEarning)
						};
						Teams.Add(team);
					}
				}
				return Teams;
			}
		}

		public async Task<List<BalanceHistory>> GetBalanceHistory(int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				return await context.BalanceHistories.AsNoTracking()
					.Where(i => i.UserId == UserId).OrderByDescending(i => i.Time).ToListAsync();
			}
		}

		public async Task<List<Investment>> GetInvestmentHistory(int UserId)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
				return await context.Investments.AsNoTracking()
					.Where(i => i.UserId == UserId).OrderByDescending(i => i.DateInvestment).ToListAsync();
		}

		#region Private Methods
		private Queue<User> BreadthFirst(User node, int level)
		{
			Queue<User> nodesQueue = new Queue<User>();
			nodesQueue.Enqueue(node);
			for (int i = 0; i < level; i++)
			{
				User currentNode = nodesQueue.Dequeue();
				if (currentNode.Children != null)
					foreach (User childNode in currentNode.Children)
						nodesQueue.Enqueue(childNode);
			}
			return nodesQueue;
		}
		
		private IEnumerable<User> GetChildrenByParentIdTeam(int parentId, ref int countLevel)
		{
			var children = new List<User>();
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var RefUsers = context.Users.Where(u => u.ParentId == parentId);
				foreach (var Ref in RefUsers)
				{
					User thread = new User
					{
						Id = Ref.Id,
						ParentId = Ref.ParentId ?? 0,
						Username = Ref.Username,
						Email = Ref.Email,
						Children = GetChildrenByParentIdTeam(Ref.Id, ref countLevel)
					}; 
						if (thread.Children.Count() != 0)
							countLevel++;
					children.Add(thread);
				}
			}
			return children;
		}
		#endregion
	}
}

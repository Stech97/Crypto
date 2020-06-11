using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Models;
using System.Security.Cryptography;
using System.Text;
using System.ComponentModel.DataAnnotations;

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

		public async Task<object> GetUser(int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var UserViewModel = await context.Users.AsNoTracking().Join(context.CurrentSessions,
					u => u.Id,
					cs => cs.UserId,
					(u, cs) => new
					{
						Id = u.Id,
						Username = u.Username,
						FirstName = u.FirstName,
						LastName = u.LastName,
						Email = u.Email,
						Token = cs.Token,
						IsVerified = u.IsVerified,
					}).FirstOrDefaultAsync(u => u.Id == Id);
				return UserViewModel;

			}
		}

		public async Task<string> AddUser(User user)
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

				ConfirmEmail confirmEmail = new ConfirmEmail
				{
					Email = newUser.Email,
					User = newUser,
					UserId = newUser.Id
				};
				context.ConfirmEmails.Add(confirmEmail);
				await context.SaveChangesAsync();
				
				string hash = "";
				using (MD5 md5Hash = MD5.Create())		
					hash = GetMd5Hash(md5Hash, newUser.Email);
				return hash;
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
			User outUser = new User();
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var tempUser = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == user.Username);
				if (tempUser != null)
				{
					outUser.Username = tempUser.Username;
					tempUser = null;
				}
				else
					outUser.Username = "";
				tempUser = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == user.Email);
				if (tempUser != null)
					outUser.Email = tempUser.Email;
				else
					outUser.Email = "";

				if (outUser.Email == "" && outUser.Username == "")
					outUser = null;

			}
			return outUser;
		}

		public async Task<object> ConfirmEmail(string Id)
		{
			object confirmEmail = null;

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				int confirmUserId = 0;

				var Emails = await context.ConfirmEmails.AsNoTracking().ToListAsync();
				foreach (var email in Emails)
				{
					using (MD5 md5Hash = MD5.Create())
					{
						var tempEmail = GetMd5Hash(md5Hash, email.Email);
						if (tempEmail == Id)
						{
							confirmUserId = email.UserId;
							context.ConfirmEmails.Remove(email);
							await context.SaveChangesAsync();
							break;
						}
					}
				}

				if (confirmUserId != 0)
				{
					var confirmUser = await context.Users.FirstOrDefaultAsync(u => u.Id == confirmUserId);
					confirmUser.IsVerified = true;
					context.Users.Update(confirmUser);
					await context.SaveChangesAsync();


					var currentSession = await context.CurrentSessions.AsNoTracking().FirstOrDefaultAsync(cs => cs.UserId == confirmUserId);
					if (currentSession != null)
						confirmEmail = new
						{
							Id = confirmUserId,
							Username = confirmUser.Username,
							Token = currentSession.Token,
							IsVerification = confirmUser.IsVerified,
							Status = "Ok"
						};
					else
						confirmEmail = new
						{
							Id = confirmUserId,
							Username = confirmUser.Username,
							Token = "No login",
							IsVerification = confirmUser.IsVerified,
							Status = "No login"

						};
				}
				else
					confirmEmail = new
					{
						Id = "",
						Username = "",
						Token = "",
						IsVerification = "",
						Status = "No user"
					};
			}

			return confirmEmail;
		}

		public async Task<object> FogotPassword(User user)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var findUser = await context.Users.FirstOrDefaultAsync(u => u.Username == user.Username && u.Email == user.Email);

				if (findUser != null)
				{
					findUser.IsFogotPassword = true;
					context.Users.Update(findUser);
					await context.SaveChangesAsync();

					var fogot = findUser.Username + " " + findUser.Email;
					string hash = "";
					using (MD5 md5Hash = MD5.Create())
						hash = GetMd5Hash(md5Hash, fogot);

					var fogotPassword = new
					{
						Hash = hash,
						Email = findUser.Email,
						Status = "Ok"

					};

					return fogotPassword;
				}
				else
				{
					var fogotPassword = new
					{
						Hash = "No found",
						Email = user.Email,
						Status = "No found"
					};

					return fogotPassword;
				}
			}
		}

        public async Task<object> AcceptFogot(string Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var fogotUsers = await context.Users.AsNoTracking().Where(u => u.IsFogotPassword).ToListAsync();
				
				var ConfirmFogot = new
				{
					Username = "",
					Status = ""
				};

				if (fogotUsers != null)
				{
					foreach (var fogotUser in fogotUsers)
					{
						var fogot = fogotUser.Username + " " + fogotUser.Email;
						string hash = "";
						using (MD5 md5Hash = MD5.Create())
							hash = GetMd5Hash(md5Hash, fogot);
						if (hash == Id)
						{
							ConfirmFogot = new
							{
								Username = fogotUser.Username,
								Status = "Ok"
							};
							break;
						}
					}
					return ConfirmFogot;
				}
				else
				{
					ConfirmFogot = new
					{
						Username = "",
						Status = "Not found"
					};
					return ConfirmFogot;
				}
			}
		}

		private string GetMd5Hash(MD5 md5Hash, string input)
		{
			byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

			StringBuilder sBuilder = new StringBuilder();
			for (int i = 0; i < data.Length; i++)
				sBuilder.Append(data[i].ToString("x2"));

			return sBuilder.ToString();
		}

    }
}

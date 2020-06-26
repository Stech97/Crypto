using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Models;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic;

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

		public async Task<Dictionary<string, object>> GetUser(int Id)
		{
			Dictionary<string, object> response = new Dictionary<string, object>(1);

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Id);
				var token = await context.CurrentSessions.AsNoTracking().FirstOrDefaultAsync(cs => cs.UserId == Id);
				if (token != null)
				{
					var UserViewModel = new
					{
                        user.Id,
                        user.Username,
                        user.FirstName,
                        user.LastName,
                        user.Email,
                        token.Token,
                        user.IsVerified,
					};
					response.Add("Ok", UserViewModel);
				}
                else 
				{
					var UserViewModel = new
                    {
                        user.Id,
                        user.Username,
                        user.FirstName,
                        user.LastName,
                        user.Email,
						Token = "",
                        user.IsVerified,
					};
					response.Add("No login", UserViewModel);
				}
				return response;
			}
		}

		public async Task<string> AddUser(User user)
		{
			var check = await CheckInfo(user);
			if (check == null)
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
						TimeConfirm = System.DateTime.UtcNow,
						User = newUser,
						UserId = newUser.Id
					};
					context.ConfirmEmails.Add(confirmEmail);
					await context.SaveChangesAsync();

					string hash = "";
					using (MD5 md5Hash = MD5.Create())
						hash = GetMd5Hash(md5Hash, confirmEmail.TimeConfirm.ToString());
					return hash;
				}
			}
			else
				return null;
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

		public async Task<Dictionary<string, object>> ConfirmEmail(string Id)
		{
			Dictionary<string, object> response = new Dictionary<string, object>(1);

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				int confirmUserId = 0;

				var Emails = await context.ConfirmEmails.AsNoTracking().ToListAsync();
				foreach (var email in Emails)
				{
					using (MD5 md5Hash = MD5.Create())
					{
						var tempEmail = GetMd5Hash(md5Hash, email.TimeConfirm.ToString());
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
					{
						var confirmEmail = new
						{
							Id = confirmUserId,
							confirmUser.Username,
							currentSession.Token,
							IsVerification = confirmUser.IsVerified,
						};
						response.Add("Ok", confirmEmail);
					}
					else
					{
						var confirmEmail = new
						{
							Id = confirmUserId,
							confirmUser.Username,
							Token = "No login",
							IsVerification = confirmUser.IsVerified,
						};
						response.Add("No login", confirmEmail);
					}
				}
				else
				{
					var confirmEmail = new
					{
						Id = "",
						Username = "",
						Token = "",
						IsVerification = "",
					};
					response.Add("No user", confirmEmail);
				}
			}

			return response;
		}

		public async Task<Dictionary<string, object>> ForgotPassword(User user)
		{
			Dictionary<string, object> response = new Dictionary<string, object>(1);
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var findUser = await context.Users.FirstOrDefaultAsync(u => u.Username == user.Username && u.Email == user.Email);

				if (findUser != null && !findUser.IsFogotPassword)
				{
					findUser.IsFogotPassword = true;
					ForgotPassword forgotPassword = new ForgotPassword()
					{
						TimeForgot = System.DateTime.Now,
						Username = findUser.Username,
						Email = findUser.Email,
						User = findUser,
						UserId = findUser.Id
					};
					context.ForgotPasswords.Add(forgotPassword);
					context.Users.Update(findUser);
					await context.SaveChangesAsync();

					var fogot = forgotPassword.Username + " " + forgotPassword.Email + " " + forgotPassword.TimeForgot.ToString();
					string hash = "";
					using (MD5 md5Hash = MD5.Create())
						hash = GetMd5Hash(md5Hash, fogot);

					var fogotPassword = new
					{
						Hash = hash,
                        findUser.Email,
						findUser.Username
					};
					response.Add("Ok", fogotPassword);
				}
				else
				{
					var fogotPassword = new
					{
						Hash = "Not found",
                        user.Email,
						user.Username
					};
					response.Add("Not found", fogotPassword);
				}
			}
			return response;
		}

        public async Task<Dictionary<string, object>> AcceptForgot(string Id)
		{
			Dictionary<string, object> response = new Dictionary<string, object>(1);

			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var forgotPassword = await context.ForgotPasswords.AsNoTracking().ToListAsync();

				if (forgotPassword.Count != 0)
				{
					foreach (var fogotUser in forgotPassword)
					{
						var fogot = fogotUser.Username + " " + fogotUser.Email + " " + fogotUser.TimeForgot.ToString();
						string hash = "";
						using (MD5 md5Hash = MD5.Create())
							hash = GetMd5Hash(md5Hash, fogot);
						if (hash == Id)
						{
							var ConfirmFogot = new
							{
								Id = fogotUser.UserId,
								fogotUser.Username
							};
							response.Add("Ok", ConfirmFogot);
							return response;
						}
					}
				}
				else
				{
					var ConfirmFogot = new
					{
						Id = 0,
						Username = ""
					};
					response.Add("No found", ConfirmFogot);
				}
				return response;
			}
		}
		public async Task RecoveryPassword(User user, int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var newPassword = await context.Users.FirstOrDefaultAsync(u => u.Id == Id);
				newPassword.Username = user.Username;
				newPassword.Password = user.Password;
				newPassword.IsFogotPassword = false;
				var forgotPassword = await context.ForgotPasswords.FirstOrDefaultAsync(fp => fp.UserId == Id);
				context.ForgotPasswords.Remove(forgotPassword);
				context.Users.Update(newPassword);
				await context.SaveChangesAsync();
			}
		}

		public async Task UpdateInfo(User user, int Id)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var updateUser = await context.Users.FirstOrDefaultAsync(u => u.Id == Id);
				updateUser.Email = user.Email;
				updateUser.Phone = user.Phone;
				updateUser.FirstName = user.FirstName;
				updateUser.LastName = user.LastName;
				updateUser.Adress = user.Adress;
				updateUser.Zip = user.Zip;
				updateUser.BDay = user.BDay;
				context.Users.Update(updateUser);
				await context.SaveChangesAsync();
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

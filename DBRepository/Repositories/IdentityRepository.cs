using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Models;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic;
using Models.DTO;
using System;
using Models.Enum;

namespace DBRepository.Repositories
{
	public class IdentityRepository : BaseRepository, IIdentityRepository
	{
		public IdentityRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task<User> GetUser(string userName)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            return await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == userName);
        }

		public async Task<object> GetUser(int Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Id);

            var response = new
            {
                user.Id,
                user.Username
            };

            return response;
        }

		public async Task<object> GetUserInfo(int Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Id);

            if (user.IsDiscard)
            {
                var response = new
                {
                    user.Email,
                    user.Phone,
                    user.FirstName,
                    user.LastName,
                    user.BDay,
                    user.Country,
                    user.Adress,
                    user.Zip,
                    user.IsReInvest,
                    user.IsShowInfo,
                    user.IsKYC,
                    user.IsDiscard,
                    user.ErrorDiscard
                };
                return response;
            }
            else
            {
                var response = new
                {
                    user.Email,
                    user.Phone,
                    user.FirstName,
                    user.LastName,
                    user.BDay,
                    user.Country,
                    user.Adress,
                    user.Zip,
                    user.IsReInvest,
                    user.IsShowInfo,
                    user.IsKYC,
                    user.IsDiscard,
                };
                return response;
            }
        }

		public async Task<string> AddUser(User user, string Parent)
		{
			var check = await CheckInfo(user);
			if (check == null)
			{
                using var context = ContextFactory.CreateDbContext(ConnectionString);
                var IsParsed = int.TryParse(Parent, out int ParentId);
                if (!IsParsed)
                {
                    var ParentUser = await GetUser(Parent);
                    if (ParentUser != null)
                        ParentId = (await GetUser(Parent)).Id;
                }

                if (ParentId != 0)
                    user.ParentId = ParentId;

                context.Users.Add(user);
                await context.SaveChangesAsync();

                var newUser = await context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);

                var newWallet = new Balance
                {
                    USDBalance = 0,
                    BitcoinBalance = 0,
                    DefimaBalance = 0,
                    User = newUser,
                    UserId = newUser.Id
                };

                ConfirmEmail confirmEmail = new ConfirmEmail
                {
                    TimeConfirm = System.DateTime.UtcNow,
                    User = newUser,
                    UserId = newUser.Id
                };

                context.Balances.Add(newWallet);
                context.ConfirmEmails.Add(confirmEmail);
                await context.SaveChangesAsync();

                string hash = "";
                using (MD5 md5Hash = MD5.Create())
                    hash = GetMd5Hash(md5Hash, confirmEmail.TimeConfirm.ToString());
                return hash;
            }
			else
				return null;
		}

		public async Task SetLoginHistory(LoginHistory loginHistory)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            context.LoginHistories.Add(loginHistory);
            await context.SaveChangesAsync();
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

		public async Task SignOut(int Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var currentSession = await context.CurrentSessions.FirstOrDefaultAsync(cs => cs.UserId == Id);
            context.CurrentSessions.Remove(currentSession);
            await context.SaveChangesAsync();
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

		public async Task<Comfirm> ConfirmEmail(string Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            int confirmUserId = 0;

            var Emails = await context.ConfirmEmails.AsNoTracking().ToListAsync();
            foreach (var email in Emails)
            {
                using MD5 md5Hash = MD5.Create();
                var tempEmail = GetMd5Hash(md5Hash, email.TimeConfirm.ToString());
                if (tempEmail == Id)
                {
                    confirmUserId = email.UserId;
                    context.ConfirmEmails.Remove(email);
                    await context.SaveChangesAsync();
                    break;
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
                    var response = new Comfirm()
                    {
                        Id = confirmUserId,
                        Username = confirmUser.Username,
                        IsVerified = confirmUser.IsVerified,
                        TypeComfirmEmail = EnumTypeComfirm.Ok
                    };
                    return response;
                }
                else
                {
                    var response = new Comfirm()
                    {
                        Id = confirmUserId,
                        Username = confirmUser.Username,
                        IsVerified = confirmUser.IsVerified,
                        TypeComfirmEmail = EnumTypeComfirm.NoLogin
                    };
                    return response;
                }
            }
            else
            {
                var response = new Comfirm()
                {
                    Id = null,
                    Username = null,
                    IsVerified = null,
                    TypeComfirmEmail = EnumTypeComfirm.NoUser
                };
                return response;
            }
        }

		public async Task<Forgot> ForgotPassword(User user)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var findUser = await context.Users.FirstOrDefaultAsync(u => u.Username == user.Username && u.Email == user.Email);

            if (findUser != null)
            {
                if (!findUser.IsFogotPassword)
                {
                    findUser.IsFogotPassword = true;
                    ForgotPassword forgotPassword = new ForgotPassword()
                    {
                        TimeForgot = System.DateTime.Now,
                        Username = findUser.Username,
                        Email = findUser.Email,
                        CountAttempt = 1,
                        User = findUser,
                        UserId = findUser.Id
                    };
                    context.ForgotPasswords.Add(forgotPassword);
                    context.Users.Update(findUser);
                    await context.SaveChangesAsync();

                    var fogot = forgotPassword.Username + " " + forgotPassword.Email + " "
                        + forgotPassword.CountAttempt.ToString() + " " + forgotPassword.TimeForgot.ToString();

                    string hash = "";
                    using (MD5 md5Hash = MD5.Create())
                        hash = GetMd5Hash(md5Hash, fogot);

                    var response = new Forgot()
                    {
                        Hash = hash,
                        Email = findUser.Email,
                        Username = findUser.Username,
                        CountAttempt = 1,
                        TypeForgotPassword = EnumTypeForgot.Ok
                    };

                    return response;
                }
                else
                {
                    findUser.IsFogotPassword = true;
                    var forgotPassword = await context.ForgotPasswords.FirstOrDefaultAsync(fa => fa.UserId == findUser.Id);

                    if (forgotPassword.CountAttempt < 5)
                    {
                        forgotPassword.CountAttempt++;

                        context.ForgotPasswords.Update(forgotPassword);
                        context.Users.Update(findUser);
                        await context.SaveChangesAsync();

                        var fogot = forgotPassword.Username + " " + forgotPassword.Email + " "
                        + forgotPassword.CountAttempt.ToString() + " " + forgotPassword.TimeForgot.ToString();

                        string hash = "";
                        using (MD5 md5Hash = MD5.Create())
                            hash = GetMd5Hash(md5Hash, fogot);

                        var response = new Forgot()
                        {
                            Hash = hash,
                            Email = findUser.Email,
                            Username = findUser.Username,
                            CountAttempt = forgotPassword.CountAttempt,
                            TypeForgotPassword = EnumTypeForgot.Ok
                        };

                        return response;
                    }
                    else
                    {
                        forgotPassword.CountAttempt++;
                        findUser.IsFogotPassword = true;
                        findUser.IsBlock = true;
                        context.Users.Update(findUser);
                        await context.SaveChangesAsync();

                        var response = new Forgot()
                        {
                            Hash = null,
                            Email = findUser.Email,
                            Username = findUser.Username,
                            CountAttempt = forgotPassword.CountAttempt,
                            TypeForgotPassword = EnumTypeForgot.Blocked
                        };

                        return response;
                    }
                }
            }
            else
            {
                var response = new Forgot()
                {
                    Hash = null,
                    Email = user.Email,
                    Username = user.Username,
                    CountAttempt = null,
                    TypeForgotPassword = EnumTypeForgot.NotFound
                };

                return response;
            }
        }

        public async Task<Accept> AcceptForgot(string Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
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
                        var response = new Accept()
                        {
                            Id = fogotUser.UserId,
                            Username = fogotUser.Username,
                            IsOk = true
                        };
                        return response;
                    }
                }
            }
            else
            {
                var response = new Accept()
                {
                    Id = null,
                    Username = null,
                    IsOk = false
                };
                return response;
            }

            return null;
        }
		
		public async Task RecoveryPassword(User user, int Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var newPassword = await context.Users.FirstOrDefaultAsync(u => u.Id == Id);
            newPassword.Username = user.Username;
            newPassword.Password = user.Password;
            newPassword.IsFogotPassword = false;
            var forgotPassword = await context.ForgotPasswords.FirstOrDefaultAsync(fp => fp.UserId == Id);
            context.ForgotPasswords.Remove(forgotPassword);
            context.Users.Update(newPassword);
            await context.SaveChangesAsync();
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

        #region Patch User
        public async Task UpdateInfo(User user, int Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var updateUser = await context.Users.FirstOrDefaultAsync(u => u.Id == Id);
            updateUser.Email = user.Email;
            updateUser.Phone = user.Phone;
            updateUser.FirstName = user.FirstName;
            updateUser.LastName = user.LastName;
            updateUser.Country = user.Country;
            updateUser.Adress = user.Adress;
            updateUser.Zip = user.Zip;
            updateUser.BDay = user.BDay;
            context.Users.Update(updateUser);
            await context.SaveChangesAsync();
        }
		
		public async Task ChangePassword(User user, int Id)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var newPassword = await context.Users.FirstOrDefaultAsync(u => u.Id == Id && u.Username == user.Username);
            newPassword.Password = user.Password;
            context.Users.Update(newPassword);
            await context.SaveChangesAsync();
        }

        #endregion

        #region Patch bool
        public async Task<bool> ReInvest(int Id, bool ReInvest)
		{
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
            var user = await contex.Users.FirstOrDefaultAsync(u => u.Id == Id);
            user.IsReInvest = ReInvest;
            contex.Users.Update(user);
            await contex.SaveChangesAsync();
            return user.IsReInvest;
        }

		public async Task<bool> ShowInfo(int Id, bool ShowInfo)
		{
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
            var user = await contex.Users.FirstOrDefaultAsync(u => u.Id == Id);
            user.IsShowInfo = ShowInfo;
            contex.Users.Update(user);
            await contex.SaveChangesAsync();
            return user.IsShowInfo;
        }

        #endregion

        #region Upload Picture

        public async Task UploadPassport(byte[] image, string nameFile, int UserId)
		{
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
            var user = await contex.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            if (user != null)
            {
                user.PassportPicture = image;
                user.PassportPictureName = nameFile;
            }

            contex.Users.Update(user);
            await contex.SaveChangesAsync();
        }
		public async Task UploadProof(byte[] image, string nameFile, int UserId)
		{
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
            var user = await contex.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            if (user != null)
            {
                user.ProofPicture = image;
                user.ProofPictureName = nameFile;
            }

            contex.Users.Update(user);
            await contex.SaveChangesAsync();
        }
		public async Task UploadSelfi(byte[] image, string nameFile, int UserId)
		{
            using var contex = ContextFactory.CreateDbContext(ConnectionString);
            var user = await contex.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            if (user != null)
            {
                user.SelfiPicture = image;
                user.SelfiPictureName = nameFile;
            }

            contex.Users.Update(user);
            await contex.SaveChangesAsync();
        }

		#endregion

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

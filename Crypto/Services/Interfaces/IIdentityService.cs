using Crypto.ViewModels.Identity;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IIdentityService
    {
		Task<User> GetUser(string userName);
		Task<object> GetUser(int Id);
		Task<object> GetUserInfo(int Id);
		Task UpdateToken(string Token, int id);
		Task<string> AddUser(LoginViewModel request);
		Task SetLoginHistory(LoginHistoryViewModel request);
		Task SignOut(int Id);
		Task RecoveryPassword(ChangePasswordViewModel request, int Id);
		Task<CheckViewModel> CheckInfo(CheckViewModel request);
		Task<Dictionary<string, object>> ConfirmEmail(string Id);
		Task<Dictionary<string, object>> FogotPassword(CheckViewModel request);
		Task<Dictionary<string, object>> AcceptFogot(string Id);
        
		#region Patch User
        Task UpdateInfo(UpdateInfoViewModel request, int Id);
		Task ChangePassword(ChangePasswordViewModel request, int Id);
		Task<User> ReLogin(string Token);
		#endregion

		#region Patch bool
		Task<bool> ReInvest(int Id, bool ReInvest);
		Task<bool> ShowInfo(int Id, bool ShowInfo);
		#endregion

        #region Upload Picture
        Task UploadPassport(byte[] image, string name, int UserId);
        Task UploadProof(byte[] image, string name, int UserId);
        Task UploadSelfi(byte[] image, string name, int UserId);
        #endregion 
    }
}

using Crypto.ViewModels.Identity;
using Models;
using Models.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IIdentityService
    {
		Task<User> GetUser(string userName);
		Task<object> GetUser(int Id);
		Task<object> GetUserInfo(int Id);
		Task<string> AddUser(LoginViewModel request);
		Task SetLoginHistory(LoginHistoryViewModel request);
		Task SignOut(int Id);
		Task RecoveryPassword(ChangePasswordViewModel request, int Id);
		Task<CheckViewModel> CheckInfo(CheckViewModel request);
		Task<Comfirm> ConfirmEmail(string Id);
		Task<Forgot> FogotPassword(CheckViewModel request);
		Task<Accept> AcceptFogot(string Id);
		Task<ReAuth> ReAuth(int userId);

		#region Patch User
		Task UpdateInfo(UpdateInfoViewModel request, int Id);
		Task ChangePassword(ChangePasswordViewModel request, int Id);
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

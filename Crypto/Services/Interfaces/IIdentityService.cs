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
		Task<string> AddUser(LoginViewModel request);
		Task SetLoginHistory(LoginHistoryViewModel request);
		Task SignOut(int Id);
		Task ChangePassword(ChangePasswordViewModel request, int Id);
		Task<CheckViewModel> CheckInfo(CheckViewModel request);
		Task<Dictionary<string, object>> ConfirmEmail(string Id);
		Task<Dictionary<string, object>> FogotPassword(CheckViewModel request);
		Task<Dictionary<string, object>> AcceptFogot(string Id);
		Task UpdateInfo(UpdateInfoViewModel request, int Id);
		Task RecoveryPassword(ChangePasswordViewModel request, int Id);
	}
}

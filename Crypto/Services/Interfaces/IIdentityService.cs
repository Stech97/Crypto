using Crypto.ViewModels.Identity;
using Models;
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
		Task<object> ConfirmEmail(string Id);
		Task<object> FogotPassword(CheckViewModel request);
		Task<object> AcceptFogot(string Id);
		Task UpdateInfo(UpdateInfoViewModel request, int Id);
		Task RecoveryPassword(ChangePasswordViewModel request, int Id);
	}
}

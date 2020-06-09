using Crypto.ViewModels.Identity;
using Models;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IIdentityService
    {
		Task<User> GetUser(string userName);
		Task<string> AddUser(LoginViewModel request);
		Task SetLoginHistory(LoginHistoryViewModel request);
		Task SignOut(int Id);
		Task ChangePassword(ChangePasswordViewModel request, int Id);
		Task<CheckViewModel> CheckInfo(CheckViewModel request);
		Task<object> ConfirmEmail(string Id);
	}
}

using Crypto.ViewModels;
using Models;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IIdentityService
    {
		Task<User> GetUser(string userName);
		Task AddUser(LoginViewModel request);
		Task SetLoginHistory(LoginHistoryViewModel request, int LifeTime);
		Task SignOut(int Id);
		Task ChangePassword(ChangePasswordViewModel request, int Id);
		Task<CheckViewModel> CheckInfo(CheckViewModel request);
	}
}

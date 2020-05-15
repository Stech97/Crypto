using Crypto.ViewModels;
using Models;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IIdentityService
    {
		Task<User> GetUser(string userName);
		Task AddUser(LoginViewModel request);
	}
}

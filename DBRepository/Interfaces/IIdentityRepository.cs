using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IIdentityRepository
    {
        Task<User> GetUser(string userName);
        Task<object> GetUser(int Id);
        Task<string> AddUser(User user);
        Task SetLoginHistory(LoginHistory loginHistory);
        Task SetCurrentSession(CurrentSession currentSession);
        Task SignOut(int Id);
        Task ChangePassword(User user, int Id);
        Task<User> CheckInfo(User user);
        Task<object> ConfirmEmail(string Id);
        Task<object> FogotPassword(User user);
        Task<object> AcceptFogot(string Id);
    }
}

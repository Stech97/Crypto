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
        Task<object> ForgotPassword(User user);
        Task<object> AcceptForgot(string Id);
        Task UpdateInfo(User user, int Id);
        Task RecoveryPassword(User user, int Id);
    }
}

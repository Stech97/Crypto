using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IIdentityRepository
    {
        Task<User> GetUser(string userName);
        Task<object> GetUser(int Id);
        Task<object> GetUserInfo(int Id);
        Task<User> ReLogin(string token);
        Task UpdateToken(string Token, int id);
        Task<string> AddUser(User user, string Parent);
        Task SetLoginHistory(LoginHistory loginHistory);
        Task SetCurrentSession(CurrentSession currentSession);
        Task SignOut(int Id);
        Task ChangePassword(User user, int Id);
        Task<User> CheckInfo(User user);
        Task<Dictionary<string, object>> ConfirmEmail(string Id);
        Task<Dictionary<string, object>> ForgotPassword(User user);
        Task<Dictionary<string, object>> AcceptForgot(string Id);
        Task UpdateInfo(User user, int Id);
        Task RecoveryPassword(User user, int Id);
        Task<bool> ReInvest(int Id, bool ReInvest);
        Task<bool> ShowInfo(int Id, bool ShowInfo);
    }
}

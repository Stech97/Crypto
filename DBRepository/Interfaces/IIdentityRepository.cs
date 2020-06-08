using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IIdentityRepository
    {
        Task<User> GetUser(string userName);
        Task<User> GetUser(int Id);
        Task<string> AddUser(User user);
        Task SetLoginHistory(LoginHistory loginHistory);
        Task SetCurrentSession(CurrentSession currentSession);
        Task SignOut(int Id);
        Task ChangePassword(User user, int Id);
        Task<User> CheckInfo(User user);
    }
}

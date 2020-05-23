using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IIdentityRepository
    {
        Task<User> GetUser(string userName);
        Task<User> GetUser(int Id);
        Task AddUser(User user);
        Task SetLoginHistory(LoginHistory loginHistory);
        Task SetCurrentSession(CurrentSession currentSession);
        Task SignOut(int Id);
    }
}

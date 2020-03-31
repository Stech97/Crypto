using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IIdentityRepository
    {
        Task<dynamic> GetUser(string userName);
    }
}

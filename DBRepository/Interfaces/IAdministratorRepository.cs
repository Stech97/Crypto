using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        Task DeleteInvestment(int investID);
        Task AddNews(News news); 
        Task AddInvestment(Investment investment);
    }
}

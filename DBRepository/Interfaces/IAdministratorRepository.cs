using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IAdministratorRepository
    {
        Task DeleteInvestment(int investID);
    }
}

using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IAdministratorService
    {
        Task DeleteInvestment(int investID);
    }
}

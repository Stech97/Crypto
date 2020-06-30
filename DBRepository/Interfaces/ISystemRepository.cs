using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface ISystemRepository
    {
        Task UpdateBTCRate(Balance balance);
        Task AddProfit();
        Task AddCommission();
    }
}

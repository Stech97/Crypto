using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface ISystemRepository
    {
        Task UpdateBTCRate(Rate rate);
        Task AddProfit();
        Task AddCommission();
    }
}

using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface ISystemService
    {
        Task UpdateBTCRate();
        Task AddProfit();
        Task AddCommission();
    }
}

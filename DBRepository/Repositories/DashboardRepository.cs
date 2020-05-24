using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public class DashboardRepository : BaseRepository, IDashboardRepository
    {
        public DashboardRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory)
        { }

        public async Task<Balance> GetBalance(int Id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.Balances.FirstOrDefaultAsync(b => b.UserId == Id);
        }

        public async Task UpdateBalance(Balance balance)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var balanceNew = await context.Balances.FirstOrDefaultAsync(b => b.UserId == balance.UserId);
                balanceNew.BitcoinBalance = balance.BitcoinBalance;
                balanceNew.DefimaBalance = balance.DefimaBalance;
                balanceNew.USDBalance = balance.USDBalance;
                context.Balances.Update(balanceNew);
                await context.SaveChangesAsync();
            }
        }

        public async Task<List<LoginHistory>> GetLoginHistory(int Id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
                return await context.LoginHistories.Where(lh => lh.UserId == Id).ToListAsync();
        }
    }
}

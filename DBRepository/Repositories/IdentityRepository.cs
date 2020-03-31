using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Models;
using System.Threading.Tasks;
using System.Linq;

namespace DBRepository.Repositories
{
    public class IdentityRepository : BaseRepository, IIdentityRepository
	{
		public IdentityRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		public async Task<dynamic> GetUser(string userName)
		{
			using (var context = ContextFactory.CreateDbContext(ConnectionString))
			{
				var result = (from userinfo in context.Users
							  join user in context.UserToUserRoles on userinfo.UserId equals user.UserId
							  join userrole in context.UserRoles on user.UserRoleID equals userrole.UserRoleID
							  select new
							  {
								  userinfo.Email,
								  userinfo.Username,
								  userinfo.Password,
								  userinfo.RefLink,
								  userinfo.LastName,
								  userinfo.FirstName,
								  userinfo.Phone,
								  userrole.Name,
								  userrole.IsAdmin,
								  userrole.Type
							  }).FirstOrDefaultAsync(u => u.Username == userName);
				return await result;
			}
		}
	}
}

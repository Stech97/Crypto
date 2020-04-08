using Crypto.Services.Interfaces;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models;

namespace Crypto.Services.Implementation
{
	public class IdentityService : IIdentityService
	{
		readonly IIdentityRepository _repository;

		public IdentityService(IIdentityRepository repository)
		{
			_repository = repository;
		}

		public async Task<User> GetUser(string userName)
		{
			return await _repository.GetUser(userName);
		}
	}
}

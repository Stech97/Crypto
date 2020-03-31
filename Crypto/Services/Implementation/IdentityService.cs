using Crypto.Services.Interfaces;
using System.Threading.Tasks;
using DBRepository.Interfaces;

namespace Crypto.Services.Implementation
{
	public class IdentityService : IIdentityService
	{
		IIdentityRepository _repository;

		public IdentityService(IIdentityRepository repository)
		{
			_repository = repository;
		}

		public async Task<dynamic> GetUser(string userName)
		{
			return await _repository.GetUser(userName);
		}
	}
}

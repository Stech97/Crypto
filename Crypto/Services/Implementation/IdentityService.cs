using Crypto.Services.Interfaces;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models;
using Crypto.ViewModels;
using AutoMapper;

namespace Crypto.Services.Implementation
{
	public class IdentityService : IIdentityService
	{
		readonly IIdentityRepository _repository;
		readonly IMapper _mapper;

		public IdentityService(IIdentityRepository repository, IMapper mapper)
		{
			_repository = repository;
			_mapper = mapper;
		}

		public async Task<User> GetUser(string userName)
		{
			return await _repository.GetUser(userName);
		}
		public async Task AddUser(LoginViewModel request)
		{
			var login = _mapper.Map<LoginViewModel, User>(request);
			await _repository.AddUser(login);
		}
		public async Task SetLoginHistory(LoginHistoryViewModel request)
		{
			var loginHistory = _mapper.Map<LoginHistoryViewModel, LoginHistory>(request);

			await _repository.SetLoginHistory(loginHistory);
		}
	}
}

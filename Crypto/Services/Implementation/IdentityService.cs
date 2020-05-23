using Crypto.Services.Interfaces;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models;
using Crypto.ViewModels;
using AutoMapper;
using System;

namespace Crypto.Services.Implementation
{
	public class IdentityService : IIdentityService
	{
		private readonly IIdentityRepository _repository;
		private readonly IMapper _mapper;

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
		public async Task SetLoginHistory(LoginHistoryViewModel request, int LifeTime)
		{
			var loginHistory = _mapper.Map<LoginHistoryViewModel, LoginHistory>(request);
			var currentSession = _mapper.Map<LoginHistoryViewModel, CurrentSession>(request);
			currentSession.LogoutTime = currentSession.LoginTime.Add(TimeSpan.FromMinutes(LifeTime));

			await _repository.SetLoginHistory(loginHistory);
			await _repository.SetCurrentSession(currentSession);
		}
		public async Task SignOut(int Id)
		{
			await _repository.SignOut(Id);
		}
	}
}

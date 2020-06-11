using Crypto.Services.Interfaces;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models;
using Crypto.ViewModels.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
		public async Task<UserViewModel> GetUser(int Id)
		{
			var userViewModel = await  _repository.GetUser(Id);
			return _mapper.Map<object, UserViewModel>(userViewModel);
		}

		public async Task<string> AddUser(LoginViewModel request)
		{
			var login = _mapper.Map<LoginViewModel, User>(request);
			return  await _repository.AddUser(login);
		}
		
		public async Task SetLoginHistory(LoginHistoryViewModel request)
		{
			var loginHistory = _mapper.Map<LoginHistoryViewModel, LoginHistory>(request);
			var currentSession = _mapper.Map<LoginHistoryViewModel, CurrentSession>(request);

			await _repository.SetLoginHistory(loginHistory);
			await _repository.SetCurrentSession(currentSession);
		}
		
		public async Task SignOut(int Id)
		{
			await _repository.SignOut(Id);
		}

		public async Task ChangePassword(ChangePasswordViewModel request, int Id)
		{
			var newPassword = _mapper.Map<ChangePasswordViewModel, User>(request);
			await _repository.ChangePassword(newPassword, Id);
		}

		public async Task<CheckViewModel> CheckInfo(CheckViewModel request)
		{
			var check = _mapper.Map<CheckViewModel, User>(request);
			var result = await _repository.CheckInfo(check);
			return _mapper.Map<User, CheckViewModel>(result);
		}

		public async Task<object> ConfirmEmail(string Id)
		{
			return await _repository.ConfirmEmail(Id);
		}

		public async Task<object> FogotPassword([FromBody] CheckViewModel request)
		{
			var fogotPassword = _mapper.Map<CheckViewModel, User>(request);
			return await _repository.FogotPassword(fogotPassword);
		}

		public async Task<object> AcceptFogot(string Id)
		{
			return await _repository.AcceptFogot(Id);
		}
    }
}

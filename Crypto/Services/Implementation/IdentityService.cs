using Crypto.Services.Interfaces;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models;
using Crypto.ViewModels.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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

		public async Task<object> GetUser(int Id)
		{
			return await _repository.GetUser(Id);
		}

		public async Task<object> GetUserInfo(int Id)
		{
			return await _repository.GetUserInfo(Id);
		}

		public async Task<User> ReLogin(string Token)
		{
			return await _repository.ReLogin(Token);
		}

		public async Task UpdateToken(string Token, int id)
		{
			await _repository.UpdateToken(Token, id);	
		}

		public async Task<string> AddUser(LoginViewModel request)
		{
			var login = _mapper.Map<LoginViewModel, User>(request);
			var Parent = request.RefLink;
			return  await _repository.AddUser(login, Parent);
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

		public async Task<Dictionary<string, object>> ConfirmEmail(string Id)
		{
			return await _repository.ConfirmEmail(Id);
		}

		public async Task<Dictionary<string, object>> FogotPassword([FromBody] CheckViewModel request)
		{
			var fogotPassword = _mapper.Map<CheckViewModel, User>(request);
			return await _repository.ForgotPassword(fogotPassword);
		}

		public async Task<Dictionary<string, object>> AcceptFogot(string Id)
		{
			return await _repository.AcceptForgot(Id);
		}

		public async Task UpdateInfo(UpdateInfoViewModel request, int Id)
		{
			var update = _mapper.Map<UpdateInfoViewModel, User>(request);
			await _repository.UpdateInfo(update, Id);
		}
		
		public async Task RecoveryPassword(ChangePasswordViewModel request, int Id)
		{
			var newPassword = _mapper.Map<ChangePasswordViewModel, User>(request);
			await _repository.RecoveryPassword(newPassword, Id);
		}

		public async Task<bool> ReInvest(int Id, bool ReInvest)
		{
			return await _repository.ReInvest(Id, ReInvest);
		}

		public async Task<bool> ShowInfo(int Id, bool ShowInfo)
		{
			return await _repository.ShowInfo(Id, ShowInfo);
		}
	}
}

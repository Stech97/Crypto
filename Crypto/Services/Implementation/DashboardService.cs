using AutoMapper;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using DBRepository.Interfaces;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Crypto.Services.Implementation
{
    public class DashboardService : IDashboardService
    {
        readonly IDashboardRepository _repositoryDashboard;
        readonly IIdentityRepository _repositorIidentity;
        readonly IMapper _mapper;
        public DashboardService(IDashboardRepository repositoryDashboard, IIdentityRepository repositorIidentity, IMapper mapper)
        {
            _repositoryDashboard = repositoryDashboard;
            _repositorIidentity = repositorIidentity;
            _mapper = mapper;
        }

        public async Task<BalanceViewModel> GetBalance(string Username)
        {
            var balance = await _repositoryDashboard.GetBalance(Username);
            return _mapper.Map<Balance, BalanceViewModel>(balance);
        }

        public async Task<List<LoginHistoryViewModel>> GetLoginHistory(string Username)
        {
            var LoginHistory = await _repositoryDashboard.GetLoginHistory(Username);
            return _mapper.Map<List<LoginHistory>, List<LoginHistoryViewModel>>(LoginHistory);
        }

        public async Task<RefLinkViewModel> GetRefLink(string Username)
        {
            var user =  await _repositorIidentity.GetUser(Username);
            return _mapper.Map<User, RefLinkViewModel>(user);
        }

        public async Task SetLoginHistory(LoginHistoryViewModel request, string Username)
        {
            var loginHistory = _mapper.Map<LoginHistoryViewModel, LoginHistory>(request);
            var user = await _repositorIidentity.GetUser(Username);
            loginHistory.UserId = user.UserId;

            await _repositoryDashboard.SetLoginHistory(loginHistory);
        }
    }
}

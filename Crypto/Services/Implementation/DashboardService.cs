using AutoMapper;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using DBRepository.Interfaces;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        public async Task<BalanceViewModel> GetBalance(int Id)
        {
            var balance = await _repositoryDashboard.GetBalance(Id);
            return _mapper.Map<Balance, BalanceViewModel>(balance);
        }

        public async Task UpdateBalance(BalanceViewModel request, int Id)
        {
            var balanceOld = _mapper.Map<BalanceViewModel, Balance>(request);
            await _repositoryDashboard.UpdateBalance(balanceOld, Id);
        }

        public async Task<List<LoginHistoryViewModel>> GetLoginHistory(int Id)
        {
            var LoginHistory = await _repositoryDashboard.GetLoginHistory(Id);
            return _mapper.Map<List<LoginHistory>, List<LoginHistoryViewModel>>(LoginHistory);
        }

        public async Task<RefLinkViewModel> GetRefLink(int Id)
        {
            var user =  await _repositorIidentity.GetUser(Id);
            return _mapper.Map<User, RefLinkViewModel>(user);
        }
        
        public async Task<List<NewsViewModel>> GetNews(int Take, int Skip)
        {
            var news = await _repositoryDashboard.GetNews(Take, Skip);

            return _mapper.Map<List<News>, List<NewsViewModel>>(news);
        }
    }
}

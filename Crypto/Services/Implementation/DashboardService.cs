using AutoMapper;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Dashdoard;
using DBRepository.Interfaces;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Implementation
{
    public class DashboardService : IDashboardService
    {
        readonly IDashboardRepository _repositoryDashboard;
        readonly IMapper _mapper;
        public DashboardService(IDashboardRepository repositoryDashboard, IMapper mapper)
        {
            _repositoryDashboard = repositoryDashboard;
            _mapper = mapper;
        }

        public async Task<BalanceViewModel> GetBalance(int Id)
        {
            var balance = await _repositoryDashboard.GetBalance(Id);
            return _mapper.Map<Balance, BalanceViewModel>(balance);
        }

        public async Task<List<LoginHistoryViewModel>> GetLoginHistory(int Id)
        {
            var LoginHistory = await _repositoryDashboard.GetLoginHistory(Id);
            return _mapper.Map<List<LoginHistory>, List<LoginHistoryViewModel>>(LoginHistory);
        }

        public async Task<RefLinkViewModel> GetRefLink(int Id)
        {
            var user =  await _repositoryDashboard.GetRefLink(Id);
            return _mapper.Map<User, RefLinkViewModel>(user);
        }
        
        public async Task<List<NewsViewModel>> GetNews(int Take, int Skip)
        {
            var news = await _repositoryDashboard.GetNews(Take, Skip);

            return _mapper.Map<List<News>, List<NewsViewModel>>(news);
        }

        public async Task<object> ExchangeBalance(ExchangeViewModel request, int UserId)
        {
            string exchange = request.From.ToUpper() + request.To.ToUpper();
            return await _repositoryDashboard.ExchangeBalance(exchange, request.Amount, UserId);
        }

        public async Task<CashBTCViewModel> CashBTC(CashBTCViewModel request, int Id)
        {
            var balanceOld = _mapper.Map<CashBTCViewModel, Balance>(request);
            var balanceNew = await _repositoryDashboard.CashBTC(balanceOld, Id);
            return _mapper.Map<Balance, CashBTCViewModel>(balanceNew);
        }
        
        public async Task<double> GetRate(RateViewModel request)
        {
            var rate = request.From + request.To;
            return await _repositoryDashboard.GetRate(rate);

        }
        public async Task<RefUserViewModel> GetTeam(int Ref)
        {
            var response = await _repositoryDashboard.GetTeam(Ref);
            return _mapper.Map<User, RefUserViewModel>(response);
        }

        public async Task<double> ProfitFromInvest(int Id)
        {
            var response = await _repositoryDashboard.ProfitFromInvest(Id);
            return response;
        }

        public async Task<double> GetTotalInvestment(int Id)
        {
            return await _repositoryDashboard.GetTotalInvestment(Id);
        }
        public async Task<int> GetTotalMembers(int Id)
        {
            return await _repositoryDashboard.GetTotalMembers(Id);
        }
        public async Task<double> GetEarningsTeam(int Id)
        {
            return await _repositoryDashboard.GetEarningsTeam(Id);
        }

        public async Task<double> GetTotalProfit(int Id)
        {
            return await _repositoryDashboard.GetTotalProfit(Id);
        }

        public async Task<double> GetLastDayProfit(int Id)
        {
            return await _repositoryDashboard.GetLastDayProfit(Id);
        }

    }
}

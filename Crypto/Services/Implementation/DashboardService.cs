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
        readonly IDashboardRepository _repository;
        readonly IMapper _mapper;
        public DashboardService(IDashboardRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<BalanceViewModel> GetBalance(string Username)
        {
            var balance = await _repository.GetBalance(Username);
            return _mapper.Map<Balance, BalanceViewModel>(balance);
        }

        public async Task<List<LoginHistoryViewModel>> GetLoginHistory(string Username)
        {
            var LoginHistory = await _repository.GetLoginHistory(Username);
            return _mapper.Map<List<LoginHistory>, List<LoginHistoryViewModel>>(LoginHistory);
        }
    }
}

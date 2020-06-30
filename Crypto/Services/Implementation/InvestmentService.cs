using System.Threading.Tasks;
using Models;
using Crypto.Services.Interfaces;
using DBRepository.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using Crypto.ViewModels.Investment;
using Crypto.ViewModels.Dashdoard;

namespace Crypto.Services.Implementation
{
	public class InvestmentService : IInvestmentService
	{
		private readonly IInvestmentRepository _repository;
		private readonly IMapper _mapper;

		public InvestmentService(IInvestmentRepository repository, IMapper mapper)
		{
			_repository = repository;
			_mapper = mapper;
		}

		public async Task<List<InvestmentViewModel>> GetInvestments(int UserId)
		{
			var investments = await _repository.GetInvestments(UserId);
			return _mapper.Map<List<Investment>, List<InvestmentViewModel>>(investments);
		}

        public async Task<BalanceViewModel> BuyInvestment(BuyInvestmentViewModel request, int Id)
        {
			var invest = _mapper.Map<BuyInvestmentViewModel, Investment>(request);
			string cur = request.Currency;
			var balance = await _repository.BuyInvestment(invest, cur, Id);
			return _mapper.Map<Balance, BalanceViewModel>(balance);
		}

		public async Task<List<PopupTeam>> GetTeamPop(int UserId, int Level)
		{
			return await _repository.GetTeamPop(UserId, Level);
		}

		public async Task<List<Team>> GetTeamLevel(int UserId)
		{
			return await _repository.GetTeamLevel(UserId);
		}

		public async Task<List<BalanceHistoryViewModel>> GetBalanceHistory(int UserId)
		{
			var response = await _repository.GetBalanceHistory(UserId);
			return _mapper.Map<List<BalanceHistory>, List<BalanceHistoryViewModel>>(response);

		}

	}
}

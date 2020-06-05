using System.Threading.Tasks;
using Models;
using Crypto.Services.Interfaces;
using DBRepository.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using Crypto.ViewModels;
using Crypto.ViewModels.Investment;

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

		public async Task<List<InvestmentViewModel>> GetInvestments(int UserId, int Take)
		{
			var investments = await _repository.GetInvestments(UserId, Take);
			return _mapper.Map<List<Investment>, List<InvestmentViewModel>>(investments);
		}

		public async Task<double> GetTotalInvestment(int UserId)
		{
			return await _repository.GetTotalInvestment(UserId);
		}

		public async Task<double> GetLastDayInvestment(int UserId)
		{
			return await _repository.GetLastDayInvestment(UserId);
		}
	}
}

using System.Threading.Tasks;
using Models;
using Crypto.Services.Interfaces;
using DBRepository.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using Crypto.ViewModels;

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
		public async Task<List<Investment>> GetInvestments()
		{
			return await _repository.GetInvestments();
		}
		public async Task<Investment> GetInvestment(int investID)
		{
			return await _repository.GetInvestment(investID);
		}
		public async Task AddInvestment(InvestmentViewModel request)
		{
			var investment = _mapper.Map<InvestmentViewModel, Investment>(request);
			await _repository.AddInvestment(investment);
		}
		public async Task UpdateInvestment(InvestmentViewModel request, int Id)
		{
			var investment = _mapper.Map<InvestmentViewModel, Investment>(request);
			await _repository.UpdateInvestment(investment, Id);
		}
	}
}

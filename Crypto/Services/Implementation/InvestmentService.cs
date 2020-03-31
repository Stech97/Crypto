using System.Threading.Tasks;
using Models;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using DBRepository.Interfaces;
using Microsoft.Extensions.Configuration;
using AutoMapper;

namespace Crypto.Services.Implementation
{
	public class InvestmentService : IInvestmentService
	{
		IInvestmentRepository _repository;
		IConfiguration _config;
		IMapper _mapper;

		public InvestmentService(IInvestmentRepository repository, IConfiguration configuration, IMapper mapper)
		{
			_repository = repository; 
			_config = configuration;
			_mapper = mapper;
		}

		public async Task<Investment> GetInvestment(string name)
		{
			return await _repository.GetInvestment(name);
		}
		public async Task AddInvestment(InvestmentViewModel request)
		{
			var investment = _mapper.Map<InvestmentViewModel, Investment>(request);
			await _repository.AddInvestment(investment);
		}
		public async Task DeleteInvestment(int investID)
		{
			await _repository.DeleteInvestment(investID);
		}

	}
}

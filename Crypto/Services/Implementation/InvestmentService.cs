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
		readonly IInvestmentRepository _repository;
		readonly IConfiguration _config;
		readonly IMapper _mapper;

		public InvestmentService(IInvestmentRepository repository, IConfiguration configuration, IMapper mapper)
		{
			_repository = repository; 
			_config = configuration;
			_mapper = mapper;
		}
		public async Task<Page<InvestmentViewModel>> GetInvestments(int pageIndex)
		{
			var pageSize = _config.GetValue<int>("pageSize");
			var page = await _repository.GetPosts(pageIndex, pageSize);
			var result = _mapper.ToMappedPage<Investment, InvestmentViewModel>(page);
			return result;
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
		public async Task DeleteInvestment(int investID)
		{
			await _repository.DeleteInvestment(investID);
		}

	}
}

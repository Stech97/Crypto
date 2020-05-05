using System.Threading.Tasks;
using Models;
using Crypto.Services.Interfaces;
using DBRepository.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Crypto.ViewModels;

namespace Crypto.Services.Implementation
{
	public class InvestmentService : IInvestmentService
	{
		readonly IInvestmentRepository _repository;

		public InvestmentService(IInvestmentRepository repository)
		{
			_repository = repository;
		}
		public async Task<List<Investment>> GetInvestments()
		{
			return await _repository.GetInvestments();
		}
		public async Task<Investment> GetInvestment(int investID)
		{
			return await _repository.GetInvestment(investID);
		}
		public async Task DeleteInvestment(int investID)
		{
			await _repository.DeleteInvestment(investID);
		}

	}
}

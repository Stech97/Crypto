using AutoMapper;
using Crypto.Services.Interfaces;
using DBRepository.Interfaces;
using Models;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;

namespace Crypto.Services.Implementation
{
	public class SystemService : ISystemService
	{
		private readonly ISystemRepository _repository;
		private readonly IMapper _mapper;

		public SystemService(ISystemRepository repository, IMapper mapper)
		{
			_repository = repository;
			_mapper = mapper;
		}

		public async void AddProfit()
		{
			await _repository.AddProfit();
		}

		public async void AddCommission()
		{
			await _repository.AddCommission();
		}

		public async void UpdateBTCRate()
		{
			var uri = "https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD";

			try
			{
				HttpClient client = new HttpClient();
				string JSON = await client.GetStringAsync(uri);
				JObject jsonString = JObject.Parse(JSON);
				double result = (double)jsonString["result"]["XXBTZUSD"]["p"][0];

				var rate = _mapper.Map<double, Rate>(result);
				await _repository.UpdateBTCRate(rate);
			}
			catch (HttpRequestException e)
			{
				Console.WriteLine(e.Message);
			}
			catch (OperationCanceledException e)
			{
				Console.WriteLine(e.Message);
			}
		}
	}
}

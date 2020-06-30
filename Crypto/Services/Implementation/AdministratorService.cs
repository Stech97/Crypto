using AutoMapper;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Administrator;
using Crypto.ViewModels.Dashdoard;
using DBRepository.Interfaces;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Implementation
{
	public class AdministratorService : IAdministratorService
	{
		private readonly IAdministratorRepository _repository;
		private readonly IMapper _mapper;

		public AdministratorService(IAdministratorRepository repository, IMapper mapper)
		{
			_repository = repository;
			_mapper = mapper;
		}

		public async Task<NewsViewModel> AddNews(AddNewsViewModel request)
		{
			var news = _mapper.Map<AddNewsViewModel, News>(request);
			var response = await _repository.AddNews(news);
			return _mapper.Map<News, NewsViewModel>(response);
		}

		public async Task<NewsViewModel> UpdateNews(UpdateNewsViewModel model, string heder)
		{
			var news = _mapper.Map<UpdateNewsViewModel, News>(model);
			var response = await _repository.UpdateNews(news, heder); 
			return _mapper.Map<News, NewsViewModel>(response);
		}

		public async Task DeleteNews(string heder)
		{
			await _repository.DeleteNews(heder);
		}

		public async Task<RateDETViewModel> UpdateDETRate(RateDETViewModel request)
		{
			var rate = _mapper.Map<RateDETViewModel, Balance>(request);
			var newRate = await _repository.UpdateDETRate(rate);
			return _mapper.Map<Balance, RateDETViewModel>(newRate);
		}

		#region Dev
		public async Task<List<UserViewModel>> GetUsers()
		{
			var response = await _repository.GetUsers();
			return _mapper.Map<List<object>, List<UserViewModel>>(response);
		}
		public async Task DelUser(int Id)
		{
			await _repository.DelUser(Id);
		}
        #endregion

    }
}

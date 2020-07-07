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

		#region Main Page
		public async Task UpdateInfo(SingleTextViewModel model)
		{
			var MainPage = _mapper.Map<SingleTextViewModel, MainPage>(model);
			await _repository.UpdateInfo(MainPage);
		}
		
		public async Task UpdatePic(byte[] image, string nameFile, string Component)
		{
			await _repository.UpdatePic(image, nameFile, Component);	
		}

		public async Task<Images> GetPic(string Component)
		{
			return await _repository.GetPic(Component);
		}

		public async Task<SingleTextViewModel> GetInfo(string Component)
		{
			var response = await _repository.GetInfo(Component);
			return _mapper.Map<MainPage, SingleTextViewModel>(response);
		}
        #endregion

        #region Get User Picture
        public async Task<Images> GetPassportPicture(int UserId)
		{
			return await _repository.GetPassportPicture(UserId);
		}

		public async Task<Images> GeProofPicture(int UserId)
		{
			return await _repository.GeProofPicture(UserId);
		}

		public async Task<Images> GetSelfiPicture(int UserId)
		{
			return await _repository.GetSelfiPicture(UserId);
		}
		#endregion

		#region Dasboard
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
			var rate = _mapper.Map<RateDETViewModel, Rate>(request);
			var newRate = await _repository.UpdateDETRate(rate);
			return _mapper.Map<Rate, RateDETViewModel>(newRate);
		}

		public async Task<double> GetAddedFounds()
		{
			return await _repository.GetAddedFounds();
		}

		public async Task<object> GetInvestedAmount()
		{
			return await _repository.GetInvestedAmount();
		}

		public async Task<int> GetCountUser()
		{
			return await _repository.GetCountUser();
		}

		public async Task<int> GetCountUserWithInvest()
		{
			return await _repository.GetCountUserWithInvest();
		}

		public async Task<double> GetWithdrawnAmount()
		{
			return await _repository.GetWithdrawnAmount();
		}

		#endregion

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

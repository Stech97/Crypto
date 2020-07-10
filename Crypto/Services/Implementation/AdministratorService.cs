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

		#region Upload Files
		public async Task UploadFiles(byte[] image, string content, string Component)
		{
			await _repository.UploadFiles(image, content, Component);
		}
		#endregion

		#region Users
		public async Task<object> GetUsersInfo()
		{
			return await _repository.GetUsersInfo();
		}
        #endregion

        #region News
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

		#endregion

		#region Main Page

		public async Task<SingleTextViewModel> GetInfo(string Component)
		{
			var response = await _repository.GetInfo(Component);
			return _mapper.Map<MainPage, SingleTextViewModel>(response);
		}

		public async Task UpdateInfo(SingleTextViewModel model)
		{
			var MainPage = _mapper.Map<SingleTextViewModel, MainPage>(model);
			await _repository.UpdateInfo(MainPage);
		}

		public async Task<FAQViewModel> GetFAQ()
		{
			var response = await _repository.GetFAQ();
			return _mapper.Map<MainPage, FAQViewModel>(response);
		}

		public async Task UpdateFAQ(FAQViewModel model)
		{
			var MainPage = _mapper.Map<FAQViewModel, MainPage>(model);
			await _repository.UpdateFAQ(MainPage);
		}

		public async Task<AboutUsViewModel> GetAbout()
		{
			var response = await _repository.GetAbout();
			return _mapper.Map<MainPage, AboutUsViewModel>(response);
		}

		public async Task UpdateAbout(AboutUsViewModel model)
		{
			var MainPage = _mapper.Map<AboutUsViewModel, MainPage>(model);
			await _repository.UpdateAbout(MainPage);
		}

		public async Task<Images> GetPic(string Component)
		{
			return await _repository.GetPic(Component);
		}

		public async Task UpdatePic(byte[] image, string nameFile, string Component, int Possition)
		{
			await _repository.UpdatePic(image, nameFile, Component, Possition);
		}
		#endregion

		#region Get User Picture
		public async Task<Images> GetPassportPicture(int UserId)
		{
			return await _repository.GetPassportPicture(UserId);
		}

		public async Task<Images> GetProofPicture(int UserId)
		{
			return await _repository.GetProofPicture(UserId);
		}

		public async Task<Images> GetSelfiPicture(int UserId)
		{
			return await _repository.GetSelfiPicture(UserId);
		}
		#endregion

		#region Finance 
		public async Task<RateDETViewModel> GetRate()
		{
			var response = await _repository.GetRate();
			return _mapper.Map<Rate, RateDETViewModel>(response);
		}

		public async Task UpdateDETRate(RateDETViewModel request)
		{
			var rate = _mapper.Map<RateDETViewModel, Rate>(request);
			await _repository.UpdateDETRate(rate);
		}

		public async Task<List<CommissionViewModel>> GetCommission()
		{
			var response = await _repository.GetCommission();
			return _mapper.Map<List<TypeCommission>, List<CommissionViewModel>>(response);
		}

		public async Task UpdateCommission(List<CommissionViewModel> request)
		{
			var Commision = _mapper.Map<List<CommissionViewModel>, List<TypeCommission>>(request);
			await _repository.UpdateCommission(Commision);
		}

		public async Task<List<ProfitViewModel>> GetProfit()
		{
			var response = await _repository.GetProfit();
			return _mapper.Map<List<TypeInvestment>, List<ProfitViewModel>>(response);
		}

		public async Task UpdateProfit(List<ProfitViewModel> request)
		{
			var Profit = _mapper.Map<List<ProfitViewModel>, List<TypeInvestment>>(request);
			await _repository.UpdateProfit(Profit);
		}

		#endregion

		#region Dasboard
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

		public async Task<object> GetAllUsersBalance()
		{
			return await _repository.GetAllUsersBalance();
		}

		public async Task<double> GetAllCommission()
		{
			return await _repository.GetAllCommission();
		}

		public async Task<List<WithdrawAll>> GetWithdrawalRequest()
		{
			return await _repository.GetWithdrawalRequest();
		}

		public async Task<List<object>> GetKYC()
		{
			return await _repository.GetKYC();
		}

		public async Task AcceptAllWithdrawal()
		{
			await _repository.AcceptAllWithdrawal();
		}

		public async Task AcceptWithdrawal(int UserId)
		{
			await  _repository.AcceptWithdrawal(UserId);
		}

		public async Task AcceptAllKYC()
		{
			await  _repository.AcceptAllKYC();
		}

		public async Task AcceptKYC(int UserId)
		{
			await _repository.AcceptKYC(UserId);
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

using AutoMapper;
using Models;
using Crypto.ViewModels;
using System;
using Crypto.ViewModels.Identity;
using Crypto.ViewModels.Dashdoard;
using Crypto.ViewModels.Administrator;

namespace Crypto
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Balance, BalanceViewModel>()
				.ForMember(m => m.BTC, opt => opt.MapFrom(x => x.BitcoinBalance))
				.ForMember(m => m.USD, opt => opt.MapFrom(x => x.USDBalance))
				.ForMember(m => m.DET, opt => opt.MapFrom(x => x.DefimaBalance));

			CreateMap<Balance, CashBTCViewModel>()
				.ForMember(m => m.BTC, opt => opt.MapFrom(x => x.BitcoinBalance));

			CreateMap<CashBTCViewModel, Balance>()
				.ForMember(m => m.BitcoinBalance, opt => opt.MapFrom(x => x.BTC));

			CreateMap<LoginHistory, ViewModels.Dashdoard.LoginHistoryViewModel>();

			CreateMap<User, RefLinkViewModel>()
				.ForMember(m => m.RefId, opt => opt.MapFrom(x => x.Id))
				.ForMember(m => m.RefString, opt => opt.MapFrom(x => x.Username));
			
			CreateMap<EmailViewModel, EmailAddres>();

			CreateMap<LoginViewModel, User>();

			CreateMap<ViewModels.Identity.LoginHistoryViewModel, LoginHistory>();

			CreateMap<ViewModels.Identity.LoginHistoryViewModel, CurrentSession>();

			CreateMap<ChangePasswordViewModel, User>();

			CreateMap<CheckViewModel, User>();
			
			CreateMap<User, CheckViewModel>();

			CreateMap<Investment, ViewModels.Investment.InvestmentViewModel>();

			CreateMap<News, ViewModels.Dashdoard.NewsViewModel>();

			CreateMap<ViewModels.Administrator.NewsViewModel, News>()
				.ForMember(m => m.CreateDate, opt => opt.MapFrom(m => DateTime.Now))
				.ForMember(m => m.LastChangeDate, opt => opt.MapFrom(m => DateTime.Now));
			
			CreateMap<RateDETViewModel, Balance>()
				.ForMember(m => m.RateUSD_DEF, opt => opt.MapFrom(m => m.RateDef));
			CreateMap<string, Balance>()
				.ForMember(m => m.RateBTC_USD, opt => opt.MapFrom(m => m));

			CreateMap<Balance, RateDETViewModel>()
				.ForMember(m => m.RateDef, opt => opt.MapFrom(m => m.RateUSD_DEF));

			CreateMap<UpdateInfoViewModel, User>();

		}
	}
}
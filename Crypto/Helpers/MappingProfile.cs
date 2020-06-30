using AutoMapper;
using Models;
using Crypto.ViewModels;
using System;
using Crypto.ViewModels.Identity;
using Crypto.ViewModels.Dashdoard;
using Crypto.ViewModels.Administrator;
using Crypto.ViewModels.Investment;

namespace Crypto.Helpers
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

			CreateMap<LoginHistory, ViewModels.Dashdoard.LoginHistoryViewModel>()
				.ForMember(m => m.LoginTime, opt => opt.MapFrom(x => x.LoginTime.ToString("dd.MM\'/'HH:mm")));

			CreateMap<User, RefLinkViewModel>()
				.ForMember(m => m.RefId, opt => opt.MapFrom(x => x.Id))
				.ForMember(m => m.RefString, opt => opt.MapFrom(x => x.Username));
			
			CreateMap<EmailViewModel, EmailAddres>();

			CreateMap<LoginViewModel, User>()
				.ForMember(m => m.IsReInvest, opt => opt.MapFrom(x => false))
				.ForMember(m => m.IsVerified, opt => opt.MapFrom(x => false));

			CreateMap<ViewModels.Identity.LoginHistoryViewModel, LoginHistory>();

			CreateMap<ViewModels.Identity.LoginHistoryViewModel, CurrentSession>();

			CreateMap<ChangePasswordViewModel, User>();

			CreateMap<CheckViewModel, User>();
			
			CreateMap<User, CheckViewModel>();

			CreateMap<Investment, InvestmentViewModel>()
				.ForMember(m => m.Day, opt => opt.MapFrom(m => m.DateInvestment.ToString("D")))
				.ForMember(m => m.Product, opt => opt.MapFrom(m => m.ToString()))
				.ForMember(m => m.Investment, opt => opt.MapFrom(m => m.AddCash));

			CreateMap<News, NewsViewModel>();

			CreateMap<AddNewsViewModel, News>()
				.ForMember(m => m.CreateDate, opt => opt.MapFrom(m => DateTime.Now))
				.ForMember(m => m.LastChangeDate, opt => opt.MapFrom(m => DateTime.Now));

			CreateMap<UpdateNewsViewModel, News>()
				.ForMember(m => m.LastChangeDate, opt => opt.MapFrom(m => DateTime.Now));

			CreateMap<RateDETViewModel, Balance>()
				.ForMember(m => m.RateUSD_DEF, opt => opt.MapFrom(m => m.RateDet));
			CreateMap<double, Balance>()
				.ForMember(m => m.RateBTC_USD, opt => opt.MapFrom(m => m));

			CreateMap<Balance, RateDETViewModel>()
				.ForMember(m => m.RateDet, opt => opt.MapFrom(m => m.RateUSD_DEF));

			CreateMap<UpdateInfoViewModel, User>();

			CreateMap<BuyInvestmentViewModel, Investment>()
				.ForMember(m => m.TypeInvestmentId, opt => opt.MapFrom(m => m.Type))
				.ForMember(m => m.AddCash, opt => opt.MapFrom(m => m.SumInvestment))
				.ForMember(m => m.DateInvestment, opt => opt.MapFrom(m => DateTime.Now))
				.ForMember(m => m.Profit, opt => opt.MapFrom(m => 0));
			CreateMap<BalanceHistory, BalanceHistoryViewModel>()
				.ForMember(m => m.Time, opt => opt.MapFrom(m => m.Time.ToString("D")))
				.ForMember(m => m.Type, opt => opt.MapFrom(m => m.ToString()));

		}
	}
}
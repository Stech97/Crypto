using AutoMapper;
using Models;
using Crypto.ViewModels;
using System;
using Crypto.ViewModels.Identity;
using Crypto.ViewModels.Dashdoard;
using Crypto.ViewModels.Administrator;
using Crypto.ViewModels.Investment;
using Models.DTO;
using System.Collections.Generic;

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
				.ForMember(m => m.BitcoinBalance, opt => opt.MapFrom(x => x.BTC))
				.ForMember(m => m.BitcoinWallet, opt => opt.MapFrom(x => x.Wallet));

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

			CreateMap<ViewModels.Administrator.LoginHistoryViewModel, CurrentSession>();

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

			CreateMap<RateDETViewModel, Rate>()
				.ForMember(m => m.USD_DET, opt => opt.MapFrom(m => m.RateDet));
			CreateMap<double, Rate>()
				.ForMember(m => m.BTC_USD, opt => opt.MapFrom(m => m));

			CreateMap<Rate, RateDETViewModel>()
				.ForMember(m => m.RateDet, opt => opt.MapFrom(m => m.USD_DET));

			CreateMap<UpdateInfoViewModel, User>();

			CreateMap<BuyInvestmentViewModel, Investment>()
				.ForMember(m => m.TypeInvest, opt => opt.MapFrom(m => m.Type))
				.ForMember(m => m.AddCash, opt => opt.MapFrom(m => m.SumInvestment))
				.ForMember(m => m.DateInvestment, opt => opt.MapFrom(m => DateTime.Now))
				.ForMember(m => m.Profit, opt => opt.MapFrom(m => 0));

			CreateMap<BalanceHistory, BalanceHistoryViewModel>()
				.ForMember(m => m.Type, opt => opt.MapFrom(m => m.ToString()));

			CreateMap<SingleTextViewModel, MainPage>();

			CreateMap<MainPage, SingleTextViewModel>();

			CreateMap<FAQViewModel, MainPage>();

			CreateMap<MainPage, FAQViewModel>();

			CreateMap<AboutUsViewModel, MainPage>();

			CreateMap<MainPage, AboutUsViewModel>();

			CreateMap<TypeCommission, CommissionViewModel>()
				.ForMember(m => m.Persent, opt => opt.MapFrom(m => m.Value * 100))
				.ForMember(m => m.Type, opt => opt.MapFrom(m => m.ToString()));

			CreateMap<CommissionViewModel, TypeCommission>()
				.ForMember(m => m.Level, opt => opt.MapFrom(m => m.ConvertType()))
				.ForMember(m => m.Value, opt => opt.MapFrom(m => m.Persent / 100));

			CreateMap<TypeInvestment, ProfitViewModel>()
				.ForMember(m => m.Percent, opt => opt.MapFrom(m => m.Persent))
				.ForMember(m => m.Type, opt => opt.MapFrom(m => m.ToString()));

			CreateMap<ProfitViewModel, TypeInvestment>()
				.ForMember(m => m.Persent, opt => opt.MapFrom(m => m.Percent))
				.ForMember(m => m.Type, opt => opt.MapFrom(m => m.ConvertType()));

			CreateMap<WithdrawAll, WithDraw>()
				.ForMember(m => m.Status, opt => opt.MapFrom(m => m.ToString()));

		}
	}
}
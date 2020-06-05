﻿using AutoMapper;
using Models;
using Crypto.ViewModels;
using System;
using Crypto.ViewModels.Identity;
using Crypto.ViewModels.Dashdoard;

namespace Crypto
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Balance, BalanceViewModel>()
				.ForMember(m => m.Bitcoin, opt => opt.MapFrom(x => x.BitcoinBalance))
				.ForMember(m => m.Defima, opt => opt.MapFrom(x => x.DefimaBalance))
				.ForMember(m => m.USD, opt => opt.MapFrom(x => x.USDBalance));

			CreateMap<BalanceViewModel, Balance>()
				.ForMember(m => m.BitcoinBalance, opt => opt.MapFrom(x => x.Bitcoin))
				.ForMember(m => m.DefimaBalance , opt => opt.MapFrom(x => x.Defima))
				.ForMember(m => m.USDBalance, opt => opt.MapFrom(x => x.USD));

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

			CreateMap<News, NewsViewModel>();

			CreateMap<ViewModels.Administrator.NewsViewModel, News>()
				.ForMember(m => m.CreateDate, opt => opt.MapFrom(m => DateTime.Now))
				.ForMember(m => m.LastChangeDate, opt => opt.MapFrom(m => DateTime.Now));
			
			CreateMap<ViewModels.Administrator.RateViewModel, Balance>()
				.ForMember(m => m.RateUSD_DEF, opt => opt.MapFrom(m => m.RateDef));

			CreateMap<Balance, ViewModels.Administrator.RateViewModel>()
				.ForMember(m => m.RateDef, opt => opt.MapFrom(m => m.RateUSD_DEF));

		}
	}
}
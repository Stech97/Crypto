using AutoMapper;
using Models;
using Crypto.ViewModels;
using System;

namespace Crypto
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Balance, BalanceViewModel>();

			CreateMap<BalanceViewModel, Balance>();

			CreateMap<LoginHistory, LoginHistoryViewModel>();

			CreateMap<User, RefLinkViewModel>()
				.ForMember(m => m.RefId, opt => opt.MapFrom(x => x.Id))
				.ForMember(m => m.RefString, opt => opt.MapFrom(x => x.Username));
			
			CreateMap<EmailViewModel, EmailAddres>();

			CreateMap<LoginViewModel, User>();

			CreateMap<LoginHistoryViewModel, LoginHistory>();

			CreateMap<LoginHistoryViewModel, CurrentSession>();

			CreateMap<ChangePasswordViewModel, User>();

			CreateMap<CheckViewModel, User>();
			
			CreateMap<User, CheckViewModel>();

			CreateMap<Investment, InvestmentViewModel>();

			CreateMap<News, NewsViewModel>();

			CreateMap<NewsViewModel, News>()
				.ForMember(m => m.CreateDate, opt => opt.MapFrom(m => DateTime.Now))
				.ForMember(m => m.LastChangeDate, opt => opt.MapFrom(m => DateTime.Now));

		}
	}
}
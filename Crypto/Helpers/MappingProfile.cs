using AutoMapper;
using Models;
using Crypto.ViewModels;
using System;
using System.Collections.Generic;

namespace Crypto
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<InvestmentViewModel, Investment>()
				.ForMember(m => m.CreatedDate, opt => opt.MapFrom(x => DateTime.Now));

			CreateMap<BalanceViewModel, Balance>();

			CreateMap<LoginHistoryViewModel, LoginHistory>();

			CreateMap<LoginHistoryViewModel, CurrentSession>();

			CreateMap<User, RefLinkViewModel>()
				.ForMember(m => m.RefId, opt => opt.MapFrom(x => x.UserId))
				.ForMember(m => m.RefString, opt => opt.MapFrom(x => x.Username));
		}
	}
}
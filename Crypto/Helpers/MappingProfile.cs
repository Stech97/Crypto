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

			CreateMap<LoginHistoryViewModel, LoginHistory>()
				.ForMember(m => m.LoginTime, opt => opt.MapFrom(m => DateTime.Now));

			CreateMap<User, RefLinkViewModel>()
				.ForMember(m => m.RefId, opt => opt.MapFrom(x => x.UserId))
				.ForMember(m => m.RefString, opt => opt.MapFrom(x => x.Username));
		}
	}
}
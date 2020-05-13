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
			CreateMap<InvestmentViewModel, Investment>()
				.ForMember(m => m.CreatedDate, opt => opt.MapFrom(m => DateTime.Now));
		}
	}
}
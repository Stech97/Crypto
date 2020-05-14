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
			CreateMap<EmailViewModel, Email>()
				.ForMember(m => m.EmailAdress, opt => opt.MapFrom(m => m.email));
		}
	}
}
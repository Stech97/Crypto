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
			CreateMap<LoginViewModel, User>()
				.ForMember(m => m.LastName, opt => opt.MapFrom(m => m.LastName))
				.ForMember(m => m.FirstName, opt => opt.MapFrom(m => m.FirstName))
				.ForMember(m => m.Email, opt => opt.MapFrom(m => m.Email))
				.ForMember(m => m.Username, opt => opt.MapFrom(m => m.Username))
				.ForMember(m => m.Password, opt => opt.MapFrom(m => m.Password));
			CreateMap<Balance, BalanceViewModel>();
		}
	}
}
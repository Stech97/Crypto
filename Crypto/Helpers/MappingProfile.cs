using AutoMapper;
using Models;
using Crypto.ViewModels;


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
				.ForMember(m => m.RefId, opt => opt.MapFrom(x => x.UserId))
				.ForMember(m => m.RefString, opt => opt.MapFrom(x => x.Username));
			
			CreateMap<EmailViewModel, EMAIL>();

			CreateMap<LoginViewModel, User>();

			CreateMap<LoginHistoryViewModel, LoginHistory>();

			CreateMap<LoginHistoryViewModel, CurrentSession>();

			CreateMap<ChangePasswordViewModel, User>();

			CreateMap<CheckViewModel, User>();
			
			CreateMap<User, CheckViewModel>();

			CreateMap<InvestmentViewModel, Investment>();

			CreateMap<News, NewsViewModel>();

		}
	}
}
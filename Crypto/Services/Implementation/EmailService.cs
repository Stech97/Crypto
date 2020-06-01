using AutoMapper;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using DBRepository.Interfaces;
using Models;
using System.Threading.Tasks;

namespace Crypto.Services.Implementation
{
	public class EmailService : IEmailService
	{
		readonly IEmailRepository _repository;
		readonly IMapper _mapper;
		public EmailService(IEmailRepository repository, IMapper mapper)
		{
			_repository = repository;
			_mapper = mapper;
		}

		public async Task AddEmail(EmailViewModel Email)
		{
			var email = _mapper.Map<EmailViewModel, EmailAddres>(Email);
			await _repository.AddEmail(email);
		}
	}
}

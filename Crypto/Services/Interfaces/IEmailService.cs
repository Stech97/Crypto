using Crypto.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
	public interface IEmailService
	{
		Task AddEmail(EmailViewModel Email);
	}
}

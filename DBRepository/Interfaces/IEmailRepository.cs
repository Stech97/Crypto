using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
	public interface IEmailRepository
	{
		Task AddEmail(EmailAddres email);
	}
}

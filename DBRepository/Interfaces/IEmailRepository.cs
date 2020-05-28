using Models;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
	public interface IEmailRepository
	{
		Task AddEmail(EMAIL email);
	}
}

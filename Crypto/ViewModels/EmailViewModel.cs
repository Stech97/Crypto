using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels
{
	public class EmailViewModel
	{
		[EmailAddress]
		[Required]
		public string Email { get; set; }
	}
}

using Crypto.Validate;
using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Identity
{
	[CreateAccountValidate]
	public class LoginViewModel
	{
		[Required]
		[StringLength(25, MinimumLength = 3)]
		public string LastName { get; set; }
		[Required]
		[StringLength(10, MinimumLength = 2)]
		public string FirstName { get; set; }
		[EmailAddress]
		[Required]
		public string Email { get; set; }
		[Required]
		[StringLength(15, MinimumLength = 6)]
		public string Username { get; set; }
		[Required]
		[StringLength(15, MinimumLength = 6)]
		public string Password { get; set; }
		[Required]
		[Compare("Password")]
		[StringLength(15, MinimumLength = 6)]
		public string ConfirmPassword { get; set; }
	}
}

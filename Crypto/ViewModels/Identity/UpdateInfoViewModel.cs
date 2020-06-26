using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Identity
{
	public class UpdateInfoViewModel
	{
		[Required]
		[EmailAddress]
		public string Email { get; set; }
		[Required]
		[Phone]
		public string Phone { get; set; }
		[Required]
		[StringLength(10, MinimumLength = 2)]
		public string FirstName { get; set; }
		[Required]
		[StringLength(25, MinimumLength = 3)]
		public string LastName { get; set; }
		[Required]
		[RegularExpression(@"[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])")]
		public System.DateTime BDay { get; set; }
		[Required]
		public string Adress { get; set; }
		[Required]
		[StringLength(10, MinimumLength = 6)]
		public string Zip { get; set; }
	}
}

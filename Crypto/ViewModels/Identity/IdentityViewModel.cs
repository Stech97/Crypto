using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Identity
{
    public class IdentityViewModel
    {
		[Required]
		[StringLength(15, MinimumLength = 6)]
		public string Username { get; set; }
		[Required]
		[StringLength(15, MinimumLength = 6)]
		public string Password { get; set; }
		[Required]
		[RegularExpression(@"((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)")]
		public string IP { get; set; }
		[Required]
		public string Country { get; set; }
	}
}

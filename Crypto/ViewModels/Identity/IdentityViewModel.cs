using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Identity
{
    public class IdentityViewModel
    {
		[Required]
		public string Username { get; set; }
		[Required]
		public string Password { get; set; }
		[Required]
		[RegularExpression(@"((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)")]
		public string IP { get; set; }
		[Required]
		public string Country { get; set; }
	}
}

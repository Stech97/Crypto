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
		public string IP { get; set; }
		[Required]
		public string Country { get; set; }
	}
}

using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Administrator
{
    public class AdministratorIdentityViewModel
    {
		[Required]
		[StringLength(15, MinimumLength = 6)]
		public string Username { get; set; }
		[Required]
		[StringLength(15, MinimumLength = 6)]
		public string Password { get; set; }
	}
}

using Crypto.Validate;
using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Identity
{
    [ChangePasswordValidated]
    public class ChangePasswordViewModel
    {
        [Required] 
        [StringLength(15, MinimumLength = 6)]
        //[UsernameValidate(new string[] { "Admin","admin", "test", "Test", "root", "Root"})]
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

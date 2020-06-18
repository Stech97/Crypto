using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Identity
{
    public class CheckViewModel
    {
        [Required]
        [StringLength(15, MinimumLength = 6)]
        public string Username { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}

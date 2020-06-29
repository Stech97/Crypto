using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Identity
{
    public class CheckViewModel
    {
        [StringLength(15, MinimumLength = 6)]
        public string Username { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }
}

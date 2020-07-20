using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Administrator
{
    public class DiscardKYCViewModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Error { get; set; }
    }
}

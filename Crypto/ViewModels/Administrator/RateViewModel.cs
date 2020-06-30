using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Administrator
{
    public class RateDETViewModel
    {
        [Required]
        public double RateDet { get; set; }
    }
}

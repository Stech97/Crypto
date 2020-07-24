using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Dashdoard
{
    public class CashBTCViewModel
    {
        [Required]
        public string BTC { get; set; }
        public string Wallet { get; set; }
    }
}

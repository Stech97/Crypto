using Crypto.Validate;
using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Dashdoard
{
    public class RateViewModel
    {
        [Required]
        [BuyInvestmentValidate(new string[] { "BTC", "USD", "DET" })]
        public string From { get; set; }
        [Required]
        [BuyInvestmentValidate(new string[] { "BTC", "USD", "DET" })]
        public string To { get; set; }
    }
}

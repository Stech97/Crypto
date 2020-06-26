using Crypto.Validate;
using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Investment
{
    public class BuyInvestmentViewModel
    {
        [Required]
        [BuyInvestmentValidate(new string[] { "BTC", "USD", "DET" })]
        public string Currency { get; set; }
        [Required]
        public double SumInvestment { get; set; }
        [Required]
        [Range(1, 3)]
        public int Type { get; set; }
    }
}

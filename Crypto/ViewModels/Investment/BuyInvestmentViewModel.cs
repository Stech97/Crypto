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
        [BuyInvestmentValidate(new string[] { "Small", "small", "Medium", "medium", "Large", "large" })]
        public string Type { get; set; }


    }
}

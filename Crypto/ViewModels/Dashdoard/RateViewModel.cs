using Crypto.Validate;

namespace Crypto.ViewModels.Dashdoard
{
    public class RateViewModel
    {
        [BuyInvestmentValidate(new string[] { "BTC", "USD", "DET" })]
        public string From { get; set; }
        [BuyInvestmentValidate(new string[] { "BTC", "USD", "DET" })]
        public string To { get; set; }
    }
}

﻿using Crypto.Validate;
using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Dashdoard
{
	public class ExchangeViewModel
	{
        [Required]
        [Range(1, double.MaxValue)]
        public double Amount { get; set; }
        [BuyInvestmentValidate(new string[] { "BTC", "USD", "DET" })]
        public string From { get; set; }
        [BuyInvestmentValidate(new string[] { "BTC", "USD", "DET" })]
        public string To { get; set; }
    }
}

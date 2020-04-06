using System;

namespace Crypto.ViewModels
{
	public class InvestmentViewModel
	{
		public int InvestmentId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string Profit { get; set; }
		public DateTime CreatedDate { get; set; }
	}
}

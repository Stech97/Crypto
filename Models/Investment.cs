using System.Dynamic;

namespace Models
{
	public class Investment
	{
		public int Id { get; set; }
		public double AddCash { get; set; }
		public System.DateTime DateInvestment { get; set; }
		public int TypeInvestmentId { get; set; }
		public double Profit { get; set; }
		public double TotalCommission { get; set; }
		public double LastCommission { get; set; }
		public bool IsFullInvest { get; set; }
		public int UserId { get; set; }
		#region Dependencces
		public User User { get; set; }
		public TypeInvestment TypeInvestment { get; set; }
        #endregion 
    }
}

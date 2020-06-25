namespace Models
{
	public class Investment
	{
		public int Id { get; set; }
		public double AddCash { get; set; }
		public System.DateTime DateInvestment { get; set; }
		public string Type { get; set; }
		public double Profit { get; set; }
		public bool IsFullInvest { get; set; }
		public int UserId { get; set; }
		public User User { get; set; }
	}
}

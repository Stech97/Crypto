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
		public double CurrentCommission { get; set; }
		public bool IsFullInvest { get; set; }
		public int UserId { get; set; }
		
		#region Dependencces
		public User User { get; set; }
		public TypeInvestment TypeInvestment { get; set; }
        #endregion

        public override string ToString()
        {
            string ret = "";
            switch (TypeInvestmentId)
            {
                case 1:
                    ret = "Small";
                    break;
                case 2:
                    ret = "Medium";
                    break;
                case 3:
                    ret = "Large";
                    break;
            }
            return ret;
        }

    }
}

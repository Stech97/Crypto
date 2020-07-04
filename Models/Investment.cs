namespace Models
{
	public class Investment
	{
		public int Id { get; set; }
		public double AddCash { get; set; }
		public System.DateTime DateInvestment { get; set; }
		public EnumTypeInvestment TypeInvest { get; set; }
		public double Profit { get; set; }
		public double TotalCommission { get; set; }
		public double LastCommission { get; set; }
		public double CurrentCommission { get; set; }
		public bool IsFullInvest { get; set; }
		public int UserId { get; set; }
		
		#region Dependencces
		public User User { get; set; }
        #endregion

        public override string ToString()
        {
            string ret = "";
            switch (TypeInvest)
            {
                case EnumTypeInvestment.Small:
                    ret = "Small";
                    break;
                case EnumTypeInvestment.Medium:
                    ret = "Medium";
                    break;
                case EnumTypeInvestment.Large:
                    ret = "Large";
                    break;
            }
            return ret;
        }

    }
}

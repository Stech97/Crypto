namespace Models
{
    public class BalanceHistory
    {
        public int Id { get; set; }
        public System.DateTime Time { get; set; }
        public EnumTypeHistory TypeHistory { get; set; }
        public double Amount { get; set; }
        public double Balance { get; set; }
        public int UserId { get; set; }
        
        #region Dependencces
        public User User { get; set; }
        #endregion 

        public override string ToString()
        {
            string ret = "";
            switch (TypeHistory)
            {
                case EnumTypeHistory.ProfitSmall:
                    ret = "Profit Small";
                    break;
                case EnumTypeHistory.ProfitMedium:
                    ret = "Profit Medium";
                    break;
                case EnumTypeHistory.ProfitLarge:
                    ret = "Profit Large";
                    break;
                case EnumTypeHistory.Add:
                    ret = "Add";
                    break;
                case EnumTypeHistory.Withdraw:
                    ret = "Withdraw";
                    break;
                case EnumTypeHistory.Comission:
                    ret = "Comission";
                    break;
                case EnumTypeHistory.BuySmall:
                    ret = "Buy Small";
                    break;
                case EnumTypeHistory.BuyMedium:
                    ret = "Buy Medium";
                    break;
                case EnumTypeHistory.BuyLarge:
                    ret = "Buy Large";
                    break;
                case EnumTypeHistory.AcceptWithdrow:
                    ret = "AcceptWithdrow";
                    break;
                case EnumTypeHistory.DiscardWithdrow:
                    ret = "DiscardWithdrow";
                    break;
            }
            return ret;
        }

    }
}
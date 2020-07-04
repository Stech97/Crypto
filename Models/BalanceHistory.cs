namespace Models
{
    public class BalanceHistory
    {
        public int Id { get; set; }
        public System.DateTime Time { get; set; }
        public int TypeInvestmentId { get; set; }
        public double Amount { get; set; }
        public double Balance { get; set; }
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
                case 4:
                    ret = "Add";
                    break;
                case 5:
                    ret = "Withdraw";
                    break;
                case 6:
                    ret = "Comission ";
                    break;
                default:
                    ret = "Buy ";
                    break;
            }
            return ret;
        }

    }
}

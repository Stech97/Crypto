using System.Collections.Generic;

namespace Models
{
    public class TypeInvestment
    {
        public int Id { get; set; }
        public EnumTypeInvestment Type { get; set; }
        public double Persent { get; set; }
        
        #region Dependencces
        public List<Investment> Investments { get; set; }
        public List<BalanceHistory> BalanceHistories { get; set; }
        #endregion

    }
}

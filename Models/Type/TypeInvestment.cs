using System.Collections.Generic;

namespace Models
{
    public class TypeInvestment
    {
        public EnumTypeInvestment Type { get; set; }
        public double Persent { get; set; }
        
        #region Dependencces
        public List<Investment> Investments { get; set; }
        #endregion

    }
}

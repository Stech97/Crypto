using Models.Enum;

namespace Models
{
    public class TypeInvestment
    {
        public EnumTypeInvestment Type { get; set; }
        public double Persent { get; set; }

        public override string ToString()
        {
            switch (Type)
            {
                case EnumTypeInvestment.Small:
                    return "Commission Small";
                case EnumTypeInvestment.Medium:
                    return "Commission Medium";
                case EnumTypeInvestment.Large:
                    return "Commission Large";
                default:
                    return "";
            }
        }
    }
}

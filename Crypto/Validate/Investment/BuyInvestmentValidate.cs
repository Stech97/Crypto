using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Crypto.Validate
{
    public class BuyInvestmentValidateAttribute : ValidationAttribute
    {
        private readonly string[] _names;
        public BuyInvestmentValidateAttribute(string[] names)
        {
            _names = names;
        }
        public override bool IsValid(object value)
        {
            if (value != null && _names.Contains(value.ToString()))
                return true;

            return false;
        }
    }
}

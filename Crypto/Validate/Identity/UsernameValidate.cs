using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Crypto.Validate
{
    public class UsernameValidateAttribute : ValidationAttribute
    {
        private readonly string[] usernames;
        public UsernameValidateAttribute(string[] names)
        {
            usernames = names;
        }
        public override bool IsValid(object value)
        {
            if (value != null && !usernames.Contains(value.ToString()))
                return true;
            return false;
        }
    }
}

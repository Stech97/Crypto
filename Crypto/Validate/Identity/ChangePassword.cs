using Crypto.ViewModels.Identity;
using System.ComponentModel.DataAnnotations;

namespace Crypto.Validate
{
    public class ChangePasswordValidated : ValidationAttribute
    { 
        public ChangePasswordValidated()
        {
            ErrorMessage = "Username and password must not match!";
        }
        public override bool IsValid(object value)
        {
            ChangePasswordViewModel login = value as ChangePasswordViewModel;

            if (login.Username == login.Password)
            {
                return false;
            }
            return true;
        }
    }
}

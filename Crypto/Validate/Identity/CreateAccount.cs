using Crypto.Services.Interfaces;
using Crypto.ViewModels.Identity;
using System.ComponentModel.DataAnnotations;

namespace Crypto.Validate
{
    public class CreateAccountValidate : ValidationAttribute
    {
        //private string[] = new //добавить массив имен недопустимых
        public CreateAccountValidate()
        {
            ErrorMessage = "Username and password must not match!";
        }
        public override bool IsValid(object value)
        {
            LoginViewModel login = value as LoginViewModel;

            if (login.Username == login.Password)
            {
                return false;
            }
            return true;
        }
    }
}
using Models.Enum;

namespace Models.DTO
{
    public class Forgot
    {
        public string Hash { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public int? CountAttempt { get; set; }
        public EnumTypeForgot TypeForgotPassword { get; set; }
    }
}

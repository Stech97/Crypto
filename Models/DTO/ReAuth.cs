using Models.Enum;

namespace Models.DTO
{
    public class ReAuth
    {
        public string Username { get; set; }
        public bool IsVerified { get; set; }
        public bool IsFogotPassword { get; set; }
        public bool IsBlock { get; set; }
        public EnumTypeAuth Status { get; set; }
    }
}

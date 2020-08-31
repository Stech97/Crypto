using Models.Enum;

namespace Models.DTO
{
    public class Comfirm
    {
        public int? Id { get; set; }
        public string Username { get; set; }
        public bool? IsVerified { get; set; }
        public EnumTypeComfirm TypeComfirmEmail { get; set; }
    }
}

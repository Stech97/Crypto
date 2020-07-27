using Models.Enum;

namespace Models.DTO
{
    public class WithdrawAll
    {
        public string Username { get; set; }
        public double Amount { get; set; }
        public int UserId { get; set; }
        public EnumWithDraw Status { get; set; }

        public override string ToString()
        {
            string ret = string.Empty;
            switch (Status)
            {
                case EnumWithDraw.Accept:
                    ret = "Accept";
                    break;
                case EnumWithDraw.Discard:
                    ret = "Discard";
                    break;
                case EnumWithDraw.Withdraw:
                    ret = "Withdraw";
                    break;
            }
            return ret;
        }
    }
}

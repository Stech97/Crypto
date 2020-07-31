using Models.Enum;

namespace Models.DTO
{
    public class WithdrawAll
    {
        public string Username { get; set; }
        public double Amount { get; set; }
        public int UserId { get; set; }
        public string Wallet { get; set; }
        public EnumTypeWithdraw Status { get; set; }

        public override string ToString()
        {
            string ret = string.Empty;
            switch (Status)
            {
                case EnumTypeWithdraw.Accept:
                    ret = "Accept";
                    break;
                case EnumTypeWithdraw.Discard:
                    ret = "Discard";
                    break;
                case EnumTypeWithdraw.Withdraw:
                    ret = "Withdraw";
                    break;
            }
            return ret;
        }
    }
}

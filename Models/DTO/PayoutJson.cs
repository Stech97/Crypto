using System.Collections.Generic;

namespace Models.DTO
{
    public class PayoutJson
    {
        public string Amount { get; set; }
        public string Currency { get; set; }
        public string EffectiveDate { get; set; }
        public IList<Instruction> Instructions { get; set; }
        public string Token { get; set; }
    }

    public class Instruction
    {
        public string Address { get; set; }
        public string Amount { get; set; }
    }
}

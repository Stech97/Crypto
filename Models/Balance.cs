namespace Models
{
    public class Balance
    {
        public int Id { get; set; }
        public double BitcoinBalance { get; set; }
        public int USDBalance { get; set; }
        public int DefimaBalance { get; set; }
        public double RateBTC_USD { get; set; }
        public double RateUSD_DEF { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}

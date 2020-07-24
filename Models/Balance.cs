namespace Models
{
    public class Balance
    {
        public int Id { get; set; }
        public double BitcoinBalance { get; set; }
        public double USDBalance { get; set; }
        public double DefimaBalance { get; set; }
        public int UserId { get; set; }

        public string BitcoinWallet { get; set; }

        #region Dependecy
        public User User { get; set; }
        #endregion
    }
}

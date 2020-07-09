namespace Models
{
    public class MarketFiles
    {
        public int Id { get; set; }
        public string Component { get; set; }
        public byte[] Content { get; set; }
        public string Name { get; set; }
    }
}

namespace Models
{
    public class CurrentSession
    {
        public int Id { get; set; }
        public System.DateTime LoginTime { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}

namespace Models
{
    public class LoginHistory
    {
        public int Id { get; set; }
        public string IP { get; set; }
        public System.DateTime LoginTime { get; set;}
        public User User { get; set; }
        public int UserId { get; set; }
    }
}

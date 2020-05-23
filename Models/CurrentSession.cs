using System;

namespace Models
{
    public class CurrentSession
    {
        public int Id { get; set; }
        public string IP { get; set; }
        public DateTime LoginTime { get; set; }
        public DateTime LogoutTime { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}

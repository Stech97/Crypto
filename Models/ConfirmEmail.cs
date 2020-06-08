using System;

namespace Models
{
    public class ConfirmEmail
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}

namespace Models
{
    public class ForgotPassword
    {
        public int Id { get; set; }
        public System.DateTime TimeForgot { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}

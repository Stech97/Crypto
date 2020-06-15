namespace Models
{
    public class ConfirmEmail
    {
        public int Id { get; set; }
        public System.DateTime TimeConfirm { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}

namespace Models
{
	public class Investment
	{
		public int Id { get; set; }
		
		public int UserId { get; set; }
		public User User { get; set; }
	}
}

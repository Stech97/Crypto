using System.Collections.Generic;

namespace Models
{
	public class User
    {
		public int UserId { get; set; }
		public string Email { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public string RefLink { get; set; }
		public string LastName { get; set; }
		public string FirstName { get; set; }
		public string Phone { get; set; }
		public int TeamID { get; set; }
		public virtual ICollection<UserToUserRole> UserToUserRoles { get; set; }
	}
}

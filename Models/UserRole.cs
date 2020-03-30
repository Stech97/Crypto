using System.Collections.Generic;

namespace Models
{
	public class UserRole
	{
		public int UserRoleID { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int Type { get; set; }
		public bool IsAdmin { get; set; }
		public virtual ICollection<UserToUserRole> UserToUserRoles { get; set; }
	}
}

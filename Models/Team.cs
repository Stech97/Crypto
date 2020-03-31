using System.Collections.Generic;

namespace Models
{
	public class Team
	{
		public int TeamID { get; set; }
		public string Name { get; set; }
		public virtual ICollection<User> Users { get; set; }
	}
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
	public class Team
	{
		public int TeamID { get; set; }
		public string Name { get; set; }
		public virtual ICollection<User> Users { get; set; }
	}
}

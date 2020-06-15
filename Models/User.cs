using System;
using System.Collections.Generic;

namespace Models
{
	public class User
    {
		public int Id { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DateTime BDay { get; set; }
		public string Adress { get; set; }
		public int Zip { get; set; }
		public string RefLink { get; set; }
		public bool IsVerified { get; set; }
		public bool IsFogotPassword { get; set; }
		public int? ParentId { get; set; }
		public IEnumerable<User> Children { get; set; }

		#region Dependencces
		public Balance Balance { get; set; }
		public ConfirmEmail ConfirmEmail { get; set; }
		public ForgotPassword ForgotPassword { get; set; }
		public List<LoginHistory> LoginHistories { get; set; }
		public List<CurrentSession>  CurrentSessions { get; set; }
		public List<Investment> Investments { get; set; }
        #endregion
    }
}

using System;
using System.Collections.Generic;

namespace Models
{
	public class User
    {
		public int Id { get; set; }

        #region Main Info
        public string Username { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Country { get; set; }
		public DateTime BDay { get; set; }
		public string Adress { get; set; }
		public int Zip { get; set; }
		public string ErrorDiscard { get; set; }
        #endregion

        #region Bool
        public bool IsVerified { get; set; }
		public bool IsFogotPassword { get; set; }
		public bool IsReInvest { get; set; }
		public bool IsBlock { get; set; }
		public bool IsSuper { get; set; }
		public bool IsShowInfo { get; set; }
		public bool IsKYC { get; set; }
		public bool IsDiscard { get; set; }
        #endregion

        #region Picture
		public byte[] PassportPicture { get; set;}
		public string PassportPictureName { get; set; }
		public byte[] ProofPicture { get; set; }
		public string ProofPictureName { get; set; }
		public byte[] SelfiPicture { get; set; }
		public string SelfiPictureName { get; set; }
		#endregion

		public int? ParentId { get; set; }
		public IEnumerable<User> Children { get; set; }

		#region Dependencces
		public Balance Balance { get; set; }
		public ConfirmEmail ConfirmEmail { get; set; }
		public ForgotPassword ForgotPassword { get; set; }
		public List<LoginHistory> LoginHistories { get; set; }
		public List<CurrentSession>  CurrentSessions { get; set; }
		public List<Investment> Investments { get; set; }
		public List<BalanceHistory> BalanceHistories { get; set; }
        #endregion
    }
}

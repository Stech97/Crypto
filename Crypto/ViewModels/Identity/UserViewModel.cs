﻿namespace Crypto.ViewModels.Identity
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public bool IsVerified { get; set; }
        public bool IsReInvest { get; set; }
    }
}

﻿namespace Crypto.ViewModels.Identity
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public bool IsVerification { get; set; }
    }
}

﻿using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Crypto.Helpers
{
	public class AuthOptions
	{
		public const string ISSUER = "Crypto";
		public const string AUDIENCE = "PortalUser";
		const string KEY = "authentification_security_key!qwe123";
		public const int LIFETIME = 60;
		public static SymmetricSecurityKey GetSymmetricSecurityKey()
		{
			return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
		}
	}
}

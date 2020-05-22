using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Crypto.Helpers
{
	public class AuthOptions
	{
		public const string ISSUER = "Defima";
		public const string AUDIENCE = "DefiamToken";
		const string KEY = "authentification_security_key!ForDefima.IO";
		public const int LIFETIME = 60;
		public static SymmetricSecurityKey GetSymmetricSecurityKey()
		{
			return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
		}
	}
}

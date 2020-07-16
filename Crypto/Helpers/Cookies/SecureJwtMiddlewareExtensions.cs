using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;

namespace Crypto.Helpers
{
    public static class SecureJwtMiddlewareExtensions
    {
        public static IApplicationBuilder UseSecureJwt(this IApplicationBuilder builder) => builder.UseMiddleware<SecureJwtMiddleware>();
        public static IApplicationBuilder UseXsrfProtection(this IApplicationBuilder builder, IAntiforgery antiforgery) 
            => builder.UseMiddleware<XsrfProtectionMiddleware>(antiforgery);
    }
}

using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Crypto.Helpers
{
    public class XsrfProtectionMiddleware
    {
        private readonly IAntiforgery _antiforgery;
        private readonly RequestDelegate _next;

        public XsrfProtectionMiddleware(RequestDelegate next, IAntiforgery antiforgery)
        {
            _next = next;
            _antiforgery = antiforgery;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            context.Response.Cookies.Append(
                ".AspNetCore.Xsrf",
                _antiforgery.GetAndStoreTokens(context).RequestToken,
                new CookieOptions { HttpOnly = false, Secure = true, MaxAge = TimeSpan.FromMinutes(AuthOptions.LIFETIME) });

            await _next(context);
        }
    }
}

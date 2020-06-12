using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : Controller
    {
        readonly IEmailService _email;
        public EmailController(IEmailService email)
        {
            _email = email;
        }

        [Route("AddEmail")]
        [HttpPost]
        public async Task<IActionResult> Email([FromBody] EmailViewModel email)
        {
            await _email.AddEmail(email);
            return Ok();
        }
    }
}
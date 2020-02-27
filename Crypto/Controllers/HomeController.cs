using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
	}
}
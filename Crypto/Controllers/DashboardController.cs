using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        //[Authorize]
        [Route("GetBalance")]
        [HttpGet]
        public async Task<BalanceViewModel> GetBalance(string Username)
        {
            return await _dashboardService.GetBalance(Username);
        }

        public string GetServerTime()
        {
            return System.DateTime.Now.ToShortTimeString();
        }

        //[Authorize]
        [Route("GetLoginHistory")]
        [HttpGet]
        public async Task<List<LoginHistoryViewModel>> GetLoginHistory(string Username)
        {
            return await _dashboardService.GetLoginHistory(Username);
        }

        //[Authorize]
        [Route("GetRefLink")]
        [HttpGet]
        public async Task<RefLinkViewModel> GetRefLink(string Username)
        {
            var RefLink = await _dashboardService.GetRefLink(Username);
            RefLink.RefId = "www.defima.io/" + RefLink.RefId;
            RefLink.RefString = "www.defima.io/" + RefLink.RefString;
            return RefLink;
        }

        //[Authorize]
        [Route("SetLoginHistory")]
        [HttpPost]
        public async Task<IActionResult> SetLoginHistory([FromBody] LoginHistoryViewModel request, string Username)
        {
            await _dashboardService.SetLoginHistory(request, Username);
            return Ok();
        }
    }
}

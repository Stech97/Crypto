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
        public async Task<BalanceViewModel> GetBalance(int Id)
        {
            return await _dashboardService.GetBalance(Id);
        }

        public string GetServerTime()
        {
            return System.DateTime.Now.ToShortTimeString();
        }

        //[Authorize]
        [Route("GetLoginHistory")]
        [HttpGet]
        public async Task<List<LoginHistoryViewModel>> GetLoginHistory(int Id)
        {
            return await _dashboardService.GetLoginHistory(Id);
        }

        //[Authorize]
        [Route("GetRefLink")]
        [HttpGet]
        public async Task<RefLinkViewModel> GetRefLink(int Id)
        {
            var RefLink = await _dashboardService.GetRefLink(Id);
            RefLink.RefId = "www.defima.io/" + RefLink.RefId;
            RefLink.RefString = "www.defima.io/" + RefLink.RefString;
            return RefLink;
        }

        //[Authorize]
        [Route("SetLoginHistory")]
        [HttpPost]
        public async Task<IActionResult> SetLoginHistory([FromBody] LoginHistoryViewModel request, int Id)
        {
            await _dashboardService.SetLoginHistory(request, Id);
            return Ok();
        }
    }
}

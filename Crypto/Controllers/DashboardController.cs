using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Dashdoard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : Controller
    {
        readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        //[Authorize]
        [Route("GetBalance")]
        [HttpGet]
        public async Task<IActionResult> GetBalance(int Id)
        {
            var response = await _dashboardService.GetBalance(Id);
            if (response != null)
                return Ok(response);
            return BadRequest("No Balance");
        }

        [Route("GetTime")]
        [HttpGet]
        public IActionResult GetServerTime()
        {
            var time = new
            {
                Time = System.DateTime.Now.ToLongTimeString()
            };

            return Ok(time);
        }

        //[Authorize]
        [Route("GetLoginHistory")]
        [HttpGet]
        public async Task<IActionResult> GetLoginHistory(int Id)
        {
            var response = await _dashboardService.GetLoginHistory(Id);
            if (response != null)
                return Ok(response);
            return BadRequest("No login");
        }

        //[Authorize]
        [Route("GetRefLink")]
        [HttpGet]
        public async Task<IActionResult> GetRefLink(int Id)
        {
            var RefLink = await _dashboardService.GetRefLink(Id);
            return Ok(RefLink);
        }

        //[Authorize]
        [Route("GetNews")]
        [HttpGet]
        public async Task<IActionResult> GetNews(int Take, int Skip)
        {
            var response = await _dashboardService.GetNews(Take, Skip);
            if (response != null)
                return Ok(response);
            return BadRequest("No News");
        }

        //[Authorize]
        [Route("Exchange")]
        [HttpPatch]
        public async Task<IActionResult> Exchange([FromBody] ExchangeViewModel request, int Id)
        {
            var response = await _dashboardService.ExchangeBalance(request, Id);
            if (response)
                return Ok("Exchanged");
            return BadRequest("Not exchanged");

        }

        //[Authorize]
        [Route("GetRate")]
        [HttpPost]
        public async Task<IActionResult> GetRate([FromBody] RateViewModel request)
        {
            var rate = await _dashboardService.GetRate(request);
            if (rate >= 0)
            {
                var response = new { rate };
                return Ok(response);
            }
            return BadRequest("No rate");
        }

        #region Fake
        //[Authorize]
        [Route("CashBTC")]
        [HttpPatch]
        public async Task<IActionResult> CashBTC([FromBody] CashBTCViewModel request, int Id)
        {
            var balance = await _dashboardService.CashBTC(request, Id);
            if (balance != null)
                return Ok(balance);
            return BadRequest("No cash");
        }

        #endregion

        //[Authorize]
        [Route("GetTeam")]
        [HttpGet]
        public async Task<IActionResult> GetTeam(int Ref)
        {
            var response = await _dashboardService.GetTeam(Ref);
            if (response != null)
                return Ok(response);
            return BadRequest("No Team");
        }

        #region Earnings
        //[Authorize]
        [Route("GetTotalInvestment")]
        [HttpGet]
        public async Task<IActionResult> GetTotalInvestment(int Id)
        {
            var response = await _dashboardService.GetTotalInvestment(Id);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }

        //[Authorize]
        [Route("ProfitFromInvest")]
        [HttpGet]
        public async Task<IActionResult> ProfitFromInvest(int Id)
        {
            var response = await _dashboardService.ProfitFromInvest(Id);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }

        //[Authorize]
        [Route("GetTotalMembers")]
        [HttpGet]
        public async Task<IActionResult> GetTotalMembers(int Id)
        {
            var response = new
            {
                TotalMember = await _dashboardService.GetTotalMembers(Id)
            };
            return Ok(response);
        }

        //[Authorize]
        [Route("GetEarningsTeam")]
        [HttpGet]
        public async Task<IActionResult> GetEarningsTeam(int Id)
        {
            var response = await _dashboardService.GetEarningsTeam(Id);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }

        //[Authorize]
        [Route("GetTotalProfit")]
        [HttpGet]
        public async Task<IActionResult> GetTotalProfit(int Id)
        {
            var response = await _dashboardService.GetTotalProfit(Id);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }

        //[Authorize]
        [Route("GetLastWeekProfit")]
        [HttpGet]
        public async Task<IActionResult> GetLastWeekProfit(int Id) 
        {
            var response = await _dashboardService.GetLastWeekProfit(Id);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }

        #endregion
    }
}

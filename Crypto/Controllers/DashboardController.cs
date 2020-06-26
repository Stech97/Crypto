﻿using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels.Dashdoard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

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
            RefLink.RefId = "www.defima.io/" + RefLink.RefId;
            RefLink.RefString = "www.defima.io/" + RefLink.RefString;
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
            if (rate <= 0)
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
            return Ok(await _dashboardService.GetTeam(Ref));
        }

        #region Earnings
        //[Authorize]
        [Route("GetTotalInvestment")]
        [HttpGet]
        public async Task<IActionResult> GetTotalInvestment(int Id)
        {
            return Ok(await _dashboardService.GetTotalInvestment(Id));
        }

        //[Authorize]
        [Route("ProfitFromInvest")]
        [HttpGet]
        public async Task<IActionResult> ProfitFromInvest(int Id)
        {
            var response = new
            {
                Profit = await _dashboardService.ProfitFromInvest(Id)
            };
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
            var response = new
            {
                LastDayProfit = await _dashboardService.GetEarningsTeam(Id)
            };
            return Ok(response);
        }

        //[Authorize]
        [Route("GetTotalProfit")]
        [HttpGet]
        public async Task<IActionResult> GetTotalProfit(int Id)
        {
            var response = new
            {
                TotalProfit = await _dashboardService.GetTotalProfit(Id)
            };

            return Ok(response);
        }

        //[Authorize]
        [Route("GetLastDayProfit")]
        [HttpGet]
        public async Task<IActionResult> GetLastDayProfit(int Id) 
        {
            var response = new
            {
                LastDayProfit = await _dashboardService.GetLastDayProfit(Id)
            };
            return Ok(response);
        }

        #endregion
    }
}

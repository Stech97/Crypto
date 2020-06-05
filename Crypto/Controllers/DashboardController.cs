﻿using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            return Ok(await _dashboardService.GetBalance(Id));
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
            return Ok(await _dashboardService.GetLoginHistory(Id));
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
            return Ok(await _dashboardService.GetNews(Take, Skip));
        }

        //[Authorize]
        [Route("Exchange")]
        [HttpPatch]
        public async Task<IActionResult> Exchange([FromBody] BalanceViewModel request, int Id)
        {
            return Ok(await _dashboardService.ExchangeBalance(request, Id));
        }

        //[Authorize]
        [Route("GetRate")]
        [HttpPost]
        public async Task<IActionResult> GetRate([FromBody] BalanceViewModel request)
        {
            return Ok();
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
            else
                return NoContent();
        }

        #endregion
    }
}

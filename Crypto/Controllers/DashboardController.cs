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

        //[Authorize]
        [Route("UpdateBalance")]
        [HttpPatch]
        public async Task<IActionResult> UpdateBalance([FromBody] BalanceViewModel request, int Id)
        {
            await _dashboardService.UpdateBalance(request, Id);
            return Ok();
        }

        [Route("GetTime")]
        [HttpGet]
        public IActionResult GetServerTime()
        {
            return Ok(System.DateTime.Now.ToLongTimeString());
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

    }
}

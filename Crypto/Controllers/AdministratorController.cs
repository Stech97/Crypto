using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crypto.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdministratorController : ControllerBase
    {
		readonly IAdministratorService _administratorService;
		public AdministratorController(IAdministratorService administratorService)
		{
			_administratorService = administratorService;
		}

		//[Authorize]
		[Route("DeleteInvestment")]
		[HttpDelete]
		public async Task<IActionResult> DeleteInvestment(int Id)
		{
			await _administratorService.DeleteInvestment(Id);
			return NoContent();
		}
	}
}

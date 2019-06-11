using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwipeIO_Web_API.Services;

namespace SwipeIO_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private ISettingService _settingService;

        public SettingController(ISettingService settingService)
        {
            _settingService = settingService;
        }

        // GET: api/Setting
        [HttpGet("cards")]
        public IEnumerable<Card> GetCards()
        {
            var data = _settingService.GetCards();
            return data;
        }
        [HttpGet("gates")]
        public IEnumerable<Gate> GetGates()
        {
            var data = _settingService.GetGates();
            return data;
        }
        [HttpGet("leaves")]
        public IEnumerable<Leave> GetLeaves()
        {
            var data = _settingService.GetLeaves();
            return data;
        }

        
        //[Authorize(Roles = Role.Admin)]
        [HttpPost("addCard")]
        public IActionResult AddCard([FromBody]Card card)
        {
            var done = _settingService.AddCard(card);

            if (done == 0)
                return BadRequest(new { message = "Error" });

            return Ok();
        }
        //[Authorize(Roles = Role.Admin)]
        [HttpPost("addGate")]
        public IActionResult AddGate([FromBody]Gate gate)
        {
            var done = _settingService.AddGate(gate);

            if (done == 0)
                return BadRequest(new { message = "Error" });

            return Ok();
        }
        //[Authorize(Roles = Role.Admin)]
        [HttpPost("addLeave")]
        public IActionResult AddLeave([FromBody]Leave leave)
        {
            var done = _settingService.AddLeave(leave);

            if (done == 0)
                return BadRequest(new { message = "Error" });

            return Ok();
        }

        // PUT: api/Setting/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

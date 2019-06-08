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

        [HttpPost("cards")]
        public IActionResult AddCards([FromBody] string value)
        {
            return Ok();
        }
        [HttpPost("gates")]
        public IActionResult AddGates([FromBody] string value)
        {
            return Ok();
        }
        [HttpPost("leaves")]
        public IActionResult AddLeaves([FromBody] string value)
        {
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

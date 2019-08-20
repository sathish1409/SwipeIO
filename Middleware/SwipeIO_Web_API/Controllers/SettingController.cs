using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SwipeIO_Web_API.Services;

namespace SwipeIO_Web_API.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class SettingController : ControllerBase {
        public IConfiguration _config;
        

        public SettingController (IConfiguration config) {
            _config = config;
        }

        // GET: api/Setting
        [HttpGet ("cards")]
        public IEnumerable<Card> GetCards () {
            SettingService _settingService = new SettingService(_config);
            var data = _settingService.GetCards ();
            return data;
        }

        [HttpGet ("gates")]
        public IEnumerable<Gate> GetGates () {
            SettingService _settingService = new SettingService(_config);
            var data = _settingService.GetGates ();
            return data;
        }

        [HttpGet ("leaves")]
        public IEnumerable<Leave> GetLeaves () {
            SettingService _settingService = new SettingService(_config);
            var data = _settingService.GetLeaves ();
            return data;
        }

        [HttpGet("regularized_reasons")]
        public IEnumerable<RegularizedReason> GetRegularizedReasons()
        {
            SettingService _settingService = new SettingService(_config);
            var data = _settingService.GetRegularizedReasons();
            return data;
        }

        [HttpGet("regularized_reason/{id}")]
        public RegularizedReason GetRegularizedReason(int id)
        {
            SettingService _settingService = new SettingService(_config);
            var data = _settingService.getRegularizedReason(id);
            return data;
        }

        [Authorize (Roles = Role.Admin)]
        [HttpPost ("addCard")]
        public IActionResult AddCard ([FromBody] Card card) {
            SettingService _settingService = new SettingService(_config);
            var done = _settingService.AddCard (card);

            if (done == 0)
                return BadRequest (new { message = "Error" });

            return Ok ();
        }

        [Authorize (Roles = Role.Admin)]
        [HttpPost ("addGate")]
        public IActionResult AddGate ([FromBody] Gate gate) {
            SettingService _settingService = new SettingService(_config);
            var done = _settingService.AddGate (gate);

            if (done == 0)
                return BadRequest (new { message = "Error" });

            return Ok ();
        }

        [Authorize (Roles = Role.Admin)]
        [HttpPost ("addLeave")]
        public IActionResult AddLeave ([FromBody] Leave leave) {
            SettingService _settingService = new SettingService(_config);
            var done = _settingService.AddLeave (leave);

            if (done == 0)
                return BadRequest (new { message = "Error" });

            return Ok ();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost("addRegularizedReason")]
        public IActionResult AddRegularizedReason([FromBody] RegularizedReason regularizedReason)
        {
            SettingService _settingService = new SettingService(_config);
            var done = _settingService.AddRegularizedReason(regularizedReason);

            if (done == 0)
                return BadRequest(new { message = "Error" });

            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [Authorize (Roles = Role.Admin)]
        [HttpDelete ("gates/{id}")]
        public IActionResult Delete (int id) {
            SettingService _settingService = new SettingService(_config);
            var isDelete = _settingService.DeleteGates (id);

            if (isDelete == 0) {
                return NotFound ();
            }
            return Ok ();
        }

        // DELETE: api/ApiWithActions/5
        [Authorize (Roles = Role.Admin)]
        [HttpDelete ("cards/{id}")]

        public IActionResult DeleteCards (int id) {
            SettingService _settingService = new SettingService(_config);
            var isDelete = _settingService.DeleteCards (id);

            if (isDelete == 0) {
                return NotFound ();
            }
            return Ok ();
        }

        // DELETE: api/ApiWithActions/5
        [Authorize (Roles = Role.Admin)]
        [HttpDelete ("leaves/{id}")]

        public IActionResult DeleteLeaves (int id) {
            SettingService _settingService = new SettingService(_config);
            var isDelete = _settingService.DeleteLeaves (id);

            if (isDelete == 0) {
                return NotFound ();
            }
            return Ok ();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("regularized_reasons/{id}")]
        public IActionResult DeleteRegularizedReason(int id)
        {
            SettingService _settingService = new SettingService(_config);
            var isDelete = _settingService.DeleteRegularizedReason(id);

            if (isDelete == 0)
            {
                return NotFound();
            }
            return Ok();
        }

        // PUT: api/Setting/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

    }
}
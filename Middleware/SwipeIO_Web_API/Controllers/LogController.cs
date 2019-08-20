using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SwipeIO_Web_API.Helpers;
using SwipeIO_Web_API.Services;

namespace SwipeIO_Web_API.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]

    public class LogController : ControllerBase {
        public IConfiguration _config;

        public IOptions<AppSettings> _appSettings;

        public LogController (IOptions<AppSettings> appSettings, IConfiguration config) {
            _config = config;
            _appSettings = appSettings;
        }

        [Authorize (Roles = Role.Admin)]
        [HttpPost ("upload")]
        public IActionResult Upload ([FromBody] Log[] LogArray) {
            LogService _logService = new LogService(_config);
            Thread.CurrentThread.CurrentCulture = new CultureInfo ("en-GB");
            var isDone = _logService.Upload (LogArray);

            if (isDone == 0)
                return BadRequest (new { message = "Error" });

            return Ok (isDone);
        }

        [HttpPost("regularize")]
        public IActionResult Regularize([FromBody] RegularizeParameters regularizeParameters)
        {
            Console.WriteLine(regularizeParameters);
            LogService _logService = new LogService(_config);

            EmployeeService _employeeService = new EmployeeService(_appSettings,_config);
            var currentUserId = int.Parse(User.Identity.Name);
            Employee[] reporting_employees = _employeeService.GetReportingEmployees(currentUserId).ToArray();
            for (var i = 0; i < reporting_employees.Length; i++)
            {
                if (reporting_employees[i].emp_id != regularizeParameters.emp_id && !User.IsInRole(Role.Admin))
                {
                    return Forbid();
                }
            }
            var isDone = _logService.Regularize(regularizeParameters, int.Parse(User.Identity.Name));
            if (isDone == 0)
                return BadRequest(new { message = "Error" });
            return Ok(isDone);
        }

        // GET: api/Log
        [HttpGet]
        public string Get () {
            return "HI";
        }

        // GET: api/Log/5
        [HttpGet ("{id}")]
        public string Get (int id) {
            return "value";
        }

        // POST: api/Log
        [HttpPost]
        public void Post ([FromBody] string value) { }

        // PUT: api/Log/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        // DELETE: api/ApiWithActions/5
        [HttpDelete ("{id}")]
        public void Delete (int id) {

        }
    }
}
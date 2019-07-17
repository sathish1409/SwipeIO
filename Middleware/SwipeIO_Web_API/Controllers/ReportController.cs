using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ReportController : ControllerBase {

        public IConfiguration _config;
        public IOptions<AppSettings> _appSettings;



        public ReportController (IOptions<AppSettings> appSettings, IConfiguration config) {
            _config = config;
            _appSettings = appSettings;
        }

        [HttpPost ("get_report")]
        public IActionResult GetReport ([FromBody] ReportParameters reportParameters) {
            ReportService _reportService = new ReportService(_config);
            EmployeeService _employeeService = new EmployeeService(_appSettings, _config);
            var data = _reportService.GetReport (reportParameters);
            var currentUserId = int.Parse (User.Identity.Name);
            Employee[] incharges = _employeeService.GetIncharges (currentUserId).ToArray ();
            for (var i = 0; i < incharges.Length; i++) {
                if (reportParameters.emp_id != currentUserId && incharges[i].emp_id != currentUserId && !User.IsInRole (Role.Admin)) {
                    return Forbid ();
                }
            }

            if (data == null)
                return BadRequest (new { message = "Error" });

            return Ok (data);
        }

        [HttpPost ("get_last_report")]
        public IActionResult GetLastReport ([FromBody] LastReportParameters lastReportParameters) {
            ReportService _reportService = new ReportService(_config);
            EmployeeService _employeeService = new EmployeeService(_appSettings, _config);
            var data = _reportService.GetLastReports (lastReportParameters.emp_id, lastReportParameters.days, lastReportParameters.gate_id);
            var currentUserId = int.Parse (User.Identity.Name);
            Employee[] incharges = _employeeService.GetIncharges (currentUserId).ToArray ();
            for (var i = 0; i < incharges.Length; i++) {
                if (lastReportParameters.emp_id != currentUserId && incharges[i].emp_id != currentUserId && !User.IsInRole (Role.Admin)) {
                    return Forbid ();
                }
            }

            if (data == null)
                return BadRequest (new { message = "Error" });

            return Ok (data);
        }

        [HttpPost ("get_refined_log")]
        public IActionResult GetRefinedLog ([FromBody] RefinedLogParameter refinedLogParameter) {
            ReportService _reportService = new ReportService(_config);
            EmployeeService _employeeService = new EmployeeService(_appSettings, _config);
            var data = _reportService.GetRefinedLog (refinedLogParameter.emp_id, refinedLogParameter.date, refinedLogParameter.gate_id);
            var currentUserId = int.Parse (User.Identity.Name);
            Employee[] incharges = _employeeService.GetIncharges (currentUserId).ToArray ();
            for (var i = 0; i < incharges.Length; i++) {
                if (refinedLogParameter.emp_id != currentUserId && incharges[i].emp_id != currentUserId && !User.IsInRole (Role.Admin)) {
                    return Forbid ();
                }
            }
            if (data == null)
                return BadRequest (new { message = "Error" });
            return Ok (data);
        }

        [HttpGet ("last_log")]
        public IActionResult GetLastLog () {
            ReportService _reportService = new ReportService(_config);
            var data = _reportService.GetLastRefinedLog ();
            if (data == null)
                return BadRequest (new { message = "Error" });
            return Ok (data);
        }

        [HttpPost ("config")]
        public IActionResult GetConfig (ConfigParam desc) {
            ReportService _reportService = new ReportService(_config);
            var data = _reportService.GetConfig (desc);
            if (data == null)
                return BadRequest (new { message = "Error" });
            return Ok (data);
        }

        // GET: api/Report
        [HttpGet]
        public IEnumerable<string> Get () {
            return new string[] { "value1", "value2" };
        }

        // POST: api/Report
        [HttpPost]
        public void Post ([FromBody] string value) { }

        // PUT: api/Report/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        // DELETE: api/ApiWithActions/5
        [HttpDelete ("{id}")]
        public void Delete (int id) { }
    }
}
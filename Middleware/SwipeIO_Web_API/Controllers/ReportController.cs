using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwipeIO_Web_API.Services;

namespace SwipeIO_Web_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private IReportService _reportService;
        private IEmployeeService _employeeService;


        public ReportController(IReportService reportService, IEmployeeService employeeService)
        {
            _reportService = reportService;
            _employeeService = employeeService;
        }


        
        [HttpPost("get_report")]
        public IActionResult GetReport([FromBody]ReportParameters reportParameters)
        {
            var data = _reportService.GetReport(reportParameters);
            var currentUserId = int.Parse(User.Identity.Name);
            Employee[] incharges = _employeeService.GetIncharges(currentUserId).ToArray();
            for (var i=0;i<incharges.Length;i++) {
                if (reportParameters.emp_id != currentUserId && incharges[i].emp_id != currentUserId && !User.IsInRole(Role.Admin))
                {
                    return Forbid();
                }
            }
            
            if (data == null)
                return BadRequest(new { message = "Error" });

            return Ok(data);
        }

        [HttpPost("get_last_report")]
        public IActionResult GetLastReport([FromBody]LastReportParameters lastReportParameters)
        {
            var data = _reportService.GetLastReports(lastReportParameters.emp_id,lastReportParameters.days,lastReportParameters.gate_id);
            var currentUserId = int.Parse(User.Identity.Name);
            Employee[] incharges = _employeeService.GetIncharges(currentUserId).ToArray();
            for (var i = 0; i < incharges.Length; i++)
            {
                if (lastReportParameters.emp_id != currentUserId && incharges[i].emp_id != currentUserId && !User.IsInRole(Role.Admin))
                {
                    return Forbid();
                }
            }

            if (data == null)
                return BadRequest(new { message = "Error" });

            return Ok(data);
        }

        [HttpPost("get_refined_log")]
        public IActionResult GetRefinedLog([FromBody]RefinedLogParameter refinedLogParameter)
        {
            var data = _reportService.GetRefinedLog(refinedLogParameter.emp_id, refinedLogParameter.date, refinedLogParameter.gate_id);
             var currentUserId = int.Parse(User.Identity.Name);
            Employee[] incharges = _employeeService.GetIncharges(currentUserId).ToArray();
            for (var i = 0; i < incharges.Length; i++)
            {
                if (refinedLogParameter.emp_id != currentUserId && incharges[i].emp_id != currentUserId && !User.IsInRole(Role.Admin))
                {
                    return Forbid();
                }
            }
            if (data == null)
                return BadRequest(new { message = "Error" });
            return Ok(data);
        }


        [HttpGet("last_log")]
        public IActionResult GetLastLog()
        {
            var data = _reportService.GetLastRefinedLog();
            if (data == null)
                return BadRequest(new { message = "Error" });
            return Ok(data);
        }

        [HttpPost("config")]
        public IActionResult GetConfig(ConfigParam desc)
        {
            var data = _reportService.GetConfig(desc);
            if (data == null)
                return BadRequest(new { message = "Error" });
            return Ok(data);
        }








        // GET: api/Report
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST: api/Report
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Report/5
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

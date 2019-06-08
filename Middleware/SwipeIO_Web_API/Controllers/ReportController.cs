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


        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }





        [Authorize(Roles = Role.Admin)]
        [HttpPost("get_report")]
        public IActionResult Add([FromBody]ReportParameters reportParameters)
        {
            var data = _reportService.GetReport(reportParameters);

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

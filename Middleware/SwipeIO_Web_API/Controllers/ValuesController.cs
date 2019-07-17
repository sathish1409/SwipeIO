using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SwipeIO_Web_API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get () {
           return new string[] { "Running" };
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        public ActionResult<string> Get (int id) {
            //       db.Database.ExecuteSqlCommand("call Emp(@p0,@p1);", id, "FromAPI");
            return "value" + id;

        }

        // POST api/values
        [HttpPost]
        public void Post ([FromBody] Employee employee) {
            //db.Database.ExecuteSqlCommand("INSERT Employee (id,name) VALUES (@p0,@p1)", employee.id, employee.name);
        }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) {

        }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) { }
    }
}
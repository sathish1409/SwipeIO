﻿using System;
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
        MyDbContext db = new MyDbContext ();
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get () {
            Thread.CurrentThread.CurrentCulture = new CultureInfo ("en-GB"); //dd/MM/yyyy
            string startTime = "12/6/2019 7:00 AM";
            string endTime = "30/6/2019 2:00 PM";
            string day = DateTime.Parse (endTime).Day.ToString ();
            string month = DateTime.Parse (endTime).Month.ToString ();
            string year = DateTime.Parse (endTime).Year.ToString ();
            DateTime today = DateTime.Parse (endTime);
            DateTime tomo = today.AddDays (1);
            TimeSpan day1 = new TimeSpan (23, 59, 59);
            TimeSpan day2 = new TimeSpan (13, 59, 59);
            TimeSpan duration = DateTime.Parse (endTime).Subtract (DateTime.Parse (startTime));
            float i = Convert.ToSingle (duration.TotalHours) + 4;
            return new string[] { "value1", "value2", i.ToString (), year + "/" + month + "/" + day, today.ToString (), tomo.ToString (), day1.Subtract (day2).ToString () };
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
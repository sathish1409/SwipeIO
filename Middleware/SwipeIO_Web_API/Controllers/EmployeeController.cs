﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SwipeIO_Web_API.Services;

namespace SwipeIO_Web_API.Controllers
{
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        MyDbContext Emp = new MyDbContext();
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // POST: api/Employee/authenticate
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]Employee employeeParam)
        {
            var employee = _employeeService.Authenticate(employeeParam.email, employeeParam.pass_word);

            if (employee == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(employee);
        }

        //[Authorize(Roles = Role.Admin)]
        [HttpPost("add")]
        public IActionResult Add([FromBody]Employee employeeParam)
        {
            var employee = _employeeService.Add(employeeParam);

            if (employee == 0)
                return BadRequest(new { message = "Error" });

            return Ok();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var employees = _employeeService.GetAll();
            return Ok(employees);
        }

        [Authorize(Roles = Role.Employee)]
        [HttpPost("get_reporting_employees")]
        public IActionResult GetReportingEmployees(Employee emp)
        {
            var employees = _employeeService.GetReportingEmployees(emp.emp_id);
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var employee = _employeeService.GetById(id);

            if (employee == null)
            {
                return NotFound();
            }

            
            var currentUserId = int.Parse(User.Identity.Name);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }

            return Ok(employee);
        }


        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE: api/ApiWithActions/5
        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var isDelete = _employeeService.Delete(id);

            if (isDelete == 0)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}

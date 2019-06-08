using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SwipeIO_Web_API.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SwipeIO_Web_API.Services
{
    public interface IEmployeeService
    {
        Employee Authenticate(string email, string password);
        IEnumerable<Employee> GetAll();
        int Add(Employee emp);
        Employee GetById(int id);
    }

    public class EmployeeService : IEmployeeService
    {
        MyDbContext Emp = new MyDbContext();
        private readonly AppSettings _appSettings;

        public EmployeeService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public Employee Authenticate(string email, string pass_word)
        {
            var employeeArr = Emp.Employee.FromSql("call  Validate(@p0,@p1);", email,pass_word);
            // return null if user not found
            if (employeeArr.Count()<1)
                return null;
             var employee = employeeArr.First();
            var role = employee.is_admin ? Role.Admin : Role.Employee;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, employee.emp_id.ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            employee.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            employee.pass_word = null;

            return employee;
        }
        public int Add(Employee emp) {
            //call insert_employee('000000C1','Sathish','sathish@gmail.com','123456',1,0,now(),1);
            int isDone = Emp.Database.ExecuteSqlCommand("call insert_employee({0},{1},{2},{3},{4},{5},{6});", emp.emp_number,emp.emp_name,emp.email,emp.pass_word,emp.is_admin,emp.is_contract,emp.card_number);
            return isDone;
        }
        public IEnumerable<Employee> GetAll()
        {
            // return users without passwords 
            Employee[] _employees = Emp.Employee.FromSql("call get_employees();").ToArray();
            return _employees;
        }

        public Employee GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}

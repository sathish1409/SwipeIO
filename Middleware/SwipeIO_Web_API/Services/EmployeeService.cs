using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SwipeIO_Web_API.Helpers;

namespace SwipeIO_Web_API.Services
{
    public interface IEmployeeService
    {
        Employee Authenticate(string email, string password);
        IEnumerable<Employee> GetAll();
        IEnumerable<Employee> GetReportingEmployees(int id);
        int Add(Employee emp);
        Employee GetById(int id);
        int Delete(int id);
        IEnumerable<Employee> GetIncharges(int id);
        int Update(int id, Employee emp, string card_number);
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
            try
            {
                var employeeArr = Emp.Employee.FromSql("call  Validate(@p0,@p1);", email, GetHash(pass_word));

                // return null if user not found
                if (employeeArr.Count() < 1)
                    return null;
                var employee = employeeArr.First();
                var role = employee.is_admin ? Role.Admin : Role.Employee;

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                    new Claim (ClaimTypes.Name, employee.emp_id.ToString ()),
                    new Claim (ClaimTypes.Role, role)
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
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
        public int Add(Employee emp)
        {
            try
            {
                int isDone = 0;
                Employee[] isExist = Emp.Employee.FromSql("call is_employee({0});", emp.email).ToArray();
                if (isExist.Length == 0)
                {
                    Employee[] insertedEmployee = Emp.Employee.FromSql("call insert_employee({0},{1},{2},{3},{4},{5},{6});", emp.emp_number, emp.emp_name, emp.email,GetHash(emp.pass_word), emp.is_admin, emp.is_contract, emp.card_number).ToArray();
                    if (emp.incharges != null)
                        for (var i = 0; i < emp.incharges.Length; i++)
                        {
                            isDone = Emp.Database.ExecuteSqlCommand("call insert_incharge_log({0},{1});", insertedEmployee.First().emp_id, emp.incharges[i]);
                        }
                    isDone = 1;
                }
                else
                {
                    isDone = 99;
                }
                return isDone;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return 0;
            }

        }
        public IEnumerable<Employee> GetAll()
        {
            // return users without passwords 
            try
            {
                Employee[] _employees = Emp.Employee.FromSql("call get_employees();").ToArray();
                foreach(Employee employee in _employees){
                    employee.pass_word = "";
                }
                return _employees;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }

        public Employee GetById(int id)
        {
            try
            {
                Employee _employee = Emp.Employee.FromSql("call get_employee({0});", id).ToArray().First();
                Incharge_log[] incharge_log = Emp.Incharge_log.FromSql("call get_incharges({0});", id).ToArray();
                int[] incharges = new int[incharge_log.Length];
                for (var i = 0; i < incharge_log.Length; i++)
                {
                    incharges[i] = incharge_log[i].incharge_id;
                }
                _employee.incharges = incharges;
                _employee.pass_word = "";
                return _employee;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
        public int Delete(int id)
        {
            try
            {
                int isDelete = Emp.Database.ExecuteSqlCommand("call delete_employee({0});", id);
                return isDelete;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return 0;
            }

        }

        public IEnumerable<Employee> GetReportingEmployees(int id)
        {
            try
            {
                Incharge_log[] incharge_log = Emp.Incharge_log.FromSql("call get_reporting_employees({0});", id).ToArray();
                Employee[] _employees = new Employee[incharge_log.Length];
                for (var i = 0; i < incharge_log.Length; i++)
                {
                    _employees[i] = Emp.Employee.FromSql("call get_employee({0});", incharge_log[i].emp_id).First();
                }
                foreach (Employee employee in _employees)
                {
                    employee.pass_word = "";
                }
                return _employees;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
        public IEnumerable<Employee> GetIncharges(int id)
        {
            try
            {
                Incharge_log[] incharge_log = Emp.Incharge_log.FromSql("call get_incharges({0});", id).ToArray();
                Employee[] _employees = new Employee[incharge_log.Length];
                for (var i = 0; i < incharge_log.Length; i++)
                {
                    _employees[i] = Emp.Employee.FromSql("call get_employee({0});", incharge_log[i].emp_id).ToArray().First();
                }
                foreach (Employee employee in _employees)
                {
                    employee.pass_word = "";
                }
                return _employees;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
        public int Update(int id, Employee emp, string card_number)
        {
            try
            {
                Employee[] employeeWithSameEmail = Emp.Employee.FromSql("call is_employee({0});", emp.email).ToArray();
                if (employeeWithSameEmail.Length == 0 || employeeWithSameEmail[0].emp_id==id)
                {
                    int isUpdate = 0;
                    isUpdate = Emp.Database.ExecuteSqlCommand("call update_employee({0},{1},{2},{3},{4},{5},{6});", id, emp.emp_name, emp.email, GetHash(emp.pass_word), emp.is_admin, emp.is_contract, card_number);
                    Emp.Database.ExecuteSqlCommand("call clear_incharge_log({0});", id);
                    for (var i = 0; i < emp.incharges.Length; i++)
                    {
                        isUpdate = Emp.Database.ExecuteSqlCommand("call insert_incharge_log({0},{1});", id, emp.incharges[i]);
                    }
                    return isUpdate;
                }
                else
                {
                    return 99;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return 0;
            }
        }
        public string GetHash(string str)
        {
            MD5 md5Hash = MD5.Create();
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(str));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }
    }
}
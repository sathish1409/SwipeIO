using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwipeIO_Web_API
{

    public class MyDbContext : DbContext
    {
        public DbSet<Employee> Employee { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server = localhost; port = 3306; database = stud; uid = root; password = ");
        }
    }

    public class Employee
    {
        public int id { get; set; }
        public string name { get; set; }

    }

}
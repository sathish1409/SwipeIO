using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SwipeIO_Web_API
{

    public class MyDbContext : DbContext
    {
        public DbSet<Employee> Employee { get; set; }
        public DbSet<RefinedLog> RefinedLog { get; set; }
        public DbSet<Card> Card { get; set; }
        public DbSet<Gate> Gate { get; set; }
        public DbSet<Leave> Leave { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server = localhost; port = 3306; database = swipeio; uid = root; password = ");
        }
    }

    public class Employee
    {
        [Key]
        public int emp_id { get; set; }
        public string emp_number { get; set; }
        public string emp_name { get; set; }
        public string email { get; set; }
        public int card_id { get; set; }
        public bool is_admin { get; set; }
        public bool is_contract { get; set; }
        public string pass_word { get; set; }
        [NotMapped]
        public string Token { get; set; }
        [NotMapped]
        public string card_number{ get; set; }

    }
    public static class Role
    {
        public const string Admin = "Admin";
        public const string Employee = "Employee";
    }


    public class Log
    {
      
        public string Date { get; set; }
        public string Time { get; set; }
        public string Cardid { get; set; }
        public string Empid { get; set; }
        public string EmpName { get; set; }
        public string Department { get; set; }
        public string Type { get; set; }
        public string CID { get; set; }
        public string Gate { get; set; }
        public string InOut { get; set; }
        public string Remark { get; set; }
        
    }

    public class RefinedLog
    {
        [Key]
        public int log_id { get; set; }

        public DateTime date_log { get; set; }
        public TimeSpan time_log { get; set; }
        public bool inorout { get; set; }
        public int emp_id { get; set; }
        public int gate_id { get; set; }
        public int card_id { get; set; }
        public string remarks { get; set; }

    }

    public class ReportParameters
    {
        public int emp_id { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        
    }
    public class Card
    {
        [Key]
        public int card_id { get; set; }
        public string card_number { get; set; }

    }
    public class Leave
    {
        [Key]
        public int leave_id { get; set; }
        public string leave_name { get; set; }

    }
    public class Gate
    {
        [Key]
        public int gate_id { get; set; }
        public string gate_name { get; set; }

    }
    public class Report
    {
        public int emp_id { get; set; }
        public DateTime date { get; set; }
        public TimeSpan in_time { get; set; }
        public TimeSpan out_time { get; set; }
        public TimeSpan hours_worked { get; set; }
        public TimeSpan hours_inside_office { get; set; }

    }

}
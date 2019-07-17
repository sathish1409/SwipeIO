using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SwipeIO_Web_API
{

    public class MyDbContext : DbContext
    {
        public IConfiguration _config;
        public MyDbContext(IConfiguration config)
        {
            _config = config;
        }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<RefinedLog> RefinedLog { get; set; }
        public DbSet<Card> Card { get; set; }
        public DbSet<Gate> Gate { get; set; }
        public DbSet<Leave> Leave { get; set; }
        public DbSet<Incharge_log> Incharge_log { get; set; }
        public DbSet<Config> Config { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<RefinedLog>().HasKey(table => new {
                table.date_log,
                table.time_log,
                table.emp_id
            });
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(_config.GetConnectionString("SwipeIOConnectionString"));
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
        public string card_number { get; set; }
        [NotMapped]
        public int[] incharges { get; set; }

    }
    public static class Role
    {
        public const string Admin = "Admin";
        public const string Employee = "Employee";
    }
    public class Incharge_log
    {
        [Key]
        public int incharge_log_id { get; set; }
        public int emp_id { get; set; }
        public int incharge_id { get; set; }
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
        public DateTime date_log { get; set; }
        [Key]
        public TimeSpan time_log { get; set; }
        public bool inorout { get; set; }
        [Key]
        public int emp_id { get; set; }
        public int gate_id { get; set; }
        public int card_id { get; set; }
        public string remarks { get; set; }

    }

    public class LastReportParameters
    {
        public int emp_id { get; set; }

        public int days { get; set; }
        public int gate_id { get; set; }
    }
    public class RefinedLogParameter
    {
        public int emp_id { get; set; }

        public string date { get; set; }
        public int gate_id { get; set; }
    }

    public class ReportParameters
    {
        public int emp_id { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public int gate_id { get; set; }

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
    public class Config
    {
        [Key]
        public int config_id { get; set; }
        public string description { get; set; }
        public string value { get; set; }
    }
    public class ConfigParam
    {

        public string description { get; set; }
   
    }
    public class Report
    {
        public int emp_id { get; set; }
        public DateTime date { get; set; }
        public TimeSpan in_time { get; set; }
        public TimeSpan out_time { get; set; }
        public TimeSpan hours_worked { get; set; }
        public TimeSpan hours_inside_office { get; set; }
        public Boolean doubt_flag { get; set; }
        public string day_cons { get; set; }

    }
}
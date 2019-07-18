using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace SwipeIO_Web_API.Services
{

    public class ReportService
    {
        public IConfiguration _config;
        public ReportService(IConfiguration mdb)
        {
            _config = mdb;
        }
        public IEnumerable<Report> GetLastReports(int emp_id, int days, int gate_id)
        {
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
                Dates[] dates = Emp.Dates.FromSql("call get_last_dates_of_employee({0},{1});", emp_id, days).ToArray();
                Report[] report = ReportLogic(dates, emp_id, gate_id);
                return report;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }

        public IEnumerable<Report> GetReport(ReportParameters reportParameters)
        {
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
                Dates[] dates = Emp.Dates.FromSql("call get_dates({0},{1},{2},{3});", reportParameters.emp_id, reportParameters.from, reportParameters.to, reportParameters.gate_id).ToArray();
                Report[] report = ReportLogic(dates, reportParameters.emp_id, reportParameters.gate_id);
                return report;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
        public Report[] ReportLogic(Dates[] dates, int emp_id, int gate_id)
        {
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
                int len = dates.Length;
                Thread.CurrentThread.CurrentCulture = new CultureInfo("en-GB"); //dd/MM/yyyy
                Report[] report = new Report[len];

                //TimeSpan duration = DateTime.Parse(endTime).Subtract(DateTime.Parse(startTime));
                //float i = Convert.ToSingle(duration.TotalHours) + 4;

                for (var i = 0; i < dates.Length; i++)
                {
                    report[i] = new Report();
                    TimeSpan hours = new TimeSpan();
                    var today = DateTime.Parse(dates.ElementAt(i).date_log.ToString());
                    DateTime tomo = today.AddDays(1);
                    TimeSpan day1 = new TimeSpan(23, 59, 59);
                    RefinedLog[] data = Emp.RefinedLog.FromSql("call get_swipe_log_ref({0},{1},{2},{3});", emp_id, today, tomo, gate_id).ToArray();
                    if (data.Length > 1)
                    {
                        report[i].doubt_flag = false;
                        hours = new TimeSpan(0, 0, 0);
                        report[i].emp_id = emp_id;
                        report[i].date = DateTime.Parse(dates.ElementAt(i).date_log.ToString());
                        int found = 0, x = 0, y;
                        //Loop to find a first in time
                        while (found != 1)
                        {
                            if (data[x].inorout == true)
                            {
                                report[i].in_time = TimeSpan.Parse(data[x].time_log.ToString());
                                found = 1;
                            }
                            else
                            {
                                x++;
                            }

                        }
                        found = 0;
                        y = data.Length - 1;
                        //Loop to find a last out time
                        while (found != 1)
                        {
                            if (data[y].inorout == false)
                            {
                                report[i].out_time = TimeSpan.Parse(data[y].time_log.ToString());
                                found = 1;
                            }
                            else
                            {
                                y--;
                            }

                        }

                        // To find the total hours
                        int C_inouttimes = TimeSpan.Compare(report[i].in_time, report[i].out_time);
                        if (C_inouttimes > 0)
                        {
                            TimeSpan day2 = new TimeSpan(23, 59, 59);
                            TimeSpan a = (day2.Subtract(report[i].in_time));
                            report[i].hours_inside_office = a.Add(report[i].out_time);
                        }
                        else
                        {
                            report[i].hours_inside_office = report[i].out_time.Subtract(report[i].in_time);
                        }

                        var j = x;
                        while (j < y)
                        {
                            if (data[j].inorout == true && data[j + 1].inorout == false)
                            {
                                int a = TimeSpan.Compare(TimeSpan.Parse(data[j].time_log.ToString()), TimeSpan.Parse(data[j + 1].time_log.ToString()));
                                if (a > 0)
                                {
                                    TimeSpan interVar = day1.Subtract(TimeSpan.Parse(data[j].time_log.ToString()));
                                    TimeSpan duration = interVar.Add(TimeSpan.Parse(data[j + 1].time_log.ToString()));
                                    hours = hours.Add(duration);
                                }
                                else
                                {
                                    TimeSpan duration = (TimeSpan.Parse(data[j + 1].time_log.ToString()).Subtract(TimeSpan.Parse(data[j].time_log.ToString())));
                                    hours = hours.Add(duration);
                                }
                                j += 2;
                            }
                            else
                            {
                                j += 1;
                                report[i].doubt_flag = true;
                            }
                        }
                        report[i].hours_worked = hours;

                    }
                    else if (data.Length > 0)
                    {
                        report[i].emp_id = emp_id;
                        report[i].date = DateTime.Parse(dates.ElementAt(i).date_log.ToString());
                        report[i].in_time = TimeSpan.Parse(data[0].time_log.ToString());
                        report[i].out_time = TimeSpan.Parse(data[0].time_log.ToString());
                        report[i].hours_inside_office = report[i].out_time.Subtract(report[i].in_time);
                        report[i].hours_worked = report[i].hours_inside_office;
                        report[i].doubt_flag = true;
                    }
                    else
                    {

                    }

                }
                return report;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }

        public RefinedLog[] GetRefinedLog(int emp_id, string date, int gate_id)
        {
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
                var today = DateTime.Parse(date.ToString());
                DateTime tomo = today.AddDays(1);
                RefinedLog[] data = Emp.RefinedLog.FromSql("call get_swipe_log_ref({0},{1},{2},{3});", emp_id, today, tomo, gate_id).ToArray();
                return data;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
        public RefinedLog[] GetLastRefinedLog()
        {
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
                RefinedLog[] data = Emp.RefinedLog.FromSql("call get_last_date();").ToArray();
                return data;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
        public Config GetConfig(ConfigParam desc)
        {
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
                Config data = Emp.Config.FromSql("call get_config({0});", desc.description).FirstOrDefault();
                return data;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
    }

}
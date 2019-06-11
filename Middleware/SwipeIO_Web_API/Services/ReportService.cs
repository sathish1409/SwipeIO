using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SwipeIO_Web_API.Services
{
    
    public interface IReportService
    {
        IEnumerable<Report> GetReport(ReportParameters reportParameters);
        Report[] ReportLogic(RefinedLog[] dates,int emp_id);
        IEnumerable<Report> GetLastReports(int emp_id,int days);

    }
    public class ReportService : IReportService
    {
        MyDbContext Emp = new MyDbContext();

        public IEnumerable<Report> GetLastReports(int emp_id,int days)
        {
            RefinedLog[] dates = Emp.RefinedLog.FromSql("call get_last_dates_of_employee({0},{1});", emp_id, days).ToArray();
            Report[] report = ReportLogic(dates, emp_id);
            return report;
        }

        public IEnumerable<Report> GetReport(ReportParameters reportParameters)
        {

            RefinedLog[] dates = Emp.RefinedLog.FromSql("call get_dates({0},{1},{2});", reportParameters.emp_id,reportParameters.from, reportParameters.to).ToArray();
            Report[] report= ReportLogic(dates, reportParameters.emp_id);
            return report;
           
        }
        public Report[] ReportLogic(RefinedLog[] dates,int emp_id) {

            int len = dates.Length;
            var gate_id = 1;
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
                RefinedLog[] data = Emp.RefinedLog.FromSql("call get_swipe_log_ref({0},{1},{2},{3});", emp_id,today,tomo,gate_id ).ToArray();
                if (data.Length > 1)
                {

                    report[i].emp_id = emp_id;
                    report[i].date = DateTime.Parse(dates.ElementAt(i).date_log.ToString());

                    report[i].in_time = TimeSpan.Parse(data[0].time_log.ToString());
                    var padd = (data.Length % 2 == 0) ? 0 : 1;
                    report[i].out_time = TimeSpan.Parse(data[data.Length - padd - 1].time_log.ToString());
                    int C_inouttimes = TimeSpan.Compare(report[i].in_time, report[i].out_time);
                    if (C_inouttimes > 0) {
                        TimeSpan day1 = new TimeSpan(23, 59, 59);
                        TimeSpan a=(day1.Subtract(report[i].in_time));
                        report[i].hours_inside_office = a.Add(report[i].out_time);
                    }
                    else
                    {
                        report[i].hours_inside_office = report[i].out_time.Subtract(report[i].in_time);
                    }
                        

                    for (var j = 0; j < data.Length - padd; j = j + 2)
                    {

                        int a=TimeSpan.Compare(TimeSpan.Parse(data[j + 1].time_log.ToString()), TimeSpan.Parse(data[j].time_log.ToString()));
                        if (a < 0)
                        {
                            TimeSpan day1 = new TimeSpan(23, 59, 59);
                            TimeSpan duration = (day1.Subtract(TimeSpan.Parse(data[j].time_log.ToString()))).Add(TimeSpan.Parse(data[j+1].time_log.ToString()));
                            hours = hours.Add(duration);
                        }
                        else
                        {

                            TimeSpan duration = (TimeSpan.Parse(data[j].time_log.ToString()).Subtract(TimeSpan.Parse(data[j+1].time_log.ToString())));
                            hours = hours.Add(duration);
                        }
                    }

                }
                report[i].hours_worked = hours;
            }
            return report;

        }

        
        
    }

}

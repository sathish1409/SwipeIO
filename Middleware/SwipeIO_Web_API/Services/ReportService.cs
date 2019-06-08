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
        
    }
    public class ReportService : IReportService
    {
        MyDbContext Emp = new MyDbContext();
        public IEnumerable<Report> GetReport(ReportParameters reportParameters)
        {
            

            RefinedLog[] dates = Emp.RefinedLog.FromSql("call get_dates({0},{1},{2});", reportParameters.emp_id,reportParameters.from, reportParameters.to).ToArray();
            int len = dates.Length;
            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-GB"); //dd/MM/yyyy
            Report[] report=new Report[len];

            //TimeSpan duration = DateTime.Parse(endTime).Subtract(DateTime.Parse(startTime));
            //float i = Convert.ToSingle(duration.TotalHours) + 4;
            for (var i = 0; i < dates.Length; i++)
            {
                report[i] = new Report();
                TimeSpan hours=new TimeSpan();
                RefinedLog[] data = Emp.RefinedLog.FromSql("call get_swipe_log({0},{1});", reportParameters.emp_id, dates.ElementAt(i).date_log).ToArray();
                report[i].emp_id = reportParameters.emp_id;
                report[i].date = DateTime.Parse(dates.ElementAt(i).date_log.ToString());
                report[i].in_time = TimeSpan.Parse(data[0].time_log.ToString());
                var padd = (data.Length % 2 == 0) ? 0 : 1;
                report[i].out_time = TimeSpan.Parse(data[data.Length -padd-1].time_log.ToString());
                report[i].hours_inside_office =report[i].out_time.Subtract(report[i].in_time);
                for (var j = 0; j < data.Length-padd; j = j + 2)
                {
                    TimeSpan duration = TimeSpan.Parse(data[j+1].time_log.ToString()).Subtract(TimeSpan.Parse(data[j].time_log.ToString()));
                    hours =hours.Add(duration);
                }
                report[i].hours_worked = hours;
            }
            return report;
        }
    }

}

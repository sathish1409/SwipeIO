using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwipeIO_Web_API.Services
{
    public interface ILogService
    {
        int Upload(Log[] log);
        IEnumerable<Log> GetAll();
       Log GetById(int id);
    }

    public class LogService : ILogService
    {
        MyDbContext Emp = new MyDbContext();
         //dd/MM/yyyy
        public int Upload(Log[] log)
        {
            var isDone=0;
            for (var i = 0; i < log.Length; i++) {
                string date = DateTime.Parse(log[i].Date).Year.ToString()+"/"+DateTime.Parse(log[i].Date).Month.ToString()+"/"+ DateTime.Parse(log[i].Date).Day.ToString();
                //import_to_swipe(in date1 varchar(10), in time1 varchar(10), in card_number1 varchar(10), in emp_number1 varchar(10), in gate_name1 varchar(20), in inorout1 varchar(5), in remark1 varchar(30))
                isDone = Emp.Database.ExecuteSqlCommand("call import_to_swipe({0},{1},{2},{3},{4},{5},{6});",date,log[i].Time,log[i].Cardid, log[i].Empid, log[i].Gate, log[i].InOut, log[i].Remark);
            }
            return log.Length;
        }

        public IEnumerable<Log> GetAll()
        {
            
            throw new NotImplementedException();
        }

        public Log GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}

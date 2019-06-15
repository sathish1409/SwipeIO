﻿using Microsoft.EntityFrameworkCore;
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
                isDone = Emp.Database.ExecuteSqlCommand("call import_to_swipe({0},{1},{2},{3},{4},{5},{6});",date,log[i].Time,log[i].Cardid, log[i].Empid, log[i].Gate, log[i].InOut, log[i].Remark);
            }

            return isDone!=0?log.Length:0;
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

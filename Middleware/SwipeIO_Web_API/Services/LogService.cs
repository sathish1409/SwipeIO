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
        
        public int Upload(Log[] log)
        {
            var isDone=0;
            for (var i = 0; i < log.Length; i++) {    
                isDone= Emp.Database.ExecuteSqlCommand("call Upload({0});", log[i].Empid);
            }
            return isDone;
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

//using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SwipeIO_Web_API.Services {
    public interface ILogService {
        int Upload (Log[] log);
        // void AutoImport();
        IEnumerable<Log> GetAll ();
        Log GetById (int id);
    }

    public class LogService : ILogService {
        MyDbContext Emp = new MyDbContext ();
        //dd/MM/yyyy
        public int Upload (Log[] log) {
            var isDone = 0;
            for (var i = 0; i < log.Length; i++) {
                string date = DateTime.Parse (log[i].Date).Year.ToString () + "/" + DateTime.Parse (log[i].Date).Month.ToString () + "/" + DateTime.Parse (log[i].Date).Day.ToString ();
                isDone = Emp.Database.ExecuteSqlCommand ("call import_to_swipe({0},{1},{2},{3},{4},{5},{6});", date, log[i].Time, log[i].Cardid, log[i].Empid, log[i].Gate, log[i].InOut, log[i].Remark);
            }

            return isDone != 0 ? log.Length : 0;
        }

        public IEnumerable<Log> GetAll () {

            throw new NotImplementedException ();
        }

        public Log GetById (int id) {
            throw new NotImplementedException ();
        }

        // public void AutoImport()
        // {
        //     Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        //     string url = @Emp.Config.FromSql("call get_config('auto_import_path')").FirstOrDefault().value;
        //     //string url = @"C:\Users\sathish.j\SwipeIO\SwipeLogs";

        //     DirectoryInfo IN = new DirectoryInfo(url + @"\IN\");
        //     var files = IN.GetFiles();
        //     //string names= " ";
        //     // Result result=new Result();
        //     string output = " ";
        //     if (files.Length != 0)
        //     {
        //         for (var i = 0; i < files.Length; i++)
        //         {
        //             var file = files[i].Open(FileMode.Open, FileAccess.Read);
        //             var reader = ExcelReaderFactory.CreateReader(file, new ExcelReaderConfiguration() { FallbackEncoding = Encoding.GetEncoding(1252) });
        //             //Skips to Row 5
        //             reader.Read();
        //             reader.Read();
        //             reader.Read();
        //             reader.Read();
        //             reader.Read();
        //             do
        //             {
        //                 while (reader.Read())
        //                 {
        //                     //peek ahead? Bail before we start anything so we don't get an empty object
        //                     var status = reader.GetString(0);
        //                     if (string.IsNullOrEmpty(status)) break;

        //                     output += reader.GetString(0) + "\t";
        //                     output += reader.GetString(1) + "\t";
        //                     output += reader.GetDouble(2) + "\t";
        //                     output += reader.GetString(4) + "\t";
        //                     output += "\n";

        //                     //string date = DateTime.Parse(log[i].Date).Year.ToString() + "/" + DateTime.Parse(log[i].Date).Month.ToString() + "/" + DateTime.Parse(log[i].Date).Day.ToString();
        //                     //isDone = Emp.Database.ExecuteSqlCommand("call import_to_swipe({0},{1},{2},{3},{4},{5},{6});", date, log[i].Time, log[i].Cardid, log[i].Empid, log[i].Gate, log[i].InOut, log[i].Remark);
        //                 }
        //             } while (reader.NextResult());
        //             file.Close();
        //             files[i].MoveTo(url + @"\PROCESSED\" + files[i].Name);
        //         }
        //     }
        //     else
        //     {
        //         output = "No file Exist in " + IN.FullName;
        //     }
        //     throw new NotImplementedException();
        // }
    }
}

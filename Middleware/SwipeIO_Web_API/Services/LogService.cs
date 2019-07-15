//using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExcelDataReader;
using Microsoft.EntityFrameworkCore;

namespace SwipeIO_Web_API.Services
{
    public interface ILogService
    {
        int Upload(Log[] log);
        void AutoImport();
        IEnumerable<Log> GetAll();
        Log GetById(int id);
    }

    public class LogService : ILogService
    {
        MyDbContext Emp = new MyDbContext();
        public int Upload(Log[] log)
        {
            var isDone = 0;
            try
            {
                for (var i = 0; i < log.Length; i++)
                {
                    string date = DateTime.Parse(log[i].Date).Year.ToString() + "/" + DateTime.Parse(log[i].Date).Month.ToString() + "/" + DateTime.Parse(log[i].Date).Day.ToString();
                    isDone += Emp.Database.ExecuteSqlCommand("call import_to_swipe({0},{1},{2},{3},{4},{5},{6});", date, log[i].Time, log[i].Cardid, log[i].Empid, log[i].Gate, log[i].InOut, log[i].Remark);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return isDone != 0 ? isDone : 0;
        }

        public IEnumerable<Log> GetAll()
        {

            throw new NotImplementedException();
        }

        public Log GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void AutoImport()
        {
            Console.WriteLine("Auto Import Called");
            Emp.Database.ExecuteSqlCommand("call insert_auto_import_log('Auto Import Call')");

            try
            {
                Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                string inUrl = @Emp.Config.FromSql("call get_config('auto_import_in')").FirstOrDefault().value;
                string processedUrl = @Emp.Config.FromSql("call get_config('auto_import_processed')").FirstOrDefault().value;
                string invalidUrl = @Emp.Config.FromSql("call get_config('auto_import_invalid')").FirstOrDefault().value;
                Console.WriteLine(inUrl+processedUrl+invalidUrl);
                DirectoryInfo IN = new DirectoryInfo(inUrl);
                var files = IN.GetFiles();


                if (files.Length != 0)
                {
                    for (var i = 0; i < files.Length; i++)
                    {
                        var supportedTypes = new[] { "xls", "xlsx" };
                        var fileExt = Path.GetExtension(files[i].FullName).Substring(1);
                        Console.WriteLine(fileExt);
                        if (!supportedTypes.Contains(fileExt))
                        {
                            Emp.Database.ExecuteSqlCommand("call insert_auto_import_log('Invalid File Found and Moved')");
                            files[i].MoveTo(invalidUrl+files[i].Name);
                            continue;
                        }
                        var file = files[i].Open(FileMode.Open, FileAccess.Read);
                        var reader = ExcelReaderFactory.CreateReader(file, new ExcelReaderConfiguration() { FallbackEncoding = Encoding.GetEncoding(1252) });
                        //Skips to Row 5

                        reader.Read();
                        reader.Read();
                        reader.Read();
                        reader.Read();
                        reader.Read();

                        int totalRows = reader.RowCount - 5;
                        string dateString = reader.GetString(0);
                        if (dateString == "Date")
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    var status = reader.GetString(0);

                                    if (string.IsNullOrEmpty(status)) break;
                                    var Date = reader.GetString(0);
                                    var Time = reader.GetString(1);
                                    var Cardid = reader.GetString(2);
                                    var Empid = reader.GetString(3);
                                    var EmpName = reader.GetString(4);
                                    var Department = reader.GetString(5);
                                    var Type = reader.GetString(6);
                                    var CID = reader.GetString(7);
                                    var Gate = reader.GetString(8);
                                    var InOut = reader.GetString(9);
                                    var Remark = reader.GetString(10);

                                    DateTime d = DateTime.ParseExact(Date, "dd/MM/yyyy", null);
                                    string date = d.Year.ToString() + "/" + d.Month.ToString() + "/" + d.Day.ToString();
                                    Console.WriteLine(date);
                                    Emp.Database.ExecuteSqlCommand("call import_to_swipe({0},{1},{2},{3},{4},{5},{6});", date, Time, Cardid, Empid, Gate, InOut, Remark);
                                }
                            } while (reader.NextResult());
                            Emp.Database.ExecuteSqlCommand("call insert_auto_import_log('File Imported')");
                            Console.WriteLine("File Imported");
                            file.Close();
                            files[i].MoveTo(processedUrl + files[i].Name);
                        }
                        else
                        {
                            Emp.Database.ExecuteSqlCommand("call insert_auto_import_log('Invalid File Found and Moved')");
                            file.Close();
                            files[i].MoveTo(invalidUrl + files[i].Name);
                        }
                    }
                }
                else
                {
                    Console.WriteLine("No FIle Found");
                    Emp.Database.ExecuteSqlCommand("call insert_auto_import_log('No File Exist')");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Emp.Database.ExecuteSqlCommand("call insert_auto_import_log({0})", e.GetType().ToString().Substring(0, 25));
            }
        }
        public string getCronString()
        {
            try
            {
                string cronString=Emp.Config.FromSql("call get_config('auto_import_cron')").FirstOrDefault().value;
                Console.WriteLine(cronString);
                return cronString;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);return null;
            }

        }
    }
}
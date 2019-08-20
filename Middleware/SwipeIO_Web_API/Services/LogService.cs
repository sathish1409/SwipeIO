//using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExcelDataReader;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace SwipeIO_Web_API.Services
{

    public class LogService
    {
        public IConfiguration _config;
        public LogService(IConfiguration mdb)
        {
            _config = mdb;
        }

        public int Upload(Log[] log)
        {
            var isDone = 0;
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
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

        public int Regularize(RegularizeParameters regularizeParameters, int emp_id)
        {
            try {
                MyDbContext Emp = new MyDbContext(_config);
                var today = DateTime.Parse(regularizeParameters.Date);
                int gate_id = 1;
                DateTime tomo = today.AddDays(1);
                RefinedLog[] data = Emp.RefinedLog.FromSql("call get_swipe_log_ref({0},{1},{2},{3});", regularizeParameters.emp_id, today, tomo, gate_id).ToArray();
                TimeSpan lastTime = data[data.Length - 1].time_log;
                Console.WriteLine(lastTime);
                TimeSpan addHours = TimeSpan.Parse(regularizeParameters.AddHours);
                TimeSpan inTime = lastTime.Add(new TimeSpan(0, 0, 5));
                TimeSpan outTime = lastTime.Add(addHours);
                String OutDateStr = "";
                String InDateStr = data[data.Length - 1].date_log.Year + "/" + data[data.Length - 1].date_log.Month + "/" + data[data.Length - 1].date_log.Day;
                DateTime insertDate = new DateTime();
                if (TimeSpan.Compare(outTime, new TimeSpan(23, 59, 59)) > 0)
                {
                    insertDate = data[data.Length - 1].date_log.AddDays(1);
                    OutDateStr = insertDate.Year + "/" + insertDate.Month + "/" + insertDate.Day;
                }
                else
                {
                    insertDate = data[data.Length - 1].date_log;
                    OutDateStr = insertDate.Year + "/" + insertDate.Month + "/" + insertDate.Day;
                }
                Console.WriteLine(OutDateStr + InDateStr);
                Emp.Database.ExecuteSqlCommand("call insert_log({0},{1},{2},{3},{4},{5},{6},{7});", InDateStr, inTime, 1, regularizeParameters.emp_id, 1, regularizeParameters.card_id, regularizeParameters.regularized_reason_id, emp_id);
                int Done = Emp.Database.ExecuteSqlCommand("call insert_log({0},{1},{2},{3},{4},{5},{6},{7});", OutDateStr, outTime, 0, regularizeParameters.emp_id, 1, regularizeParameters.card_id, regularizeParameters.regularized_reason_id, emp_id);
                return Done;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                return 0;
            }
                

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
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
                Console.WriteLine("Auto Import Called");
                Emp.Database.ExecuteSqlCommand("call insert_auto_import_log('Auto Import Call')");
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
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
                MyDbContext Emp = new MyDbContext(_config);
                Console.WriteLine(e);
                Emp.Database.ExecuteSqlCommand("call insert_auto_import_log({0})", e.GetType().ToString().Substring(0, 25));
            }
        }
        public string getCronString()
        {
            try
            {
                MyDbContext Emp = new MyDbContext(_config);
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
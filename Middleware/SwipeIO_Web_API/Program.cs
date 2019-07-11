using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Hangfire;
using Hangfire.MySql.Core;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SwipeIO_Web_API.Services;

namespace SwipeIO_Web_API {
    public class Program {
        public static void Main (string[] args) {

            GlobalConfiguration.Configuration.UseStorage (
                new MySqlStorage ("server=localhost;uid=root;pwd=123456;database=HangfireTest;Allow User Variables=True"));

            BackgroundJob.Enqueue (() => Console.WriteLine ("Starting API and Auto Import...\n"));

            using (var server = new BackgroundJobServer ()) {
                RecurringJob.AddOrUpdate ("autoimport", () => autoImport (), getCronString ());
                BuildWebHost (args).Run ();
                Console.ReadLine ();
            }
        }

        public static void autoImport () {
            LogService l = new LogService ();
            l.AutoImport ();
        }
        public static string getCronString () {
            LogService l = new LogService ();
            return l.getCronString ();
        }

        public static IWebHost BuildWebHost (string[] args) =>
            WebHost.CreateDefaultBuilder (args)
            .UseStartup<Startup> ()
            .UseUrls ("http://localhost:4000")
            .Build ();
    }
}
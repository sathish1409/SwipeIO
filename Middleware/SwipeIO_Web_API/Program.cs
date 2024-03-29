﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Hangfire;
using Hangfire.MySql.Core;
using Hangfire.Storage;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SwipeIO_Web_API.Services;

namespace SwipeIO_Web_API {
    public class Program {
        public static void Main (string[] args) {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost (string[] args) =>
            WebHost.CreateDefaultBuilder (args)
            .UseStartup<Startup> ()
            .UseUrls ("http://localhost:4000")
            .Build ();
    }
}
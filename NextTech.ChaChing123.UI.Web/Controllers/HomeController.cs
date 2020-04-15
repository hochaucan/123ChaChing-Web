using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Dynamic;
using NextTech.ChaChing123.UI.Web.Models;

namespace NextTech.ChaChing123.UI.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            // get virtual directory
            string __virtualDirectory = System.Configuration.ConfigurationManager.AppSettings["virtualDirectory"];
            ViewBag.__virtualDirectory = __virtualDirectory;

            return View();
        }
    }
}
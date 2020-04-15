using NextTech.ChaChing123.UI.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NextTech.ChaChing123.UI.Web.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Admin/Home
        public ActionResult Index()
        {
            // get virtual directory
            string __virtualDirectory = System.Configuration.ConfigurationManager.AppSettings["virtualDirectory"];
            ViewBag.__virtualDirectory = __virtualDirectory;
            
            return View();
        }
    }
}
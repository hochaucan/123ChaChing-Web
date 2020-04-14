using Newtonsoft.Json;
using NextTech.ChaChing123.UI.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NextTech.ChaChing123.UI.Web.Controllers
{
    [RoutePrefix("api/dashboardmobile")]
    public class DashboardMobileController : ApiController
    {
        public DashboardMobileController()
        {

        }

        [AllowAnonymous]
        [Route("getall")]
        [HttpPost]
        public object Get()
        {
            string allText = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeMobileCategoryContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(allText);
            return jsonObject;
        }

        [AllowAnonymous]
        [Route("getdocumentcontentbyid")]
        [HttpPost]
        public object GetDocumentContentById(HomeInOneCategoryContentModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeMobileCategoryContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomeInOneCategoryContentModel>>(allText)
                                  ?? new List<HomeInOneCategoryContentModel>();

            // Delete entity from 
            var item = contentList.SingleOrDefault(i => i.ID == entity.ID);

            string jsonData = JsonConvert.SerializeObject(item);

            object jsonObject = JsonConvert.DeserializeObject(jsonData);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("add")]
        [HttpPost]
        public object Add(HomeInOneCategoryContentModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeMobileCategoryContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomeInOneCategoryContentModel>>(allText)
                                  ?? new List<HomeInOneCategoryContentModel>();
            Guid obj = Guid.NewGuid();

            contentList.Add(new HomeInOneCategoryContentModel()
            {
                ID = obj.ToString(),
                Content = entity.Content,
                ImagePath = entity.ImagePath,
                CategoryID = entity.CategoryID
            });

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeMobileCategoryContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("update")]
        [HttpPost]
        public object update(HomeInOneCategoryContentModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeMobileCategoryContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomeInOneCategoryContentModel>>(allText)
                                  ?? new List<HomeInOneCategoryContentModel>();

            if (!string.IsNullOrEmpty(entity.Content))
                contentList.FirstOrDefault(i => i.ID == entity.ID).Content = entity.Content;

            if (!string.IsNullOrEmpty(entity.ImagePath))
                contentList.FirstOrDefault(i => i.ID == entity.ID).ImagePath = entity.ImagePath;

            if (!string.IsNullOrEmpty(entity.CategoryID))
                contentList.FirstOrDefault(i => i.ID == entity.ID).CategoryID = entity.CategoryID;

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeMobileCategoryContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("deletecontent")]
        [HttpPost]
        public object Delete(HomeInOneCategoryContentModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeMobileCategoryContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomeInOneCategoryContentModel>>(allText)
                                  ?? new List<HomeInOneCategoryContentModel>();

            // Delete entity from 
            var item = contentList.SingleOrDefault(i => i.ID == entity.ID);
            if (item != null)
            {
                contentList.Remove(item);
            }

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeMobileCategoryContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }
    }
}

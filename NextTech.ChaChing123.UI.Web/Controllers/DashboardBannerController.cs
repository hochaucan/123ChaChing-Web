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
    [RoutePrefix("api/dashboardbanner")]
    public class DashboardBannerController : ApiController
    {
        public DashboardBannerController()
        {

        }

        [AllowAnonymous]
        [Route("getall")]
        [HttpPost]
        public object Get()
        {
            string allText = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeBannerCategoryContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(allText);
            return jsonObject;
        }

        [AllowAnonymous]
        [Route("getdocumentcontentbyid")]
        [HttpPost]
        public object GetDocumentContentById(HomeBannerCategoryContentModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeBannerCategoryContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomeBannerCategoryContentModel>>(allText)
                                  ?? new List<HomeBannerCategoryContentModel>();

            // Delete entity from 
            var item = contentList.SingleOrDefault(i => i.ID == entity.ID);

            string jsonData = JsonConvert.SerializeObject(item);

            object jsonObject = JsonConvert.DeserializeObject(jsonData);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("add")]
        [HttpPost]
        public object Add(HomeBannerCategoryContentModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeBannerCategoryContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomeBannerCategoryContentModel>>(allText)
                                  ?? new List<HomeBannerCategoryContentModel>();
            Guid obj = Guid.NewGuid();

            contentList.Add(new HomeBannerCategoryContentModel()
            {
                ID = obj.ToString(),
                Title = entity.Title,
                Content = entity.Content,
                ImagePath = entity.ImagePath,
                CategoryID = entity.CategoryID
            });

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeBannerCategoryContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("update")]
        [HttpPost]
        public object update(HomeBannerCategoryContentModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeBannerCategoryContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomeBannerCategoryContentModel>>(allText)
                                  ?? new List<HomeBannerCategoryContentModel>();

            if(!string.IsNullOrEmpty(entity.Title))
                contentList.FirstOrDefault(i => i.ID == entity.ID).Title = entity.Title;

            if (!string.IsNullOrEmpty(entity.Content))
                contentList.FirstOrDefault(i => i.ID == entity.ID).Content = entity.Content;

            if (!string.IsNullOrEmpty(entity.ImagePath))
                contentList.FirstOrDefault(i => i.ID == entity.ID).ImagePath = entity.ImagePath;

            if (!string.IsNullOrEmpty(entity.CategoryID))
                contentList.FirstOrDefault(i => i.ID == entity.ID).CategoryID = entity.CategoryID;

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeBannerCategoryContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("deletecontent")]
        [HttpPost]
        public object Delete(HomeBannerCategoryContentModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeBannerCategoryContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomeBannerCategoryContentModel>>(allText)
                                  ?? new List<HomeBannerCategoryContentModel>();

            // Delete entity from 
            var item = contentList.SingleOrDefault(i => i.ID == entity.ID);
            if (item != null)
            {
                contentList.Remove(item);
            }

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homeBannerCategoryContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }
    }
}

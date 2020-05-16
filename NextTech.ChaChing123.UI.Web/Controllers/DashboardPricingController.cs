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
    [RoutePrefix("api/dashboardpricing")]
    public class DashboardPricingController : ApiController
    {
        public DashboardPricingController()
        {

        }

        [AllowAnonymous]
        [Route("getall")]
        [HttpPost]
        public object Get()
        {
            string allText = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homePricingContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(allText);
            return jsonObject;
        }

        [AllowAnonymous]
        [Route("getdocumentcontentbyid")]
        [HttpPost]
        public object GetDocumentContentById(HomePricingModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homePricingContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomePricingModel>>(allText)
                                  ?? new List<HomePricingModel>();

            // Delete entity from 
            var item = contentList.SingleOrDefault(i => i.ID == entity.ID);

            string jsonData = JsonConvert.SerializeObject(item);

            object jsonObject = JsonConvert.DeserializeObject(jsonData);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("add")]
        [HttpPost]
        public object Add(HomePricingModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homePricingContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomePricingModel>>(allText)
                                  ?? new List<HomePricingModel>();
            Guid obj = Guid.NewGuid();

            contentList.Add(new HomePricingModel()
            {
                ID = obj.ToString(),
                Title = entity.Title,
                BriefTitle = entity.BriefTitle,
                Price = entity.Price,
                Content = entity.Content,
            });

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homePricingContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("update")]
        [HttpPost]
        public object update(HomePricingModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homePricingContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomePricingModel>>(allText)
                                  ?? new List<HomePricingModel>();

            if (!string.IsNullOrEmpty(entity.Title))
                contentList.FirstOrDefault(i => i.ID == entity.ID).Title = entity.Title;

            if (!string.IsNullOrEmpty(entity.BriefTitle))
                contentList.FirstOrDefault(i => i.ID == entity.ID).BriefTitle = entity.BriefTitle;

            if (!string.IsNullOrEmpty(entity.Price))
                contentList.FirstOrDefault(i => i.ID == entity.ID).Price = entity.Price;

            if (!string.IsNullOrEmpty(entity.Content))
                contentList.FirstOrDefault(i => i.ID == entity.ID).Content = entity.Content;

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homePricingContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }

        [AllowAnonymous]
        [Route("deletecontent")]
        [HttpPost]
        public object Delete(HomePricingModel entity)
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homePricingContent.json");

            //read fille
            string allText = System.IO.File.ReadAllText(filePath);

            // De-serialize to object or create new list
            var contentList = JsonConvert.DeserializeObject<List<HomePricingModel>>(allText)
                                  ?? new List<HomePricingModel>();

            // Delete entity from 
            var item = contentList.FirstOrDefault(i => i.ID == entity.ID);
            if (item != null)
            {
                contentList.Remove(item);
            }

            string jsonData = JsonConvert.SerializeObject(contentList);

            System.IO.File.WriteAllText(filePath, jsonData);

            string data = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/App_Data/homePricingContent.json"));

            object jsonObject = JsonConvert.DeserializeObject(data);

            return jsonObject;
        }
    }
}

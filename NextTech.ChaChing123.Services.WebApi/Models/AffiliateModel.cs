using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NextTech.ChaChing123.Services.WebApi.Models
{
    public class AffiliateModel
    {
        public string UserName { get; set; }

        public string SessionKey { get; set; }

        public int PageNo { get; set; }

        public int PageSize { get; set; }
    }
}
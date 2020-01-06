using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NextTech.ChaChing123.UI.Web.Models
{
    public class UserProfileModel
    {
        public List<string> authorizePermission { get; set; }
        public virtual UserLoginModel user { get; set; }
        public int operationUnit { get; set; }
    }
}

using NextTech.ChaChing123.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace NextTech.ChaChing123.Business.Utilities
{
    public class MembershipContext
    {
        public IPrincipal Principal { get; set; }
        public Account Account { get; set; }
        public bool IsValid()
        {
            return Principal != null;
        }
    }
}

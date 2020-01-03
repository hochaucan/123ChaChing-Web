using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NextTech.ChaChing123.Core.Utilities.Security
{
    public class DB
    {
        public static string SafeSQL(string value)
        {
            if (!string.IsNullOrEmpty(value))
                return value.Replace("'", "''");
            else
                return "";
        }
    }
}

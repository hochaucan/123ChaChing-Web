using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NextTech.ChaChing123.Core.Utilities
{
    public class ApplicationManager
    {
        /// <summary>
        /// Write the AuditLog to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="auditLog">auditLog to be writen</param>
        /// <returns>void</returns>
        public static string GetApplicationID()
        {
            return NextTech.ChaChing123.Core.Utilities.Configuration.AppSettings.GetAppSettings("ApplicationID");
        }
    }

}
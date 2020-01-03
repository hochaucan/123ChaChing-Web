using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace NextTech.ChaChing123.Core.Utilities.Configuration
{
    public class AppSettings
    {

        /// <summary>
        /// Get AppSettings from web.config file
        /// </summary>
        /// <param name="value">key in the appSettings</param>
        /// <returns>An string with the value</returns>
        public static string GetAppSettings(string key)
        {
            string result = string.Empty;

            try
            {
                result = ConfigurationManager.AppSettings[key];
            }
            catch (Exception ex) {

                NextTech.ChaChing123.Core.Logging.Logger.LogError("UT001: Error at GetAppSettings. Exception Message: " + ex.Message);
                return "";
            }
            return result;

        }
    }
}

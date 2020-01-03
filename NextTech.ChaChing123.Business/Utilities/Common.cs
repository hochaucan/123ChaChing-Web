using System.Collections.Generic;
using System.Configuration;

using NextTech.ChaChing123.Common.Constants;
using NextTech.ChaChing123.Common.Models;
using Resource = NextTech.ChaChing123.Common.Resources.Resource;

namespace NextTech.ChaChing123.Business.Utilities
{
    using System;
    using NextTech.ChaChing123.Data.Extensions;

    /// <summary>
    /// Class Common.
    /// </summary>
    /// <seealso cref="BTMU.APF.Utilities.BaseUtilities" />
    public class Common
    {
        /// <summary>
        /// Checks the login.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="sessionKey">The session key.</param>
        /// <returns>System.Int32.</returns>
        public static int CheckLogin(string userName, string sessionKey)
        {
            if (GetConfigValue("CheckLogin") != "0")
            {
                if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(sessionKey))
                {
                    return ConvertErrorCodeToInt(RetCode.ECS0002);
                }

                try
                {
                    CommonExtensions common = new CommonExtensions();
                    return common.CheckLogin(userName, sessionKey);
                }
                catch (Exception ex)
                {
                    Logger.LogError("Method WriteLog:" + ex.Message);
                    return ConvertErrorCodeToInt(RetCode.ECS0001);
                }
                //TODO: return ConvertErrorCodeToInt(RetCode.ECS0019);
            }
            else
            {
                return ConvertErrorCodeToInt(RetCode.ECS0000);
            }
            
        }

        /// <summary>
        /// Converts the error code to int.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>System.Int32.</returns>
        public static int ConvertErrorCodeToInt(RetCode value)
        {
            var retCode = -1;
            retCode = (int)Enum.Parse(typeof(RetCode), Enum.GetName(typeof(RetCode), value));
            return retCode;
        }

        /// <summary>
        /// Gets all resource.
        /// </summary>
        /// <returns>List&lt;ResourceModel&gt;.</returns>
        public static List<ResourceModel> GetAllResource()
        {
            CommonExtensions common = new CommonExtensions();
            return common.GetAllResource();
        }

        /// <summary>
        /// Gets the configuration value.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns>System.String.</returns>
        public static string GetConfigValue(string key)
        {
            System.Configuration.AppSettingsReader settingsReader =
                new AppSettingsReader();
            //Get your key from config file to open the lock!
            string keyValue = (string)settingsReader.GetValue(key,
                typeof(string));

            return keyValue;
        }

        public static int IsExitsUserByUserName(string userName)
        {
            try
            {
                CommonExtensions common = new CommonExtensions();
                return common.IsExitsUserByUserName(userName);
            }
            catch (Exception ex)
            {
                Logger.LogError("Method WriteLog:" + ex.Message);
            }

            return ConvertErrorCodeToInt(RetCode.ECS0019);
        }

        public static bool VerifykAccessWithRoot(string userId,string sessionKey)
        {
            if(CheckLogin(userId, sessionKey) != 0|| (GetConfigValue("RootId") != userId && GetConfigValue("IsCheckRoleRoot") == "1")) 
            {
                return false;
            }
            return true;
        }

        public static bool IsValidEmail(string email)
        {
            try
            {
                CommonExtensions common = new CommonExtensions();
                return common.IsValidEmail(email);
            }
            catch (Exception ex)
            {
                Logger.LogError("Method IsValidEmail WriteLog:" + ex.Message);
            }

            return false;
        }

    }
}

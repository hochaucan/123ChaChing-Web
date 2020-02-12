using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using NextTech.ChaChing123.Common.Models;

namespace NextTech.ChaChing123.Data.Extensions
{
    using Entities;
    

    /// <summary>
    /// Class CommonExtensions.
    /// </summary>
    public class CommonExtensions
    {
        /// <summary>
        /// Checks the login.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="sessionKey">The session key.</param>
        /// <returns>System.Int32.</returns>
        public ResultDTO CheckLogin(string sessionKey)
        {
            var result = new ResultDTO();
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("errorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            result.Details = dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_CheckLogin] @SessionKey, @errorCode out",
                new SqlParameter("SessionKey", sessionKey),
                errorCode);

            result.StatusCode = int.Parse(errorCode.Value.ToString(), 0);
            result.SetContentMsg();

            return result;
        }

        /// <summary>
        /// Gets all resource.
        /// </summary>
        /// <returns>List&lt;ResourceModel&gt;.</returns>
        public List<ResourceModel> GetAllResource()
        {
            var dbContext = new ApplicationContext();
            var itemList = new List<ResourceModel>();
            itemList.AddRange(dbContext.Database.SqlQuery<ResourceModel>("SELECT [Key],[Description] FROM [dbo].[Resource]").ToList());

            return itemList;
        }


        /// <summary>
        /// Determines whether [is exits user by user name] [the specified user name].
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns>System.Int32.</returns>
        public int IsExitsUserByUserName(string userName)
        {
            var dbContext = new ApplicationContext();

            var errorCode = new SqlParameter("errorCode", System.Data.SqlDbType.Int)
            {
                Direction = System.Data.ParameterDirection.Output
            };

            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[FO_Account_IsExitsUserByUserName] @UserName, @errorCode out",
                new SqlParameter("UserName", userName),
                errorCode);

            return int.Parse(errorCode.Value.ToString(), 0);
        }
        public  bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}


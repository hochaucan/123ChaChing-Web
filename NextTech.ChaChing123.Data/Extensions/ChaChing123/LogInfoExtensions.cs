namespace NextTech.ChaChing123.Data.Extensions
{
    using Entities;
    using NextTech.ChaChing123.Core.Utilities.Security;
    using System.Data.SqlClient;

    public class LogInfoExtensions
    {
        /// <summary>
        /// Writes the log.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool WriteLog(LogInfo obj)
        {
            ApplicationContext dbContext;
            dbContext = new ApplicationContext();
            
            dbContext.Database.ExecuteSqlCommand("EXEC [dbo].[sp_AddLogInfo] @OurReference,@Remarks,@UserAction,@CreatedBy,@CreatedDate",
                        new SqlParameter("OurReference", DB.SafeSQL(obj.OurReference)),
                        new SqlParameter("Remarks", DB.SafeSQL(obj.Remarks)),
                        new SqlParameter("UserAction", DB.SafeSQL(obj.UserAction)),
                        new SqlParameter("CreatedBy", DB.SafeSQL(obj.CreatedBy) ),
                        new SqlParameter("CreatedDate", obj.CreatedDate));
            return true;
        }
    }
}


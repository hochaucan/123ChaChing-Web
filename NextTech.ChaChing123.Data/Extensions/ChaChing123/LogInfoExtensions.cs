namespace NextTech.ChaChing123.Data.Extensions
{
    using Entities;
    

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

            var sqlSting = "INSERT INTO[dbo].[LogInfo]([UserID],[UserAction],[OurReference],[Remarks],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate])VALUES("
                                + "'" + obj.UserID + "'"
                                + ",'" + obj.UserAction + "'"
                                + ",'" + obj.OurReference + "'"
                                + ",'" + obj.Remarks + "'"
                                + ",'system'"
                                + ",'" + obj.CreatedDate + "'"
                                + ",'system'"
                                + ",'" + obj.UpdatedDate + "')";

            dbContext.Database.ExecuteSqlCommand(sqlSting);

            return true;
        }
    }
}


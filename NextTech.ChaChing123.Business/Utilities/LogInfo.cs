using Microsoft.Practices.EnterpriseLibrary.Logging;

using System.Diagnostics;

namespace NextTech.ChaChing123.Business.Utilities
{
    using Entities;
    using System;
    using NextTech.ChaChing123.Data.Extensions;

    /// <summary>
    /// Class AppLog.
    /// </summary>
    /// <seealso cref="BTMU.APF.Utilities.BaseUtilities" />
    public class AppLog
    {
        /// <summary>
        /// Writes the log.
        /// </summary>
        /// <param name="ourReference">Our reference.</param>
        /// <param name="userAction">The user action.</param>
        /// <param name="remarks">The remarks.</param>
        public static void WriteLog(string ourReference, string userAction, string remarks,string SessionKey)
        {
            try {
                // property
                //-- var userID = NextTech.ChaChing123.Utilities.User.GetUserID();
                var userID = 1;// For testing
                //Log info
                Logger.LogInformation(ourReference + "_" + SessionKey+ "_" + userAction + "_" + DateTime.Now + " remarks:" + remarks);

                //Log DB
                NextTech.ChaChing123.Entities.LogInfo obj = new NextTech.ChaChing123.Entities.LogInfo();
                obj.OurReference = ourReference;
                obj.Remarks = remarks;
                obj.UserAction = userAction;
                obj.CreatedBy = SessionKey;
                obj.CreatedDate = DateTime.Now;
                AddAudit(obj);
            }
            catch (Exception ex)
            {
                Logger.LogError("Method WriteLog:" + ex.Message);
            }
        }
        /// <summary>
        /// Adds the audit.
        /// </summary>
        /// <param name="obj">The object.</param>
        private static void AddAudit(LogInfo obj)
        {
            LogInfoExtensions SysAudit = new LogInfoExtensions();
            SysAudit.WriteLog(obj);
        }

    }

    public class Logger
    {
        private static void Loggers(LogEntry message)
        {
            var factory = new LogWriterFactory();
            using (var logwriter = factory.Create())
            {
                logwriter.Write(message);
            }
        }
        
        /// <summary>
        /// Write the message to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="message">message to be writen</param>
        /// <returns>void</returns>
        public static void Write(string message, string traceEventType)
        {
            // Log the event
            LogEntry log = new LogEntry();
            log.EventId = 1;
            log.Message = message;
            log.Categories.Add(traceEventType);
            Loggers(log);
        }

        /// <summary>
        /// Write the message to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="message">message to be writen</param>
        /// <returns>void</returns>
        public static void Write(string message, string traceEventType, int eventId)
        {
            // Log the event
            LogEntry log = new LogEntry();
            log.EventId = eventId;
            log.Message = message;
            log.Categories.Add(traceEventType);
            Loggers(log);

        }

        /// <summary>
        /// Write the message to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="message">message to be writen</param>
        /// <returns>void</returns>
        public static void LogInformation(string message, int? eventID = 1)
        {
            // Log the event
            LogEntry log = new LogEntry();
            log.EventId = (int)eventID;
            log.Message = message;
            log.Categories.Add("INFORMATION");
            Loggers(log);
        }

        /// <summary>
        /// Write the message to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="message">message to be writen</param>
        /// <returns>void</returns>
        public static void LogVerbose(string message, int? eventID = 1)
        {
            // Log the event
            LogEntry log = new LogEntry();
            log.EventId = (int)eventID;
            log.Message = message;
            log.Categories.Add("VERBOSE");
            Loggers(log);
        }

        /// <summary>
        /// Write the message to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="message">message to be writen</param>
        /// <returns>void</returns>
        public static void LogWarning(string message, int? eventID = 1)
        {
            // Log the event
            LogEntry log = new LogEntry();
            log.EventId = (int)eventID;
            log.Message = message;
            log.Categories.Add("WARNING");
            Loggers(log);
        }

        /// <summary>
        /// Write the message to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="message">message to be writen</param>
        /// <returns>void</returns>
        public static void LogError(string message, int? eventID = 1)
        {
            // Log the event
            LogEntry log = new LogEntry();
            log.EventId = (int)eventID;
            log.Message = message; //  "Product page has been loaded";
            log.Categories.Add("ERROR");
            Loggers(log);
        }
    }
}

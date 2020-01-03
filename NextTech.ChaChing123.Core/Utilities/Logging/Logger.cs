using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Practices.EnterpriseLibrary.Logging;

using NextTech.ChaChing123.Core.Models;

namespace NextTech.ChaChing123.Core.Logging
{
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
        /// Write the AuditLog to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="auditLog">auditLog to be writen</param>
        /// <returns>void</returns>
        public static void WriteActivityLog(UserActivityLog userActivityLog)
        {
            // Log the event - default to error category
            LogEntry log = new LogEntry();
            log.EventId = 1;
            log.Message = userActivityLog.ToString();
            log.Categories.Add(TraceEventType.INFORMATION);
            Loggers(log);
        }

        /// <summary>
        /// Write the AuditLog to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="auditLog">auditLog to be writen</param>
        /// <returns>void</returns>
        public static void WriteAuditLog(AuditLog auditLog)
        {
            // Log the event - default to error category
            LogEntry log = new LogEntry();
            log.EventId = 1;
            log.Message = auditLog.ToString();
            log.Categories.Add(TraceEventType.INFORMATION);
            Loggers(log);
        }

        /// <summary>
        /// Write the AuditLog to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="transactionLog">transactionLog to be writen</param>
        /// <returns>void</returns>
        public static void WriteTransactionLog(TransactionLog transactionLog)
        {
            // Log the event - default to error category
            LogEntry log = new LogEntry();
            log.EventId = 1;
            log.Message = transactionLog.ToString();
            log.Categories.Add(TraceEventType.INFORMATION);
            Loggers(log);
        }

        /// <summary>
        /// Write the message to the log file with EnterpriseLibrary
        /// </summary>
        /// <param name="message">message to be writen</param>
        /// <returns>void</returns>
        public static void Write(string message)
        {
            // Log the event - default to error category
            LogEntry log = new LogEntry();
            log.EventId = 1;
            log.Message = message;
            log.Categories.Add(TraceEventType.INFORMATION);
            Loggers(log);
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
            log.Categories.Add(TraceEventType.INFORMATION);
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
            log.Categories.Add(TraceEventType.VERBOSE);
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
            log.Categories.Add(TraceEventType.WARNING);
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
            log.Categories.Add(TraceEventType.ERROR);
            Loggers(log);
        }
    }
}

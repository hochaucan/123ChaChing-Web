using NextTech.ChaChing123.Common.Constants;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace NextTech.ChaChing123.Common.Utilities
{
    /// <summary>
    /// Class Common.
    /// </summary>
    public class Common
    {
        /// <summary>
        /// Gets the error code resource.
        /// </summary>
        /// <param name="errorCode">The error code.</param>
        /// <returns>System.String.</returns>
        public static string GetErrorCodeResource(RetCode errorCode)
        {
            string rs = string.Empty;
            switch (errorCode)
            {
                case RetCode.ECS0001:
                    rs = Resources.Resource.E0001;
                    break;
            }

            return rs;
        }

        /// <summary>
        /// Calculates the MD5 of a given string.
        /// </summary>
        /// <param name="inputString">The input string.</param>
        /// <returns>The (hexadecimal) string representatation of the MD5 hash.</returns>
        public static string StringToMD5Hash(string inputString)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] encryptedBytes = md5.ComputeHash(Encoding.ASCII.GetBytes(inputString));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < encryptedBytes.Length; i++)
            {
                sb.AppendFormat("{0:x2}", encryptedBytes[i]);
            }
            return sb.ToString();
        }


        public static bool SendMail(string emailAddress, string body, string subject)
        {
            string excep = string.Empty;
            bool ret = true;
            try
            {
                MailUtil.SEND_ASYNCHRONOUS = true;
                MailUtil.ENABLE_SSL = true;
                MailUtil.DISPLAY_NAME = Common.GetConfigValue("DisplayName");
                string mailfrom = Common.GetConfigValue("MailFrom");
                string smtpSubject = subject;
                string smtpServer = Common.GetConfigValue("SMTPServer");
                string smtpUid = Common.GetConfigValue("SMTPUid");
                string smtpPwd = Common.GetConfigValue("SMTPPwd");
                int smtpPort = int.Parse(Common.GetConfigValue("SMTPPort"));

                MailUtil.sendMail(
                    mailfrom,
                    emailAddress,
                    string.Empty,
                    string.Empty,
                    smtpSubject,
                    body,
                    null,
                    smtpServer,
                    smtpUid,
                    smtpPwd,
                    smtpPort,
                    MailPriority.Normal,
                    Encoding.UTF8,
                    true);
            }
            catch (Exception ex)
            {
                //Logger.Error("Sendmail: EXCEPTION, ex = " + ex.ToString() + ", subject = " + subject + ", content = " + body + ", email to = " + emailAddress);
                ret = false;
                excep = ex.Message;
            }

            // Email log
         
            return ret;

        }

        public static void SendMailOlala(string recipient, string subject, string message)
        {
            string _sender = Common.GetConfigValue("SMTPUid"); 
            string _password = Common.GetConfigValue("SMTPPwd"); 
            SmtpClient client = new SmtpClient(Common.GetConfigValue("SMTPServer"));

            client.Port = int.Parse(Common.GetConfigValue("SMTPPort"));
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential(_sender, _password);
            client.EnableSsl = true;
            client.Credentials = credentials;

            try
            {
                var mail = new MailMessage(_sender.Trim(), recipient.Trim());
                mail.Subject = subject;
                mail.Body = message;
                client.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }

        public static string GetConfigValue(string key)
        {
            System.Configuration.AppSettingsReader settingsReader =
                new AppSettingsReader();
            //Get your key from config file to open the lock!
            string keyValue = (string)settingsReader.GetValue(key,
                typeof(string));

            return keyValue;
        }

    }

}

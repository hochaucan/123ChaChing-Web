using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Mail;
using System.Net;
using System.IO;

namespace NextTech.ChaChing123.Common.Utilities
{
    /// <summary>
    /// Delegate SendMailErrorHandler
    /// </summary>
    /// <param name="ex">The ex.</param>
    public delegate void SendMailErrorHandler(Exception ex);

    /// <summary>
    /// Class MailUtil.
    /// </summary>
    [Serializable]
    public class MailUtil
    {
        /// <summary>
        /// Occurs when [send mail error event].
        /// </summary>
        public static event SendMailErrorHandler SendMailErrorEvent;
        /// <summary>
        /// The enable SSL
        /// </summary>
        public static bool ENABLE_SSL = false;
        /// <summary>
        /// The send asynchronous
        /// </summary>
        public static bool SEND_ASYNCHRONOUS = false;
        /// <summary>
        /// The display name
        /// </summary>
        public static string DISPLAY_NAME = string.Empty;

        /*
		 * Writing email to the IIS Server's SMTP service pickup directory is 
		 * another new feature of System.Net.Mail. 
		 * The SMTP pickup directory is a special directory used by Microsoft's SMTP service to send email. 
		 * Any email files found in that directory are processed and delivered over SMTP. 
		 * If the delivery process fails, the files are stored in a queue directory for delivery at another time. 
		 * If a fatal error occurs (such as a DNS resolution error), 
		 * the files are moved to the Badmail directory.
		 * By writing to the pickup directory, this speeds up the process because the entire chatting SMTP 
		 * layer used for relaying is by passed. 
		 * Below is an example of how to write directly to the Pickup directory.
		 * */
        /// <summary>
        /// The pickup directory
        /// </summary>
        public static bool PICKUP_DIRECTORY = false;

        /// <summary>
        /// DEFAULT: PickupDirectoryFromIis
        /// </summary>
        public static SmtpDeliveryMethod DELIVERY_METHOD = SmtpDeliveryMethod.PickupDirectoryFromIis;

        /// <summary>
        /// DEFAULT: emty string
        /// </summary>
        public static string PICKUP_LOCATION = "";

        /// <summary>
        /// default is FALSE
        /// </summary>
        public static bool USE_DEFAULT_CREDENTIALS = false;

        /// <summary>
        /// Initializes a new instance of the <see cref="MailUtil"/> class.
        /// </summary>
        public MailUtil() { }

        /// <summary>
        /// System.Net.Mail does not natively support sending a web page.
        /// However, using the WebRequest class,
        /// you can screen scrape web pages,
        /// and pass the resulting Html string to the MailMessage object.
        /// The following example demonstrates this technique.
        /// </summary>
        /// <param name="MailFrom">The mail from.</param>
        /// <param name="MailTo">The mail to.</param>
        /// <param name="Cc">The cc.</param>
        /// <param name="Bcc">The BCC.</param>
        /// <param name="Subject">The subject.</param>
        /// <param name="webPageURL">The web page URL.</param>
        public static void sendWebPageAsMail(
            string MailFrom,            // e-mail address from
            string MailTo,              // e-mail address to
            string Cc,                  // e-mail address CC
            string Bcc,                 // e-mail address BCC

            string Subject,             // Subject
            string webPageURL           // send webpage
            )
        {

            WebRequest objRequest = System.Net.HttpWebRequest.Create(webPageURL);
            StreamReader sr = new StreamReader(objRequest.GetResponse().GetResponseStream());
            string Body = sr.ReadToEnd();
            sr.Close();
            //MailUtil.
            MailUtil.sendMail(
                MailFrom,
                MailTo,
                Cc,
                Bcc,
                Subject,
                Body,
                null,
                null,
                null,
                null,
                25,
                MailPriority.Normal,
                Encoding.UTF8,
                true);
        }


        /// <summary>
        /// send normal mail
        /// </summary>
        /// <param name="MailFrom">The mail from.</param>
        /// <param name="MailTo">The mail to.</param>
        /// <param name="Cc">The cc.</param>
        /// <param name="Bcc">The BCC.</param>
        /// <param name="Subject">The subject.</param>
        /// <param name="Body">The body.</param>
        public static void sendPlainTextMail(
            string MailFrom,            // e-mail address from
            string MailTo,              // e-mail address to
            string Cc,                  // e-mail address CC
            string Bcc,                 // e-mail address BCC

            string Subject,             // Subject
            string Body                 // Body
            )
        {
            MailUtil.sendMail(
                MailFrom,
                MailTo,
                Cc,
                Bcc,
                Subject,
                Body,
                null,
                null,
                null,
                null,
                25,
                MailPriority.Normal,
                Encoding.UTF8,
                false);
        }

        ///// <summary>
        ///// Send mail with all details
        ///// </summary>
        ///// <param name="MailFrom"></param>
        ///// <param name="MailTo"></param>
        ///// <param name="Cc"></param>
        ///// <param name="Bcc"></param>
        ///// <param name="Subject"></param>
        ///// <param name="Body"></param>
        ///// <param name="fileAttachmentPath"></param>
        ///// <param name="SMTPServer">if not specifies, use default in web.config</param>		
        ///// <param name="SMTPUsername">if not specifies, use default in web.config</param>
        ///// <param name="SMTPPassword">if not specifies, use default in web.config</param>
        ///// <param name="priority"></param>
        ///// <param name="BodyEncoding">Encoding.GetEncoding("iso-8859-1")</param>
        //public static void sendMail(

        //    string MailFrom,			// e-mail address from
        //    string MailTo,				// e-mail address to
        //    string Cc,					// e-mail address CC
        //    string Bcc,					// e-mail address BCC

        //    string Subject,				// Subject
        //    string Body,				// Body
        //    string fileAttachmentPath,	// attachment

        //    string SMTPServer,			// smtp									
        //    string SMTPUsername,		// smtpusername
        //    string SMTPPassword,		// smtppassword		
        //    int	SMTPPort,

        //    MailPriority priority,
        //    System.Text.Encoding BodyEncoding,
        //    bool isHtmlMail)
        //{

        //    MailMessage objMail = new MailMessage(MailFrom, MailTo, Subject, Body);
        //    //objMail.
        //    objMail.IsBodyHtml = isHtmlMail;

        //    if (!String.IsNullOrEmpty(Cc))
        //    {
        //        objMail.CC.Add(new MailAddress(Cc));
        //    }

        //    if (!String.IsNullOrEmpty(Bcc))
        //    {
        //        objMail.Bcc.Add(new MailAddress(Bcc));
        //    }

        //    // message			
        //    objMail.Priority = priority;

        //    if(!String.IsNullOrEmpty(Subject))
        //        objMail.Subject = Subject;

        //    if(BodyEncoding != null)
        //        objMail.BodyEncoding = BodyEncoding;

        //    if(!String.IsNullOrEmpty(Body))
        //        objMail.Body = Body;

        //    // attachment
        //    if (!String.IsNullOrEmpty(fileAttachmentPath))
        //    {
        //        objMail.Attachments.Add(new Attachment(fileAttachmentPath));
        //    }

        //    SmtpClient client = null;
        //    if (!String.IsNullOrEmpty(SMTPPassword) &&
        //        !String.IsNullOrEmpty(SMTPUsername) &&
        //        !String.IsNullOrEmpty(SMTPServer))
        //    {
        //        client = new SmtpClient(SMTPServer, SMTPPort);
        //        client.Credentials = new NetworkCredential(SMTPUsername, SMTPPassword);
        //    }
        //    else
        //    {
        //        client = new SmtpClient();
        //    }


        //    client.EnableSsl = ENABLE_SSL;

        //    if (PICKUP_DIRECTORY)
        //    {
        //        //client.PickupDirectoryLocation = PICKUP_LOCATION;
        //    }

        //    client.DeliveryMethod = DELIVERY_METHOD;
        //    client.UseDefaultCredentials = USE_DEFAULT_CREDENTIALS;

        //    if (!SEND_ASYNCHRONOUS)
        //    {
        //        client.Send(objMail);
        //    }
        //    else
        //    {
        //        //the userstate can be any object. The object can be accessed in the callback method
        //        //We should use our objMail for futher process !
        //        object userState = objMail;
        //        client.SendCompleted += new SendCompletedEventHandler(client_SendCompleted);				
        //        client.SendAsync(objMail, userState);
        //    }
        //}

        /// <summary>
        /// Send mail with all details
        /// </summary>
        /// <param name="MailFrom">The mail from.</param>
        /// <param name="MailTo">The mail to.</param>
        /// <param name="Cc">The cc.</param>
        /// <param name="Bcc">The BCC.</param>
        /// <param name="Subject">The subject.</param>
        /// <param name="Body">The body.</param>
        /// <param name="fileAttachmentPath">The file attachment path.</param>
        /// <param name="SMTPServer">if not specifies, use default in web.config</param>
        /// <param name="SMTPUsername">if not specifies, use default in web.config</param>
        /// <param name="SMTPPassword">if not specifies, use default in web.config</param>
        /// <param name="SMTPPort">The SMTP port.</param>
        /// <param name="priority">The priority.</param>
        /// <param name="BodyEncoding">Encoding.GetEncoding("iso-8859-1")</param>
        /// <param name="isHtmlMail">if set to <c>true</c> [is HTML mail].</param>
        public static void sendMail(

            string MailFrom,			// e-mail address from
            string MailTo,				// e-mail address to
            string Cc,					// e-mail address CC
            string Bcc,					// e-mail address BCC

            string Subject,				// Subject
            string Body,				// Body
            string fileAttachmentPath,	// attachment

            string SMTPServer,			// smtp									
            string SMTPUsername,		// smtpusername
            string SMTPPassword,		// smtppassword		
            int SMTPPort,

            MailPriority priority,
            System.Text.Encoding BodyEncoding,
            bool isHtmlMail)
        {
            MailMessage objMail = new MailMessage(new MailAddress(MailFrom, DISPLAY_NAME), new MailAddress(MailTo));
            objMail.Subject = Subject;
            objMail.Body = Body;
            objMail.IsBodyHtml = isHtmlMail;

            if (!String.IsNullOrEmpty(Cc))
            {
                string[] CCSplit = Cc.Split(new char[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string item in CCSplit)
                {
                    objMail.CC.Add(new MailAddress(item));
                }
            }

            if (!String.IsNullOrEmpty(Bcc))
            {
                //objMail.Bcc.Add(new MailAddress(Bcc));
                string[] BCCSplit = Bcc.Split(new char[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string item in BCCSplit)
                {
                    objMail.Bcc.Add(new MailAddress(item));
                }
            }

            // message			
            objMail.Priority = priority;

            if (!String.IsNullOrEmpty(Subject))
                objMail.Subject = Subject;

            if (BodyEncoding != null)
                objMail.BodyEncoding = BodyEncoding;

            if (!String.IsNullOrEmpty(Body))
                objMail.Body = Body;

            // attachment
            if (!String.IsNullOrEmpty(fileAttachmentPath))
            {
                objMail.Attachments.Add(new Attachment(fileAttachmentPath));
            }

            SmtpClient client = null;
            if (!String.IsNullOrEmpty(SMTPPassword) &&
                !String.IsNullOrEmpty(SMTPUsername) &&
                !String.IsNullOrEmpty(SMTPServer))
            {
                client = new SmtpClient(SMTPServer, SMTPPort);
                client.Credentials = new NetworkCredential(SMTPUsername, SMTPPassword);
                //client.UseDefaultCredentials = true;
            }
            else
            {
                client = new SmtpClient();
            }

            client.EnableSsl = ENABLE_SSL;

            if (PICKUP_DIRECTORY)
                client.DeliveryMethod = SmtpDeliveryMethod.PickupDirectoryFromIis;

            if (!SEND_ASYNCHRONOUS)
            {
                client.Send(objMail);
            }
            else
            {
                //the userstate can be any object. The object can be accessed in the callback method
                //We should use our objMail for futher process !
                object userState = objMail;
                client.SendCompleted += new SendCompletedEventHandler(client_SendCompleted);
                client.SendAsync(objMail, userState);
            }
        }

        /// <summary>
        /// Sends the mail with multil email.
        /// </summary>
        /// <param name="MailFrom">The mail from.</param>
        /// <param name="MailTo">The mail to.</param>
        /// <param name="Cc">The cc.</param>
        /// <param name="Bcc">The BCC.</param>
        /// <param name="Subject">The subject.</param>
        /// <param name="Body">The body.</param>
        /// <param name="fileAttachmentPath">The file attachment path.</param>
        /// <param name="SMTPServer">The SMTP server.</param>
        /// <param name="SMTPUsername">The SMTP username.</param>
        /// <param name="SMTPPassword">The SMTP password.</param>
        /// <param name="SMTPPort">The SMTP port.</param>
        /// <param name="priority">The priority.</param>
        /// <param name="BodyEncoding">The body encoding.</param>
        /// <param name="isHtmlMail">if set to <c>true</c> [is HTML mail].</param>
        public static void sendMailWithMultilEmail(

            string MailFrom,			// e-mail address from
            string[] MailTo,				// e-mail address to
            string[] Cc,					// e-mail address CC
            string Bcc,					// e-mail address BCC

            string Subject,				// Subject
            string Body,				// Body
            string fileAttachmentPath,	// attachment

            string SMTPServer,			// smtp									
            string SMTPUsername,		// smtpusername
            string SMTPPassword,		// smtppassword		
            int SMTPPort,

            MailPriority priority,
            System.Text.Encoding BodyEncoding,
            bool isHtmlMail)
        {
            MailMessage objMail = new MailMessage();

            if (MailTo.Length != 0)
            {
                for (int i = 0; i < MailTo.Length; i++)
                {
                    if (!String.IsNullOrEmpty(MailTo[i]))
                    {
                        objMail.To.Add(MailTo[i]);

                    }
                }
            }

            objMail.Subject = Subject;
            objMail.Body = Body;
            objMail.IsBodyHtml = isHtmlMail;

            if (Cc.Length != 0)
            {
                for (int i = 0; i < Cc.Length; i++)
                {
                    if (!String.IsNullOrEmpty(Cc[i]))
                    {
                        objMail.CC.Add(new MailAddress(Cc[i]));
                    }
                }
            }

            if (!String.IsNullOrEmpty(Bcc))
            {
                objMail.Bcc.Add(new MailAddress(Bcc));
            }

            // message			
            objMail.Priority = priority;

            if (!String.IsNullOrEmpty(Subject))
                objMail.Subject = Subject;

            if (BodyEncoding != null)
                objMail.BodyEncoding = BodyEncoding;

            if (!String.IsNullOrEmpty(Body))
                objMail.Body = Body;

            // attachment
            if (!String.IsNullOrEmpty(fileAttachmentPath))
            {
                objMail.Attachments.Add(new Attachment(fileAttachmentPath));
            }

            SmtpClient client = null;
            if (!String.IsNullOrEmpty(SMTPPassword) &&
                !String.IsNullOrEmpty(SMTPUsername) &&
                !String.IsNullOrEmpty(SMTPServer))
            {
                client = new SmtpClient(SMTPServer, SMTPPort);
                client.Credentials = new NetworkCredential(SMTPUsername, SMTPPassword);
                //client.UseDefaultCredentials = true;
            }
            else
            {
                client = new SmtpClient();
            }

            client.EnableSsl = ENABLE_SSL;

            if (PICKUP_DIRECTORY)
                client.DeliveryMethod = SmtpDeliveryMethod.PickupDirectoryFromIis;

            if (!SEND_ASYNCHRONOUS)
            {
                client.Send(objMail);
            }
            else
            {
                //the userstate can be any object. The object can be accessed in the callback method
                //We should use our objMail for futher process !
                object userState = objMail;
                client.SendCompleted += new SendCompletedEventHandler(client_SendCompleted);
                client.SendAsync(objMail, userState);
            }
        }
        /// <summary>
        /// event handler when using asynchorous send mail method
        /// Config log4Net va ghi log
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.ComponentModel.AsyncCompletedEventArgs"/> instance containing the event data.</param>
        static void client_SendCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
        {
            //Get the Original MailMessage object
            MailMessage mail = (MailMessage)e.UserState;

            //write out the subject
            string subject = mail.Subject;

            if (e.Cancelled)
            {
                // [LOG] Send canceled for mail with subject [{0}].;				
            }

            if (e.Error != null)
            {
                // [LOG] Error when sending mail
                if (SendMailErrorEvent != null)
                {
                    SendMailErrorEvent(e.Error);
                }
            }
            else
            {
                // [LOG] successfully send
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Net;
using System.Net.Mail;

namespace NextTech.ChaChing123.Core.Utilities.Mail
{
    public class SmtpMail
    {
        public static void Send(string emailFrom, string emailTo, string subject, string body, bool isBodyHtml, List<string> attachments )
        {

            string smtpAddress = "smtp.mail.yahoo.com"; // to read from web.config
            int portNumber = 25; 
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(emailFrom);
                mail.To.Add(emailTo);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                // Can set to false, if you are sending pure text.

                mail.Attachments.Add(new Attachment("C:\\SomeFile.txt"));
                mail.Attachments.Add(new Attachment("C:\\SomeZip.zip"));

                using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                {
                    // smtp.Credentials = new NetworkCredential(emailFrom, password);
                    // smtp.EnableSsl = enableSSL;
                    smtp.Send(mail);
                }
            }
        }

        public static void Send(string emailFrom, string emailTo, string subject, string body, bool isBodyHtml, List<System.IO.Stream> attachments)
        {

            string smtpAddress = "smtp.mail.yahoo.com"; // to read from web.config
            int portNumber = 25; 

            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(emailFrom);
                mail.To.Add(emailTo);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                // Can set to false, if you are sending pure text.

                if(attachments != null)
                {
                    if (attachments.Count > 0)
                    {
                        foreach (System.IO.Stream stream in attachments)
                        {
                            mail.Attachments.Add(new Attachment(stream, "filename"));
                            using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                            {
                                // smtp.Credentials = new NetworkCredential(emailFrom, password);
                                // smtp.EnableSsl = enableSSL;
                                smtp.Send(mail);
                            }
                        }

                    }
                }
            }
        }

        public static void Send(string emailFrom, string emailTo, string subject, string body, bool isBodyHtml)
        {

            string smtpAddress = "smtp.mail.yahoo.com"; // to read from web.config
            int portNumber = 25; 
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(emailFrom);
                mail.To.Add(emailTo);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                // Can set to false, if you are sending pure text.
                using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                {
                    // smtp.Credentials = new NetworkCredential(emailFrom), password);
                    // smtp.EnableSsl = enableSSL;
                    smtp.Send(mail);
                }
            }
        }

    }
}

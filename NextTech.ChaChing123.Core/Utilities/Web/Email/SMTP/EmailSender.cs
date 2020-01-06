﻿/*
Copyright (c) 2012 <a href="http://www.gutgames.com">James Craig</a>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

#region Usings
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading;
using Btmu.Apf.Core.Utilities.DataTypes.ExtensionMethods;
using Btmu.Apf.Core.Utilities.DataTypes.Patterns.BaseClasses;
#endregion

namespace Utilities.Web.Email.SMTP
{
    /// <summary>
    /// Utility for sending an email
    /// </summary>
    public class EmailSender : Btmu.Apf.Core.Utilities.Web.Email.Message
    {
        #region Constructors

        /// <summary>
        /// Default Constructor
        /// </summary>
        public EmailSender()
        {
            Attachments = new List<Attachment>();
            EmbeddedResources = new List<LinkedResource>();
            Priority = MailPriority.Normal;
        }

        #endregion

        #region Public Functions

        /// <summary>
        /// Sends an email
        /// </summary>
        /// <param name="MessageBody">The body of the message</param>
        public virtual void SendMail(string MessageBody = "")
        {
            if (!string.IsNullOrEmpty(MessageBody))
                Body = MessageBody;
            using (System.Net.Mail.MailMessage message = new System.Net.Mail.MailMessage())
            {
                char[] Splitter = { ',', ';' };
                string[] AddressCollection = To.Split(Splitter);
                for (int x = 0; x < AddressCollection.Length; ++x)
                {
                    if (!string.IsNullOrEmpty(AddressCollection[x].Trim()))
                        message.To.Add(AddressCollection[x]);
                }
                if (!string.IsNullOrEmpty(CC))
                {
                    AddressCollection = CC.Split(Splitter);
                    for (int x = 0; x < AddressCollection.Length; ++x)
                    {
                        if (!string.IsNullOrEmpty(AddressCollection[x].Trim()))
                            message.CC.Add(AddressCollection[x]);
                    }
                }
                if (!string.IsNullOrEmpty(Bcc))
                {
                    AddressCollection = Bcc.Split(Splitter);
                    for (int x = 0; x < AddressCollection.Length; ++x)
                    {
                        if (!string.IsNullOrEmpty(AddressCollection[x].Trim()))
                            message.Bcc.Add(AddressCollection[x]);
                    }
                }
                message.Subject = Subject;
                message.From = new System.Net.Mail.MailAddress((From));
                using (AlternateView BodyView = AlternateView.CreateAlternateViewFromString(Body, null, MediaTypeNames.Text.Html))
                {
                    foreach (LinkedResource Resource in EmbeddedResources)
                    {
                        BodyView.LinkedResources.Add(Resource);
                    }
                    message.AlternateViews.Add(BodyView);
                    //message.Body = Body;
                    message.Priority = Priority;
                    message.SubjectEncoding = System.Text.Encoding.GetEncoding("ISO-8859-1");
                    message.BodyEncoding = System.Text.Encoding.GetEncoding("ISO-8859-1");
                    message.IsBodyHtml = true;
                    foreach (Attachment TempAttachment in Attachments)
                    {
                        message.Attachments.Add(TempAttachment);
                    }
                    using (System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(Server, Port))
                    {
                        if (!string.IsNullOrEmpty(UserName) && !string.IsNullOrEmpty(Password))
                        {
                            smtp.Credentials = new System.Net.NetworkCredential(UserName, Password);
                        }
                        if (UseSSL)
                            smtp.EnableSsl = true;
                        else
                            smtp.EnableSsl = false;
                        smtp.Send(message);
                    }
                }
            }
        }

        /// <summary>
        /// Sends a piece of mail asynchronous
        /// </summary>
        /// <param name="MessageBody">The body of the message</param>
        public virtual void SendMailAsync(string MessageBody = "")
        {
            if (!string.IsNullOrEmpty(MessageBody))
                Body = MessageBody;
            ThreadPool.QueueUserWorkItem(delegate { SendMail(); });
        }

        /// <summary>
        /// Disposes of the object
        /// </summary>
        /// <param name="Managed">Ignored in this object</param>
        protected override void Dispose(bool Managed)
        {
            if (Attachments != null)
            {
                Attachments.ForEach(x => x.Dispose());
                Attachments = null;
            }
            if (EmbeddedResources != null)
            {
                EmbeddedResources.ForEach(x => x.Dispose());
                EmbeddedResources = null;
            }
        }

        #endregion

        #region Properties

        /// <summary>
        /// Any attachments that are included with this
        /// message.
        /// </summary>
        public ICollection<Attachment> Attachments { get; private set; }

        /// <summary>
        /// Any attachment (usually images) that need to be embedded in the message
        /// </summary>
        public ICollection<LinkedResource> EmbeddedResources { get; private set; }

        /// <summary>
        /// The priority of this message
        /// </summary>
        public MailPriority Priority { get; set; }

        /// <summary>
        /// Server Location
        /// </summary>
        public string Server { get; set; }

        /// <summary>
        /// User Name for the server
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Password for the server
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Port to send the information on
        /// </summary>
        public int Port { get; set; }

        /// <summary>
        /// Decides whether we are using STARTTLS (SSL) or not
        /// </summary>
        public bool UseSSL { get; set; }

        /// <summary>
        /// Carbon copy send (seperate email addresses with a comma)
        /// </summary>
        public string CC { get; set; }

        /// <summary>
        /// Blind carbon copy send (seperate email addresses with a comma)
        /// </summary>
        public string Bcc { get; set; }

        #endregion
    }
}
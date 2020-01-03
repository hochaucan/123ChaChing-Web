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
using System.Diagnostics.Contracts;
using System.IO;
#endregion

namespace Utilities.Web.Email.MIME
{
    /// <summary>
    /// Header of the MIME message
    /// </summary>
    public class MIMEHeader
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        public MIMEHeader()
        {
            this.Fields = new List<Field>();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="HeaderText">Text for the header</param>
        public MIMEHeader(string HeaderText)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(HeaderText), "HeaderText");
            this.Fields = new List<Field>();
            StringReader Reader=new StringReader(HeaderText);
            try
            {
                string LineRead=Reader.ReadLine();
                string Field=LineRead+"\r\n";
                while(!string.IsNullOrEmpty(LineRead))
                {
                    LineRead=Reader.ReadLine();
                    if (!string.IsNullOrEmpty(LineRead) && (LineRead[0].Equals(' ') || LineRead[0].Equals('\t')))
                    {
                        Field += LineRead + "\r\n";
                    }
                    else
                    {
                        Fields.Add(new Field(Field));
                        Field = LineRead + "\r\n";
                    }
                }
            }
            finally
            {
                Reader.Close();
                Reader=null;
            }
        }
        #endregion

        #region Public Properties

        /// <summary>
        /// The individual fields for the header
        /// </summary>
        public ICollection<Field>Fields{get;private set;}
        
        /// <summary>
        /// Can be used to get a specific field based on its name
        /// </summary>
        /// <param name="Key">Name of the field</param>
        /// <returns>Field specified</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Globalization", "CA1309:UseOrdinalStringComparison", MessageId = "System.String.Equals(System.String,System.StringComparison)")]
        public Field this[string Key]
        {
            get
            {
                foreach (Field TempField in Fields)
                {
                    if (TempField.Name.Equals(Key,StringComparison.InvariantCultureIgnoreCase))
                    {
                        return TempField;
                    }
                }
                return null;
            }
        }
        #endregion
    }
}
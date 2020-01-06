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
using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Contracts;

#endregion

namespace Utilities.Web.Email.MIME
{
    /// <summary>
    /// Fields within the header
    /// </summary>
    public class Field
    {
        #region Constructor
        /// <summary>
        /// Constructor
        /// </summary>
        public Field()
        {
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="FieldText">Field text</param>
        public Field(string FieldText)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(FieldText),"FieldText");

            int Index = FieldText.IndexOf(':');
            if (Index != -1)
                Name = FieldText.Substring(0, Index);

            ++Index;
            FieldText = FieldText.Substring(Index, FieldText.Length - Index).Trim();
            string[] Splitter = { ";" };
            string[] Attributes = FieldText.Split(Splitter, StringSplitOptions.RemoveEmptyEntries);
            foreach (string AttributeText in Attributes)
            {
                Code TempCode = CodeManager.Instance[Name];
                if (TempCode != null)
                {
                    string TempText = "";
                    TempCode.Decode(AttributeText, out TempText);
                    this.Attributes.Add(new Attribute(TempText));
                    CharacterSet = TempCode.CharacterSet;
                }
                else
                {
                    this.Attributes.Add(new Attribute(AttributeText));
                }
            }
        }
        #endregion

        #region Public Properties
        private string _Name="";
        private List<Attribute> _Attributes=new List<Attribute>();
        private string _CharacterSet="";

        /// <summary>
        /// Name of the field
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }

        /// <summary>
        /// Attributes associated with the field
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists"), SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public List<Attribute> Attributes
        {
            get { return _Attributes; }
            set { _Attributes = value; }
        }

        /// <summary>
        /// Character set used by the field
        /// </summary>
        public string CharacterSet
        {
            get { return _CharacterSet; }
            set { _CharacterSet = value; }
        }

        /// <summary>
        /// Can be used to get specific attributes' values
        /// </summary>
        /// <param name="Key">Name of the attribute</param>
        /// <returns>A string containing the value of the attribute</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Globalization", "CA1309:UseOrdinalStringComparison", MessageId = "System.String.Equals(System.String,System.StringComparison)")]
        public string this[string Key]
        {
            get
            {
                foreach (Attribute TempAttribute in Attributes)
                {
                    if (TempAttribute.Name.Equals(Key,StringComparison.InvariantCultureIgnoreCase))
                    {
                        return TempAttribute.Value;
                    }
                }
                return "";
            }
        }
        #endregion
    }
}

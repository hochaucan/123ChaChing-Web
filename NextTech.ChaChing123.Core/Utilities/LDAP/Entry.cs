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
using System.DirectoryServices;
using System.Text;
#endregion

namespace NextTech.ChaChing123.Core.Utilities.LDAP
{
    /// <summary>
    /// Directory entry class
    /// </summary>
    public class Entry : IDisposable
    {
        #region Constructors
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="DirectoryEntry">Directory entry for the item</param>
        public Entry(DirectoryEntry DirectoryEntry)
        {
            this.DirectoryEntry = DirectoryEntry;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Actual base directory entry
        /// </summary>
        public virtual DirectoryEntry DirectoryEntry { get; set; }

        /// <summary>
        /// Email property for this entry
        /// </summary>
        public virtual string Email
        {
            get { return (string)GetValue("mail"); }
            set { SetValue("mail", value); }
        }

        /// <summary>
        /// distinguished name property for this entry
        /// </summary>
        public virtual string DistinguishedName
        {
            get { return (string)GetValue("distinguishedname"); }
            set { SetValue("distinguishedname", value); }
        }

        /// <summary>
        /// country code property for this entry
        /// </summary>
        public virtual string CountryCode
        {
            get { return (string)GetValue("countrycode"); }
            set { SetValue("countrycode", value); }
        }

        /// <summary>
        /// company property for this entry
        /// </summary>
        public virtual string Company
        {
            get { return (string)GetValue("company"); }
            set { SetValue("company", value); }
        }

        /// <summary>
        /// MemberOf property for this entry
        /// </summary>
        public virtual IEnumerable<string> MemberOf
        {
            get
            {
                List<string> Values = new List<string>();
                PropertyValueCollection Collection = DirectoryEntry.Properties["memberof"];
                foreach (object Item in Collection)
                {
                    Values.Add((string)Item);
                }
                return Values;
            }
        }

        /// <summary>
        /// display name property for this entry
        /// </summary>
        public virtual string DisplayName
        {
            get { return (string)GetValue("displayname"); }
            set { SetValue("displayname", value); }
        }

        /// <summary>
        /// initials property for this entry
        /// </summary>
        public virtual string Initials
        {
            get { return (string)GetValue("initials"); }
            set { SetValue("initials", value); }
        }

        /// <summary>
        /// title property for this entry
        /// </summary>
        public virtual string Title
        {
            get { return (string)GetValue("title"); }
            set { SetValue("title", value); }
        }

        /// <summary>
        /// samaccountname property for this entry
        /// </summary>
        public virtual string SamAccountName
        {
            get { return (string)GetValue("samaccountname"); }
            set { SetValue("samaccountname", value); }
        }

        /// <summary>
        /// givenname property for this entry
        /// </summary>
        public virtual string GivenName
        {
            get { return (string)GetValue("givenname"); }
            set { SetValue("givenname", value); }
        }

        /// <summary>
        /// cn property for this entry
        /// </summary>
        public virtual string CN
        {
            get { return (string)GetValue("cn"); }
            set { SetValue("cn", value); }
        }

        /// <summary>
        /// name property for this entry
        /// </summary>
        public virtual string Name
        {
            get { return (string)GetValue("name"); }
            set { SetValue("name", value); }
        }

        /// <summary>
        /// office property for this entry
        /// </summary>
        public virtual string Office
        {
            get { return (string)GetValue("physicaldeliveryofficename"); }
            set { SetValue("physicaldeliveryofficename", value); }
        }

        /// <summary>
        /// telephone number property for this entry
        /// </summary>
        public virtual string TelephoneNumber
        {
            get { return (string)GetValue("telephonenumber"); }
            set { SetValue("telephonenumber", value); }
        }
        #endregion

        #region Public Functions

        /// <summary>
        /// Saves any changes that have been made
        /// </summary>
        public virtual void Save()
        {
            Contract.Requires<InvalidOperationException>(DirectoryEntry != null, "DirectoryEntry shouldn't be null");
            DirectoryEntry.CommitChanges();
        }

        /// <summary>
        /// Gets a value from the entry
        /// </summary>
        /// <param name="Property">Property you want the information about</param>
        /// <returns>an object containing the property's information</returns>
        public virtual object GetValue(string Property)
        {
            PropertyValueCollection Collection = DirectoryEntry.Properties[Property];
            return Collection != null ? Collection.Value : null;
        }

        /// <summary>
        /// Gets a value from the entry
        /// </summary>
        /// <param name="Property">Property you want the information about</param>
        /// <param name="Index">Index of the property to return</param>
        /// <returns>an object containing the property's information</returns>
        public virtual object GetValue(string Property, int Index)
        {
            PropertyValueCollection Collection = DirectoryEntry.Properties[Property];
            return Collection != null ? Collection[Index] : null;
        }

        /// <summary>
        /// Sets a property of the entry to a specific value
        /// </summary>
        /// <param name="Property">Property of the entry to set</param>
        /// <param name="Value">Value to set the property to</param>
        public virtual void SetValue(string Property, object Value)
        {
            PropertyValueCollection Collection = DirectoryEntry.Properties[Property];
            if (Collection != null)
                Collection.Value = Value;
        }

        /// <summary>
        /// Sets a property of the entry to a specific value
        /// </summary>
        /// <param name="Property">Property of the entry to set</param>
        /// <param name="Index">Index of the property to set</param>
        /// <param name="Value">Value to set the property to</param>
        public virtual void SetValue(string Property,int Index, object Value)
        {
            PropertyValueCollection Collection = DirectoryEntry.Properties[Property];
            if (Collection != null)
                Collection[Index] = Value;
        }

        /// <summary>
        /// Exports the entry as a string
        /// </summary>
        /// <returns>The entry as a string</returns>
        public override string ToString()
        {
            StringBuilder Builder = new StringBuilder();
            foreach (PropertyValueCollection Property in DirectoryEntry.Properties)
            {
                Builder.Append(Property.PropertyName).Append(" = ").AppendLine(Property.Value.ToString());
            }
            return Builder.ToString();
        }

        #endregion

        #region IDisposable Members
        
        /// <summary>
        /// Disposes the object
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Disposes of the objects
        /// </summary>
        /// <param name="Disposing">True to dispose of all resources, false only disposes of native resources</param>
        protected virtual void Dispose(bool Disposing)
        {
            if (DirectoryEntry != null)
            {
                DirectoryEntry.Dispose();
                DirectoryEntry = null;
            }
        }

        /// <summary>
        /// Destructor
        /// </summary>
        ~Entry()
        {
            Dispose(false);
        }

        #endregion
    }
}
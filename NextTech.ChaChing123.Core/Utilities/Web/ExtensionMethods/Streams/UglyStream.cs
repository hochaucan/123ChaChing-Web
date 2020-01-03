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
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using Utilities.Compression.ExtensionMethods;
using Utilities.Compression.ExtensionMethods.Enums;
using Utilities.DataTypes.ExtensionMethods;
#endregion

namespace Utilities.Web.ExtensionMethods.Streams
{
    /// <summary>
    /// Removes "pretty printing" from HTML
    /// </summary>
    public class UglyStream : Stream
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="StreamUsing">The stream for the page</param>
        /// <param name="Compression">The compression we're using (gzip or deflate)</param>
        /// <param name="Type">Minification type to use (defaults to HTML)</param>
        public UglyStream(Stream StreamUsing, CompressionType Compression, MinificationType Type = MinificationType.HTML)
            : base()
        {
            this.Compression = Compression;
            this.StreamUsing = StreamUsing;
            this.Type = Type;
        }

        #endregion

        #region Variables

        /// <summary>
        /// Compression using
        /// </summary>
        private CompressionType Compression;

        /// <summary>
        /// Stream using
        /// </summary>
        private Stream StreamUsing;

        /// <summary>
        /// Final output string
        /// </summary>
        private string FinalString;

        private MinificationType Type;

        #endregion

        #region Properties

        #region CanRead

        /// <summary>
        /// Doesn't deal with reading
        /// </summary>
        public override bool CanRead
        {
            get { return false; }
        }

        #endregion

        #region CanSeek

        /// <summary>
        /// No seeking
        /// </summary>
        public override bool CanSeek
        {
            get { return false; }
        }

        #endregion

        #region CanWrite

        /// <summary>
        /// Can write out though
        /// </summary>
        public override bool CanWrite
        {
            get { return true; }
        }

        #endregion

        #region Length

        /// <summary>
        /// Don't worry about
        /// </summary>
        public override long Length
        {
            get { throw new NotImplementedException(); }
        }

        #endregion

        #region Position

        /// <summary>
        /// No position to take care of
        /// </summary>
        public override long Position
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        #endregion

        #endregion

        #region Functions

        #region Flush

        /// <summary>
        /// Nothing to flush
        /// </summary>
        public override void Flush()
        {
            if (string.IsNullOrEmpty(FinalString))
                return;
            byte[] Data = FinalString.Minify(Type).ToByteArray();
            Data = Data.Compress(Compression);
            StreamUsing.Write(Data, 0, Data.Length);
            FinalString = "";
        }

        #endregion

        #region Read

        /// <summary>
        /// Don't worry about
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public override int Read(byte[] buffer, int offset, int count)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Seek

        /// <summary>
        /// Once again not implemented
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="origin"></param>
        /// <returns></returns>
        public override long Seek(long offset, SeekOrigin origin)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region SetLength

        /// <summary>
        /// Don't worry about
        /// </summary>
        /// <param name="value"></param>
        public override void SetLength(long value)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Write

        /// <summary>
        /// Actually writes out the data
        /// </summary>
        /// <param name="buffer">the page's data in byte form</param>
        /// <param name="offset">offset of the data</param>
        /// <param name="count">the amount of data</param>
        public override void Write(byte[] buffer, int offset, int count)
        {
            byte[] Data = new byte[count];
            Buffer.BlockCopy(buffer, offset, Data, 0, count);
            string inputstring = Data.ToString(null);
            FinalString += inputstring;
        }

        #endregion

        #region Evaluate

        /// <summary>
        /// Evaluates whether the text has spaces, page breaks, etc. and removes them.
        /// </summary>
        /// <param name="Matcher">Match found</param>
        /// <returns>The string minus any extra white space</returns>
        protected static string Evaluate(Match Matcher)
        {
            string MyString = Matcher.ToString();
            MyString = Regex.Replace(MyString, @"\r\n\s*", "");
            return MyString;
        }

        #endregion

        #endregion
    }
}
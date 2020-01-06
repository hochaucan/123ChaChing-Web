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
using System.Diagnostics.Contracts;
using System.Globalization;
using System.IO;
using System.Text;
#endregion

namespace Utilities.Web.Email.MIME.CodeTypes
{
    /// <summary>
    /// Quoted-printable coder
    /// </summary>
    public class CodeQP:Code
    {
        #region Constructor
        /// <summary>
        /// Constructor
        /// </summary>
        public CodeQP()
        {
        }
        #endregion

        #region Public Overridden Functions

        /// <summary>
        /// Decodes the string
        /// </summary>
        /// <param name="Input">String to decode</param>
        /// <param name="Output">Output in bytes</param>
        public override void Decode(string Input, out byte[] Output)
        {
            if (string.IsNullOrEmpty(Input))
                throw new ArgumentNullException("Input");
            string CurrentLine="";
            using (MemoryStream MemoryStream = new MemoryStream())
            {
                StringReader Reader = new StringReader(Input);
                try
                {
                    CurrentLine = Reader.ReadLine();
                    while (!string.IsNullOrEmpty(CurrentLine))
                    {
                        DecodeOneLine(MemoryStream, CurrentLine);
                        CurrentLine = Reader.ReadLine();
                    }
                    Output = MemoryStream.ToArray();
                }
                finally
                {
                    Reader.Close();
                    Reader = null;
                }
            }
        }

        /// <summary>
        /// Encodes the data
        /// </summary>
        /// <param name="Input">Input data</param>
        /// <returns>The encoded string</returns>
        public override string Encode(byte[] Input)
        {
            if (Input==null)
                throw new ArgumentNullException("Input");
            StringBuilder Output = new StringBuilder();
            foreach (byte Index in Input)
            {
                if ((Index < 33 || Index > 126 || Index == 0x3D)
                    && Index != 0x09 && Index != 0x20 && Index != 0x0D && Index != 0x0A)
                {
                    int Code = (int)Index;
                    Output.AppendFormat("={0}", Code.ToString("X2",CultureInfo.InvariantCulture));
                }
                else
                {
                    Output.Append(System.Convert.ToChar(Index));
                }
            }
            Output.Replace(" \r", "=20\r", 0, Output.Length);
            Output.Replace("\t\r", "=09\r", 0, Output.Length);
            Output.Replace("\r\n.\r\n", "\r\n=2E\r\n", 0, Output.Length);
            Output.Replace(" ", "=20", Output.Length - 1, 1);
            return FormatEncodedString(Output.ToString());
        }
        #endregion

        #region Protected Functions

        /// <summary>
        /// Decodes a single line
        /// </summary>
        /// <param name="Stream">Input stream</param>
        /// <param name="CurrentLine">The current line</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Globalization", "CA1309:UseOrdinalStringComparison", MessageId = "System.String.EndsWith(System.String,System.StringComparison)")]
        protected static void DecodeOneLine(Stream Stream,string CurrentLine)
        {
            Contract.Requires<ArgumentNullException>(Stream!=null,"Stream");
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(CurrentLine), "CurrentLine");
            for (int x = 0, y = 0; x < CurrentLine.Length; ++x, ++y)
            {
                byte CurrentByte;
                if (CurrentLine[x] == '=')
                {
                    if (x + 2 > CurrentLine.Length) break;
                    if (IsHex(CurrentLine[x + 1]) && IsHex(CurrentLine[x + 2]))
                    {
                        string HexCode = CurrentLine.Substring(x + 1, 2);
                        CurrentByte = Convert.ToByte(HexCode, 16);
                        x += 2;
                    }
                    else
                    {
                        CurrentByte = Convert.ToByte(CurrentLine[++x]);
                    }
                }
                else
                {
                    CurrentByte = Convert.ToByte(CurrentLine[x]);
                }
                Stream.WriteByte(CurrentByte);
            }
            if (!CurrentLine.EndsWith("=",StringComparison.InvariantCulture))
            {
                Stream.WriteByte(0x0D);
                Stream.WriteByte(0x0A);
            }
        }

        /// <summary>
        /// Determines if a character is possibly hexidecimal
        /// </summary>
        /// <param name="Input">Input character</param>
        /// <returns>true if it is, false otherwise</returns>
		protected static bool IsHex(char Input)
		{
			if((Input >= '0' && Input <= '9') || (Input >= 'A' && Input <= 'F') || (Input >= 'a' && Input <= 'f'))
				return true;
			else
				return false;
		}

        /// <summary>
        /// Formats the encoded string
        /// </summary>
        /// <param name="Input">Input string</param>
        /// <returns>An encoded string</returns>
        protected static string FormatEncodedString(string Input)
        {
            string CurrentLine;
            using (StringReader Reader = new StringReader(Input))
            {
                StringBuilder Builder = new StringBuilder();
                CurrentLine = Reader.ReadLine();
                while (!string.IsNullOrEmpty(CurrentLine))
                {
                    int Index = MAX_CHAR_LEN;
                    int LastIndex = 0;
                    while (Index < CurrentLine.Length)
                    {
                        if (IsHex(CurrentLine[Index]) && IsHex(CurrentLine[Index - 1]) && CurrentLine[Index - 2] == '=')
                        {
                            Index -= 2;
                        }
                        Builder.Append(CurrentLine.Substring(LastIndex, Index - LastIndex));
                        Builder.Append("=\r\n");
                        LastIndex = Index;
                        Index += MAX_CHAR_LEN;
                    }
                    Builder.Append(CurrentLine.Substring(LastIndex, CurrentLine.Length - LastIndex));
                    Builder.Append("\r\n");
                }
                return Builder.ToString();
            }
        }
        
        /// <summary>
        /// Max char length
        /// </summary>
        protected const int MAX_CHAR_LEN = 75;

        #endregion
    }
}
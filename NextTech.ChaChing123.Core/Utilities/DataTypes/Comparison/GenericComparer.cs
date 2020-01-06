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

#endregion

namespace NextTech.ChaChing123.Core.Utilities.DataTypes.Comparison
{
    /// <summary>
    /// Generic IComparable class
    /// </summary>
    /// <typeparam name="T">Data type</typeparam>
    public class GenericComparer<T> : IComparer<T> where T : IComparable
    {
        #region Functions

        /// <summary>
        /// Compares the two objects
        /// </summary>
        /// <param name="x">Object 1</param>
        /// <param name="y">Object 2</param>
        /// <returns>0 if they're equal, any other value they are not</returns>
        public int Compare(T x, T y)
        {
            if (!typeof(T).IsValueType
                || (typeof(T).IsGenericType
                && typeof(T).GetGenericTypeDefinition().IsAssignableFrom(typeof(Nullable<>))))
            {
                if (Object.Equals(x, default(T)))
                    return Object.Equals(y, default(T)) ? 0 : -1;
                if (Object.Equals(y, default(T)))
                    return -1;
            }
            if (x.GetType() != y.GetType())
                return -1;
            IComparable<T> TempComparable = x as IComparable<T>;
            if (TempComparable != null)
                return TempComparable.CompareTo(y);
            return x.CompareTo(y);
        }

        #endregion
    }
}
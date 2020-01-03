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
using NextTech.ChaChing123.Core.Utilities.Caching.Interfaces;
#endregion

namespace NextTech.ChaChing123.Core.Utilities.Caching
{
    /// <summary>
    /// Cache item
    /// </summary>
    /// <typeparam name="KeyType">Key type</typeparam>
    public class CacheItem<KeyType> : ICacheItem, ICacheItem<KeyType>
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="Key">Key</param>
        /// <param name="Value">Value</param>
        public CacheItem(KeyType Key, object Value)
        {
            this.Key = Key;
            this.Value = Value;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Value stored in the cache item
        /// </summary>
        public virtual object Value { get; set; }

        /// <summary>
        /// Key associated with the cache item
        /// </summary>
        public virtual KeyType Key { get; set; }

        #endregion
    }
}
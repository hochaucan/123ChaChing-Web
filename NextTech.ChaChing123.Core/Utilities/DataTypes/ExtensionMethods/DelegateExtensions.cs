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
using System.Threading;


#endregion

namespace NextTech.ChaChing123.Core.Utilities.DataTypes.ExtensionMethods
{
    /// <summary>
    /// Extensions for Func, Action, and EventHandler
    /// </summary>
    public static class DelegateExtensions
    {
        #region Functions

        #region Async

        /// <summary>
        /// Runs an action async
        /// </summary>
        /// <param name="Action">Action to run</param>
        public static void Async(this Action Action)
        {
            new Thread(Action.Invoke).Start();
        }

        #endregion

        #region Raise

        /// <summary>
        /// Safely calls the specified action
        /// </summary>
        /// <typeparam name="T">The type of the event args</typeparam>
        /// <param name="Delegate">The delegate</param>
        /// <param name="EventArgs">The event args</param>
        public static void Raise<T>(this Action<T> Delegate, T EventArgs)
        {
            if (Delegate != null)
                Delegate(EventArgs);
        }

        /// <summary>
        /// Safely raises the event
        /// </summary>
        /// <typeparam name="T">The type of the event args</typeparam>
        /// <param name="Delegate">The delegate</param>
        /// <param name="Sender">The sender</param>
        /// <param name="EventArg">The event args</param>
        public static void Raise<T>(this EventHandler<T> Delegate, object Sender, T EventArg)
            where T : System.EventArgs
        {
            if (Delegate != null)
                Delegate(Sender, EventArg);
        }

        /// <summary>
        /// Safely calls the Func
        /// </summary>
        /// <typeparam name="T1">The event arg type</typeparam>
        /// <typeparam name="T2">The return type</typeparam>
        /// <param name="Delegate">The delegate</param>
        /// <param name="EventArgs">The event args</param>
        /// <returns>The value returned by the function</returns>
        public static T2 Raise<T1, T2>(this Func<T1, T2> Delegate, T1 EventArgs)
        {
            if (Delegate != null)
                return Delegate(EventArgs);
            return default(T2);
        }

        #endregion

        #endregion
    }
}

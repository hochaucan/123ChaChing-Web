using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NextTech.ChaChing123.CoreEntityObjects
{
    /// <summary>
    /// Error class 
    /// All the errors will be presented in the following structure
    /// </summary>
    public class Error : IError
    {
        public string TargetName {get; set;}
        public string Message { get; set; }
        public object Sender { get; set; }

        public Error(object sender, string targetName, string message)
        {
            this.Sender = sender; 
            this.TargetName = targetName;
            this.Message = message;
        }

    }

    public class ValidateEventArgs : EventArgs
    {
 

    }

    public class ValidateException : Exception
    {

    }


}

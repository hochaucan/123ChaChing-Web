using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NextTech.ChaChing123.CoreEntityObjects
{

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class RequiredAttribute : System.Attribute
    {
        private bool required;
        private string errorMessage;
        
        public bool Required
        {
            get
            {
                return required;
            }
            set
            {
                required = value;
            }
        }

        public string ErrorMessage
        {
            get
            {
                return errorMessage;
            }
            set
            {
                errorMessage = value;
            }
        }

        public RequiredAttribute()
        {
            required = true;
        }

        public RequiredAttribute(bool required)
        {
            this.required = required;
        }

        public RequiredAttribute(string errorMessage)
        {
            this.errorMessage = errorMessage;
        }
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class DefaultValueAttribute : System.Attribute
    {
        public object Default {get; set;}

        public DefaultValueAttribute(object Default)
        {
            this.Default = Default;
        }

    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class InRangeAttribute : System.Attribute
    {
        private string errorMessage;
        private object min;
        private object max;

        public InRangeAttribute(object min, object max)
        {
            this.min = min;
            this.max = max;
        }


        public InRangeAttribute(object min, object max, string errorMessage)
        {
            this.min = min;
            this.max = max;
            this.errorMessage = errorMessage;
        }

        public object Min
        {
            get
            {
                return min;
            }
            set
            {
                min = value;
            }
        }

        public object Max
        {
            get
            {
                return max;
            }
            set
            {
                max = value;
            }
        }


        public string ErrorMessage
        {
            get
            {
                return errorMessage;
            }
            set
            {
                errorMessage = value;
            }
        }

 
    }


}

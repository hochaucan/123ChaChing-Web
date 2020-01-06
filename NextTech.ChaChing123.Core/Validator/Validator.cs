using System;
using System.Data;
using System.Collections.Generic;
using System.Reflection;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

/**
 * <summary>
 * This class provides attribute based validation
 * </summary>
 */

namespace BTMU.APF.Core
{
    public class Validator
    {
        /**
         * <summary>
         * This method will validate the given method
         * </summary>
         * <remarks>
         * Validation will only work if the object
         * contains specific validation attributes
         * </remarks>
         * <returns>
         * A list of string values representing the errors
         * </returns>
         */
        public static IList<string> Validate(object o)
        {
            return Validate(o, false, "Object cannot be null");
        }//end Validate
        /**
         * <summary>
         * This method will validate the given method
         * </summary>
         * <remarks>
         * Validation will only work if the object
         * contains specific validation attributes
         * </remarks>
         * <returns>
         * A list of string values representing the errors
         * </returns>
         */
        public static IList<string> Validate
            (object o, bool allowNullObject, string nullMessage)
        {
            List<string> errors = new List<string>();
            if (o != null)
            {
                foreach (PropertyInfo info in o.GetType().GetProperties())
                {
                    foreach (object customAttribute in info.GetCustomAttributes
                        (typeof(IDbValidationAttribute), true))
                    {
                        ((IDbValidationAttribute)customAttribute).Validate
                            (o, info, errors);
                        if (info.PropertyType.IsClass ||
                            info.PropertyType.IsInterface)
                        {
                            errors.AddRange((IList<string>)Validate
                                (info.GetValue(o, null), true, null));
                        }
                    }
                }//end foreach
                foreach (MethodInfo method in o.GetType().GetMethods())
                {
                    foreach (object customAttribute in method.GetCustomAttributes
                            (typeof(IDbValidationAttribute), true))
                    {
                        ((IDbValidationAttribute)customAttribute).Validate
                            (o, method, errors);
                    }
                }
            }
            else if (!allowNullObject)
            {
                errors.Add(nullMessage);
            }
            return errors;
        }
    }
    /**
     * <summary>
     * This interface provides validation signatures that can be called
     * based on the type of the attribute
     * </summary>
     * <remarks>
     * Ideally there should be a different interface for each kind of attribute
     * but this makes the code easier
     * </remarks>
     */
    public interface IDbValidationAttribute
    {
        void Validate(object o, PropertyInfo propertyInfo, IList<string> errors);
        void Validate(object o, MethodInfo methodInfo, IList<string> errors);
    }

    [System.AttributeUsage(AttributeTargets.Method)]
    public class CustomDatabaseValidationAttribute :
        Attribute, IDbValidationAttribute
    {

        public void Validate(object o, PropertyInfo propertyInfo,
            IList<string> errors)
        { }

        public void Validate(object o, MethodInfo info, IList<string> errors)
        {
            IList<string> result = (IList<string>)info.Invoke(o, null);
            foreach (string abc in result)
            {
                errors.Add(abc);
            }
        }
    }

    [System.AttributeUsage(AttributeTargets.Property)]
    public class FieldNullableAttribute : Attribute, IDbValidationAttribute
    {
        private bool mIsNullable = false;
        private string mMessage = "{0} cannot be null";

        public bool IsNullable
        {
            get
            {
                return mIsNullable;
            }
            set
            {
                mIsNullable = value;
            }
        }

        public string Message
        {
            get
            {
                return mMessage;
            }
            set
            {
                if (value == null)
                {
                    mMessage = String.Empty;
                }
                else
                {
                    mMessage = value;
                }
            }
        }
        public void Validate(object o, MethodInfo info,
            IList<string> errors)
        { }
        public void Validate(object o, PropertyInfo propertyInfo,
            IList<string> errors)
        {
            object value = propertyInfo.GetValue(o, null);
            if (value == null && !IsNullable)
            {
                errors.Add(String.Format(mMessage, propertyInfo.Name));
            }
        }
    }

    [System.AttributeUsage(AttributeTargets.Property)]
    public class FieldLengthAttribute : Attribute, IDbValidationAttribute
    {
        private int mMaxLegnth;
        private string mMessage = "{0} can only be {1} character(s) long";

        public int MaxLength
        {
            get
            {
                return mMaxLegnth;
            }
            set
            {
                mMaxLegnth = value;
            }
        }

        public string Message
        {
            get
            {
                return mMessage;
            }
            set
            {
                if (value == null)
                {
                    mMessage = String.Empty;
                }
                else
                {
                    mMessage = value;
                }
            }
        }
        public void Validate(object o, MethodInfo info, IList<string> errors) { }
        public void Validate(object o, PropertyInfo propertyInfo,
            IList<string> errors)
        {
            object value = propertyInfo.GetValue(o, null);
            if (value is string)
            {
                if (MaxLength != 0 && ((string)value).Length >= MaxLength)
                {
                    errors.Add(String.Format
                        (mMessage, propertyInfo.Name, MaxLength));
                }
            }
        }
    }

}

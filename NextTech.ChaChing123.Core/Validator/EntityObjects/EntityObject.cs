using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

namespace NextTech.ChaChing123.CoreEntityObjects
{
    public class EntityObject : IEntityObject
    {
        
        #region Internal Fields
        /// <summary>
        /// The Errors collection to keep the errors. Tthe validation method populates this.
        /// </summary>
        public List<Error> Errors = new List<Error>();

        #endregion

        #region Delegate and Events
        /// <summary>
        /// OnValidateEventHandler delegate to enable injection of custom validation routines
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public delegate void OnValidateEventHandler(object sender, ValidateEventArgs e);
        public delegate void OnValidatedEventHandler(object sender, ValidateEventArgs e);

        public OnValidateEventHandler OnValidate;
        public OnValidatedEventHandler OnValidated;

        #endregion

        #region Public Properties


        #endregion

        #region IEntityObject Members

        /// <summary>
        /// Validate method performs the validation process and allows overriding 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public virtual void Validate(object sender, ValidateEventArgs e)
        {
            //Initialise the error collection
            Errors.Clear();

            //Enable calling the OnValidate event before validation takes place
            if (this.OnValidate != null) this.OnValidate(this, new ValidateEventArgs());
            try
            {

                foreach (PropertyInfo info in this.GetType().GetProperties())
                {
                    /* Get property value assigned to property */
                    object data = info.GetValue(this, null);

                    /* Set Default value if value is empty */
                    foreach (object customAttribute in info.GetCustomAttributes(typeof(DefaultValueAttribute), true))
                    {
                        if (data == null)
                        {
                            info.SetValue(this, (customAttribute as DefaultValueAttribute).Default, null);
                            data = info.GetValue(this, null);
                        }
                    }

                    /* Check if property value is required */
                    foreach (object customAttribute in info.GetCustomAttributes(typeof(RequiredAttribute), true))
                    {
                        if (string.IsNullOrEmpty((string)data))
                        {
                            Errors.Add(new Error(this, info.Name, string.IsNullOrEmpty((customAttribute as RequiredAttribute).ErrorMessage) ? string.Format("{0} is required", info.Name) : (customAttribute as RequiredAttribute).ErrorMessage));
                        }
                    }

                    /* Evaluate whether the property value lies within range */
                    foreach (object customAttribute in info.GetCustomAttributes(typeof(InRangeAttribute), true))
                    {

                        if (!(((IComparable)data).CompareTo((customAttribute as InRangeAttribute).Min) > 0) ||
                            !(((IComparable)data).CompareTo((customAttribute as InRangeAttribute).Max) < 0))
                        {
                            Errors.Add(new Error(this, info.Name, string.IsNullOrEmpty((customAttribute as InRangeAttribute).ErrorMessage) ? string.Format("{0} is out of range", info.Name) : (customAttribute as InRangeAttribute).ErrorMessage));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //
                throw new Exception("Could not validate Object!", ex);
            }
            finally
            {
                //Enable calling the OnValidated event after validation has taken place
                if (this.OnValidated != null) this.OnValidated(this, new ValidateEventArgs());
            }
        }

        /// <summary>
        /// The save method. This is where the validation is also done. I avoided performing the validate on each 
        /// change of a property for perfomance reasons - reflection.
        /// </summary>
        /// <returns>True if the object has no validation errors. False if there are validation errors.</returns>
        public bool Save()
        {
            //Validate the object
            Validate(this, new ValidateEventArgs());
            if (Errors.Count > 0) return false;

            //Code to Save object
            Console.WriteLine("Object Saved");
            return true;
        }

        /// <summary>
        /// The Validate method. This is where the validation is also done. I avoided performing the validate on each 
        /// change of a property for perfomance reasons - reflection.
        /// </summary>
        /// <returns>True if the object has no validation errors. False if there are validation errors.</returns>
        public bool Validate()
        {
            //Validate the object
            Validate(this, new ValidateEventArgs());
            if (Errors.Count > 0) return false;

            //Code to Save object
            //Console.WriteLine("Object Saved");
            return true;
        }

        #endregion

    }
}

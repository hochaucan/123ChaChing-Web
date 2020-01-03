using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NextTech.ChaChing123.CoreEntityObjects
{
    /// <summary>
    /// Contract for all business objects
    /// </summary>
    public interface IEntityObject
    {
        void Validate(object sender, ValidateEventArgs e);
        bool Save();
    }

    /// <summary>
    /// 
    /// </summary>
    public interface IError
    {
        
    }


}

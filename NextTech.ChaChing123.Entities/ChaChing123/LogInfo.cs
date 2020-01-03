namespace NextTech.ChaChing123.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
   

    /// <summary>
    /// Class LogInfo.
    /// </summary>
    /// <seealso cref="BTMU.APF.Utilities.Entities.IEntityBase" />
    public class LogInfo : IEntityBase
    {
        /// <summary>
        /// The identifier
        /// </summary>
        private int _id;
        /// <summary>
        /// The user identifier
        /// </summary>
        private int _userId;
        /// <summary>
        /// The user action
        /// </summary>
        private string _userAction;
        /// <summary>
        /// Our reference
        /// </summary>
        private string _ourReference;
        /// <summary>
        /// The remarks
        /// </summary>
        private string _remarks;
        /// <summary>
        /// The created by
        /// </summary>
        private string _createdBy;
        /// <summary>
        /// The created date
        /// </summary>
        private DateTime _createdDate;
        /// <summary>
        /// The updated by
        /// </summary>
        private string _updatedBy;
        /// <summary>
        /// The updated date
        /// </summary>
        private DateTime _updatedDate;

        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        [Key]
        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }


        /// <summary>
        /// Gets or sets the user identifier.
        /// </summary>
        /// <value>The user identifier.</value>
        public int UserID
        {
            get { return _userId; }
            set { _userId = value; }
        }

        /// <summary>
        /// Gets or sets the user action.
        /// </summary>
        /// <value>The user action.</value>
        public string UserAction
        {
            get { return _userAction; }
            set { _userAction = value; }
        }

        /// <summary>
        /// Gets or sets our reference.
        /// </summary>
        /// <value>Our reference.</value>
        public string OurReference
        {
            get { return _ourReference; }
            set { _ourReference = value; }
        }

        /// <summary>
        /// Gets or sets the remarks.
        /// </summary>
        /// <value>The remarks.</value>
        public string Remarks
        {
            get { return _remarks; }
            set { _remarks = value; }
        }


        /// <summary>
        /// Gets or sets the created by.
        /// </summary>
        /// <value>The created by.</value>
        public string CreatedBy
        {
            get { return _createdBy; }
            set { _createdBy = value; }
        }

        /// <summary>
        /// Gets or sets the created date.
        /// </summary>
        /// <value>The created date.</value>
        public DateTime CreatedDate
        {
            get { return _createdDate; }
            set { _createdDate = value; }
        }

        /// <summary>
        /// Gets or sets the updated by.
        /// </summary>
        /// <value>The updated by.</value>
        public string UpdatedBy
        {
            get { return _updatedBy; }
            set { _updatedBy = value; }
        }

        /// <summary>
        /// Gets or sets the updated date.
        /// </summary>
        /// <value>The updated date.</value>
        public DateTime UpdatedDate
        {
            get { return _updatedDate; }
            set { _updatedDate = value; }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="LogInfo"/> class.
        /// </summary>
        public LogInfo()
        {
            this.UserID = 0;
            this.UserAction = string.Empty;
            this.OurReference = string.Empty;
            this.Remarks = string.Empty;
            this.CreatedBy = string.Empty;
            this.CreatedDate = DateTime.Now;
            this.UpdatedBy = string.Empty;
            this.UpdatedDate = DateTime.Now;
        }
    }
}

namespace NextTech.ChaChing123.Core.Filters.ErrorHelper
{
    #region Using namespaces.
    using System;
    using System.Net;
    #endregion

    /// <summary>
    /// Api Exception
    /// </summary>
    [Serializable]
    //[DataContract]
    public class ApiException : Exception, IApiExceptions
    {
        #region Public Serializable properties.
        //[DataMember]
        public int ErrorCode { get; set; }
        //[DataMember]
        public string ErrorDescription { get; set; }
        //[DataMember]
        public HttpStatusCode HttpStatus { get; set; }
        
        string reasonPhrase = "ApiException";

        //[DataMember]
        public string ReasonPhrase
        {
            get { return this.reasonPhrase; }

            set { this.reasonPhrase = value; }
        }
        #endregion
    }
}
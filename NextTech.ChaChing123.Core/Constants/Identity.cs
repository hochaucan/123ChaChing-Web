namespace NextTech.ChaChing123.CoreConstants.Identity
{
    using System;

    [Flags]
    public enum Operations : int
    {
        // delete will also have right to update, create and read and execute
        // update will also have right to update and read and execute
        // create will also have right to create and read and execute
        // All have all right to the resources
        None = 0,
        Read = 1,
        Execute = 2,
        Create = 4,
        Update = 8,
        Delete = 16,
        Review = 32,
        Approve = 64,
        All = 9999
    }

    public class APFRolesConstants
    {
        public const string SystemAdmin = "System Admin";

    }

}

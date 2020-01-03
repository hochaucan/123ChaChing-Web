//====================================================================================================
// Base code generated with APF V0.1 (Build 0.0.0001.0001)
// Application Platform Framework 
//
// Generated on 05/05/2016 
//====================================================================================================
using System;
using System.Net.Http;
using Newtonsoft.Json;
using BTMU.APF.Entities;
using BTMU.APF.Core.Models;
using BTMU.APF.Core.Constants;



// NOTE:
//
// User Process Components are used to abstract the common processing task from 
// the UI or control the UI navigation logic. 
//

namespace NextTech.ChaChing123.UI.Process
{
    /// <summary>
    /// Users controller component.
    /// </summary>
    public partial class UsersProcessComponent : ProcessComponent
    {
        #region custom methods

        /// <summary>
        /// Calls the AddUserRole operation method in the UsersService.
        /// </summary>
        /// <param name="Users">An Users and roles collection object.</param>
        /// <returns>Returns null.</returns>
        public HttpResponseMessage GetUnitsByCode(Units obj)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/users/getunitsbycode";
                result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the AddUserRole operation method in the UsersService.
        /// </summary>
        /// <param name="Users">An Users and roles collection object.</param>
        /// <returns>Returns null.</returns>
        public HttpResponseMessage IsExistingUser(ApplicationUsersViewModel obj)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/users/isexistinguser";
                result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the Get operation method in the UsersService.
        /// </summary>
        /// <param name="id">An Users ID value.</param>
        /// <returns>Returns a Users object.</returns>
        public HttpResponseMessage GetByUserID(int id)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/users/usersuserroles/" + id.ToString();
                result = REST(requestUri, RESTConstants.GET);
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the AddUserRole operation method in the UsersService.
        /// </summary>
        /// <param name="Users">An Users and roles collection object.</param>
        /// <returns>Returns null.</returns>
        public HttpResponseMessage GetUserInfo(Users obj)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/users/userinfo";
                result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the AddUserRole operation method in the UsersService.
        /// </summary>
        /// <param name="Users">An Users and roles collection object.</param>
        /// <returns>Returns null.</returns>
        public HttpResponseMessage AddUserRole(Users obj)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/users/adduserrole";
                result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        #endregion

        /// <summary>
        /// Calls the Get operation method in the UsersService.
        /// </summary>
        /// <param name="id">An Users ID value.</param>
        /// <returns>Returns a Users object.</returns>
        public HttpResponseMessage Get(int id)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/Users/" + id.ToString();
                result = REST(requestUri, RESTConstants.GET);
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the Add operation method in the UsersService.
        /// </summary>
        /// <param name="Users">An Users object.</param>
        /// <returns>Returns a Users object.</returns>
        public HttpResponseMessage Add(UsersViewModel obj)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/Users/Add";
                result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the Edit operation method in the UsersService.
        /// </summary>
        /// <param name="Users">An Users object.</param>
        /// <returns>Returns a Users object.</returns>
        public HttpResponseMessage Edit(UsersViewModel obj)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/Users/Edit";
                result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
                return result;
            }
           catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the Delete operation method in the UsersService.
        /// </summary>
        /// <param name="id">An Users ID.</param>
        /// <returns>Returns a Users object.</returns>
        //public HttpResponseMessage Delete(int id)
        public HttpResponseMessage Delete(Users obj)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/Users/delete";
                result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));

                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the GetAll operation method in the UsersService.
        /// </summary>
        /// <param>Nil</param>
        /// <returns>Returns a list of Users object.</returns>
        public HttpResponseMessage GetAll()
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/Users";
                result = REST(requestUri, RESTConstants.GET);
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

        /// <summary>
        /// Calls the Search operation method in the UsersService.
        /// </summary>
        /// <param>Search Object</param>
        /// <returns>Returns a list of Users object.</returns>
        public HttpResponseMessage Search(SearchFilter obj)
        {
            try
            {
                HttpResponseMessage result = default(HttpResponseMessage);
                string requestUri = "api/Users/search";
                result = REST(requestUri, RESTConstants.POST, JsonConvert.SerializeObject(obj));
                return result;
            }
            catch (Exception ex)
            {
                // exception raise to the UI.
                // Do not display sensitive information to the UI.
                throw new ApplicationException(ex.Message);
            }
        }

    }
}

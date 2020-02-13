/// <summary>
/// <author>Ngo tan  Phuc</author>
/// <description>Created date: </description>
/// <revision history>Version: 1.0.1</revision history>
/// </summary>

namespace NextTech.ChaChing123.Business
{
    using NextTech.ChaChing123.Entities;
    using System.Linq;
    using NextTech.ChaChing123.Common.Models;
    using NextTech.ChaChing123.Core.Models;

    /// <summary>
    /// Interface IAccountService
    /// </summary>
    public interface IAccountService
    {
        ResultDTO CheckLogin(CheckLoginDTO obj);

        ResultDTO Login(LoginModel obj);

        ResultDTO Register(RegisterDTO obj);

        ResultDTO Edit(EditAccountDTO obj);

        ResultDTO Delete(DeleteAccountDTO obj);

        ResultDTO ChangePassword(ChangePasswordModel obj);

        ResultDTO Logout(LogoutDTO obj);

        ResultDTO GetAccountInfo(RequestDTO id);

        IQueryable<Account> GetAllData(Paging obj);
    }
}

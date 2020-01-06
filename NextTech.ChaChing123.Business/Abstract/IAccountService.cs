using NextTech.ChaChing123.Common.Models;
using NextTech.ChaChing123.Core.Models;

namespace NextTech.ChaChing123.Business
{
    using NextTech.ChaChing123.Business.Utilities;
    using NextTech.ChaChing123.Entities;
    using System.Linq;

    /// <summary>
    /// Interface IAccountService
    /// </summary>
    public interface IAccountService
    {
        ResultDTO CheckLogin(CheckLoginDTO obj);

        Account Login(LoginModel obj);

        ResultDTO Register(RegisterDTO obj);

        ResultDTO ActiveAccount(ActiveAccountDTO obj);

        ResultDTO Edit(EditAccountDTO obj);

        ResultDTO Delete(DeleteAccountDTO obj);

        ResultDTO ChangePassword(ChangePasswordModel obj);

        ResultDTO Logout(LogoutDTO obj);

        ResultDTO ChangeAccountType(ChangeAccountTypeDTO obj);

        ResultDTO LockAccount(LockAccountDTO obj);

        ResultDTO LockAffilate(LockAffilateDTO obj);

        ResultDTO GetAccountInfo(int id);

        IQueryable<Account> GetAllData(Paging obj);
        MembershipContext ValidateUser(string username, string password);
    }
}

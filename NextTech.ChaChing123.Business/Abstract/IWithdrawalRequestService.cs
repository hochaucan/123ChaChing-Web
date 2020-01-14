using NextTech.ChaChing123.Entities.ChaChing123;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NextTech.ChaChing123.Business.Abstract
{
    public interface IWithdrawalRequestService
    {
        RequestWithdrawalInfo Add(RequestWithdrawalInfo obj);
    }
}

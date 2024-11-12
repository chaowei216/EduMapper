using Common.DTO;
using Firebase.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.IService
{
    public interface IStatisticService
    {

        /// <summary>
        /// Get statistic of system
        /// </summary>
        /// <returns></returns>
        Task<StatisticSystemDTO> GetStatisticOfSystem();

    }
}

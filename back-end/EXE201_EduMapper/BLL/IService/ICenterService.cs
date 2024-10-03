using Common.DTO;
using Common.DTO.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.IService
{
    public interface ICenterService
    {
        /// <summary>
        /// Get all exams
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetAllCenters(CenterParameters request);

        /// <summary>
        /// Get all passages
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetCenterById(string id);
    }
}

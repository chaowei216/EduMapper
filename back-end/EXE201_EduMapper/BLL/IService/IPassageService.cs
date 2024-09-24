
using Common.DTO;
using Common.DTO.Passage;
using Common.DTO.Question;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.IService
{
    public interface IPassageService
    {
        /// <summary>
        /// Get all passages
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetAllPassages(QueryDTO request);

        /// <summary>
        /// Get passage of test by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetPassageById(string id);

        /// <summary>
        /// Create passage of test 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ResponseDTO CreatePassage(PassageCreateDTO passage);
    }
}

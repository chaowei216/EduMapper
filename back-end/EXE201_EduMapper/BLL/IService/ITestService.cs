using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Query;
using Common.DTO.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.IService
{
    public interface ITestService
    {
        /// <summary>
        /// Get reading exam of test
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetReadingTestById(string id);

        /// <summary>
        /// Get writing exam of test
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetWritingTestById(string id);

        /// <summary>
        /// Get listening exam of test
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetListeningTestById(string id);

        /// <summary>
        /// Create test 
        /// </summary>
        /// <param name="test"></param>
        /// <returns></returns>
        Task<ResponseDTO> CreateTest(TestCreateDTO test);

        /// <summary>
        /// Get listening exam of test
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetAllTest(TestParameters request);


    }
}

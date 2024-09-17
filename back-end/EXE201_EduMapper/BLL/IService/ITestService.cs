using Common.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.IService
{
    public interface ITestService
    {
        Task<ResponseDTO> GetReadingTestById(string id);
        Task<ResponseDTO> GetWritingTestById(string id);
        Task<ResponseDTO> GetListeningTestById(string id);
    }
}

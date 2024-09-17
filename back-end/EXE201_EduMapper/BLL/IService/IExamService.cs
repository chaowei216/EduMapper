using Common.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.IService
{
    public interface IExamService
    {
        Task<ResponseDTO> GetExamById(string id);
    }
}

using Common.DTO;
using Common.DTO.Question;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.IService
{
    public interface IQuestionService
    {
        Task<ResponseDTO> GetQuestionById(string id);
        ResponseDTO CreateQuestion(CreateQuestionDTO question);
    }
}

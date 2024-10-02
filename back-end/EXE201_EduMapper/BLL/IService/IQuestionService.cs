using Common.DTO;
using Common.DTO.MemberShip;
using Common.DTO.Query;
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
        /// <summary>
        /// Get all questions
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetAllQuestions(QuestionParameters request);

        /// <summary>
        /// Get free questions
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetFreeQuestions(QuestionParameters request);

        /// <summary>
        /// Get question of test by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetQuestionById(string id);

        /// <summary>
        /// Create question
        /// </summary>
        /// <param name="question"></param>
        /// <returns></returns>
        ResponseDTO CreateQuestion(QuestionCreateDTO question);

        /// <summary>
        /// Update question
        /// </summary>
        /// <param name="question"></param>
        /// <returns></returns>
        Task UpdateQuestion(string id, QuestionCreateDTO question);

        /// <summary>
        /// Delete question
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteQuestion(string id);
    }
}

using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Passage;
using Common.DTO.Progress;
using Common.DTO.Query;
using Common.DTO.Test;
using Common.DTO.UserAnswer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.IService
{
    public interface IExamService
    {
        /// <summary>
        /// Get all exams
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetAllExams(ExamParameters request);

        /// <summary>
        /// Get exam by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetExamById(string id);

        /// <summary>
        /// Create exam of test 
        /// </summary>
        /// <param name="exam"></param>
        /// <returns></returns>
        Task<ResponseDTO> CreateExam(ExamCreateDTO exam);

        /// <summary>
        /// Create exam of test 
        /// </summary>
        /// <param name="progress"></param>
        /// <returns></returns>
        Task<ResponseDTO> StartExam(ProgressCreateDTO progress);

        /// <summary>
        /// Create exam of test 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> AnswerQuestion(AnswerDTO request);

        /// <summary>
        /// Answer writing question
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> AnswerWritingQuestion(AnswerWritingDTO request);

        /// <summary>
        /// Submit test
        /// </summary>
        /// <param name="exam"></param>
        /// <returns></returns>
        Task<ResponseDTO> SubmitAnswer(SubmitExamDTO exam);

        /// <summary>
        /// Get user answer
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetUserAnswer(GetFinishDTO request);

        /// <summary>
        /// Request speaking
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> RequestSpeakingExam(RequestSpeakingDTO request);

        /// <summary>
        /// Get speaking request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetSpeakingRequest(ExamParameters request);

        /// <summary>
        /// Get user answer
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> SendSpeakingEmail(ScheduleSpeakingDTO request);

        /// <summary>
        /// Get user answer (writing)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetWritingAnswer(ExamParameters request);

        /// <summary>
        /// Get user answer (writing)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetWritingAnswerById(GetFinishDTO request);

        /// <summary>
        /// Get user answer (writing)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> GetWritingExamAnswer(ExamParameters request);

        /// <summary>
        /// Get user answer (writing)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> ScoreWritingExam(ScoreWritingDTO request);

        /// <summary>
        /// Get user answer (writing)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ResponseDTO> ScoreReadingExam(ScoreReadingExam request);
    }
}

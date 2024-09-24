﻿using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Passage;
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
        Task<ResponseDTO> GetAllExams(QueryDTO request);

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
    }
}

﻿
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
        /// Create ielts passage of test 
        /// </summary>
        /// <param name="passage"></param>
        /// <returns></returns>
        ResponseDTO CreateIELTSPassage(PassageIELTSCreateDTO passage);

        /// <summary>
        /// Create passage except ielts of test 
        /// </summary>
        /// <param name="passage"></param>
        /// <returns></returns>
        ResponseDTO CreatePassage(PassageCreateDTO passage);

        /// <summary>
        /// Add question to passage
        /// </summary>
        /// <param name="passage"></param>
        /// <returns></returns>
        Task<ResponseDTO> AddQuestionToPassage(AddQuestionDTO passage);
    }
}

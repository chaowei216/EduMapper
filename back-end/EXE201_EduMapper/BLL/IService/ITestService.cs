﻿using Common.DTO;
using Common.DTO.Exam;
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
        Task<ResponseDTO> GetReadingTestById(string id);
        Task<ResponseDTO> GetWritingTestById(string id);
        Task<ResponseDTO> GetListeningTestById(string id);

        /// <summary>
        /// Create test 
        /// </summary>
        /// <param name="test"></param>
        /// <returns></returns>
        Task<ResponseDTO> CreateTest(TestCreateDTO test);

    }
}

using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Exam;
using Common.Constant.Message;
using Common.Constant.Message.Auth;
using Common.DTO;
using Common.DTO.Test;
using Common.Enum;
using DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Service
{
    public class TestService: ITestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TestService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> GetListeningTestById(string id)
        {
            var test = await _unitOfWork.TestRepository.Get(includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                                       "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices",
                                                filter: c => c.TestId == id);

            foreach (var item in test)
            {
                item.Exams = item.Exams.Where(e => e.ExamName.Contains(ExamNameConstant.ListeningTest)).ToList();
            }

            if (test == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            var mapList = _mapper.Map<List<TestDTO>>(test);
            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mapList,
                StatusCode = StatusCodeEnum.OK,
                Message = GeneralMessage.GetSuccess
            };
        }

        public async Task<ResponseDTO> GetReadingTestById(string id)
        {
            var test = await _unitOfWork.TestRepository.Get(includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                                                   "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices",
                                                            filter: c => c.TestId == id);

            foreach (var item in test)
            {
                item.Exams = item.Exams.Where(e => e.ExamName.Contains(ExamNameConstant.ReadingTest)).ToList();
            }

            if (test == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            var mapList = _mapper.Map<List<TestDTO>>(test);
            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mapList,
                StatusCode = StatusCodeEnum.OK,
                Message = GeneralMessage.GetSuccess
            };
        }

        public async Task<ResponseDTO> GetWritingTestById(string id)
        {
            var test = await _unitOfWork.TestRepository.Get(includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                                       "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices",
                                                filter: c => c.TestId == id);

            foreach (var item in test)
            {
                item.Exams = item.Exams.Where(e => e.ExamName.Contains(ExamNameConstant.WritingTest)).ToList();
            }

            if (test == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            var mapList = _mapper.Map<List<TestDTO>>(test);
            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mapList,
                StatusCode = StatusCodeEnum.OK,
                Message = GeneralMessage.GetSuccess
            };
        }
    }
}

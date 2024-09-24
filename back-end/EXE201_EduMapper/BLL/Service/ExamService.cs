using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Passage;
using Common.DTO.Test;
using Common.Enum;
using DAL.Models;
using DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Service
{
    public class ExamService : IExamService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ExamService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> CreateExam(ExamCreateDTO exam)
        {
            var mapQuestion = _mapper.Map<Exam>(exam);
            int numOfQuestion = 0;
            mapQuestion.ExamId = Guid.NewGuid().ToString();

            foreach (var passage in exam.PassageIds)
            {
                var thisPassage = await _unitOfWork.PassageRepository.Get(c => c.PassageId == passage, 
                                                                          includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers");
                foreach (var pas in thisPassage)
                {
                    if (pas != null && pas.ExamId == null)
                    {
                        pas.ExamId = mapQuestion.ExamId;
                    }

                    _unitOfWork.PassageRepository.Update(pas);

                    foreach (var question in pas.SubQuestion)
                    {
                        var cPassage = await _unitOfWork.QuestionRepository.Get(c => c.PassageId == passage);

                        int count = cPassage.Count();

                        numOfQuestion = count;
                    }
                }
            }
            mapQuestion.NumOfQuestions = numOfQuestion;
            _unitOfWork.ExamRepository.Insert(mapQuestion);

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapQuestion
            };
        }

        public async Task<ResponseDTO> GetAllExams(QueryDTO request)
        {
            var response = await _unitOfWork.ExamRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                        ? p => p.ExamName.Contains(request.Search.Trim())
                                                                        : null,
                                                                orderBy: null,
                                                                pageIndex: request.PageIndex,
                                                                pageSize: request.PageSize,
                                                                includeProperties: "Passages,Passages.SubQuestion," +
                                                                                   "Passages.Sections,Passages.SubQuestion.Choices");

            var mapPassage = _mapper.Map<List<ExamDTO>>(response);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mapPassage
            };
        }

        public async Task<ResponseDTO> GetExamById(string id)
        {
            var exams = await _unitOfWork.ExamRepository.Get(includeProperties: "Passages,Passages.SubQuestion," +
                                                                                   "Passages.Sections,Passages.SubQuestion.Choices",
                                                            filter: c => c.ExamId == id);


            if (exams == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            var mapList = _mapper.Map<List<TestDTO>>(exams);
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

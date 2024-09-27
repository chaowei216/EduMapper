﻿using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Exam;
using Common.Constant.Message;
using Common.Constant.Progress;
using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Progress;
using Common.DTO.Test;
using Common.Enum;
using DAL.Models;
using DAL.UnitOfWork;

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

        public async Task<ResponseDTO> AnswerQuestion(AnswerDTO request)
        {
            foreach(var answer in request.Answers)
            {
                var mapAnswer = _mapper.Map<UserAnswer>(answer);

                mapAnswer.UserAnswerId = Guid.NewGuid().ToString();
                mapAnswer.CreateAt = DateTime.Now;

                var question = await _unitOfWork.QuestionRepository.GetByID(answer.QuestionId);
                    
                if(question != null && question.PassageId != null)
                {
                    var passage = await _unitOfWork.PassageRepository.GetByID(question.PassageId);

                    if(passage != null && passage.ExamId != null)
                    {
                        var exam = await _unitOfWork.ExamRepository.GetByID(passage.ExamId);
                        if(exam != null)
                        {
                            var progress = await _unitOfWork.ProgressRepository.Get(filter: c => c.UserId == answer.UserId && c.ExamId == exam.ExamId);
                            var thisProgress = progress.FirstOrDefault();

                            var questionCount = request.Answers.Count();
                            if(thisProgress != null)
                            {
                                var percent = (questionCount / exam.NumOfQuestions) * 100;
                                thisProgress.Percent = percent;
                                thisProgress.ProgressId = thisProgress.ProgressId;
                                thisProgress.UpdatedDate = DateTime.Now;
                                thisProgress.TestedDate = thisProgress.TestedDate;
                                thisProgress.Score = thisProgress.Score;
                                _unitOfWork.ProgressRepository.Update(thisProgress);
                            }

                        }
                    }
                }

                _unitOfWork.UserAnswerRepository.Insert(mapAnswer);

                _unitOfWork.Save();
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = SaveAnswerSuccess.SaveAnswerSuccessfully,
                StatusCode = StatusCodeEnum.Created,
                MetaData = request
            };
        }

        public async Task<ResponseDTO> CreateExam(ExamCreateDTO exam)
        {
            var mapQuestion = _mapper.Map<Exam>(exam);
            int numOfQuestion = 0;
            mapQuestion.ExamId = Guid.NewGuid().ToString();

            if (exam.PassageIds != null)
            {
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

        public async Task<ResponseDTO> StartExam(ProgressCreateDTO progress)
        {
            var mapProgress = _mapper.Map<Progress>(progress);
            mapProgress.ProgressId = Guid.NewGuid().ToString();
            mapProgress.TestedDate = DateTime.Now;
            mapProgress.Status = ProgressStatus.InProgress;

            var user = await _unitOfWork.UserRepository.GetByID(progress.UserId);
            var exam = await _unitOfWork.ExamRepository.GetByID(progress.ExamId);

            if (exam == null || user == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            _unitOfWork.ProgressRepository.Insert(mapProgress);
            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mapProgress,
                StatusCode = StatusCodeEnum.Created,
                Message = GeneralMessage.CreateSuccess
            };
        }
    }
}

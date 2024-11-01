﻿using AutoMapper;
using Azure;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Exam;
using Common.Constant.Message;
using Common.Constant.Message.Email;
using Common.Constant.Notification;
using Common.Constant.Progress;
using Common.Constant.Test;
using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Notification;
using Common.DTO.Progress;
using Common.DTO.Query;
using Common.DTO.Test;
using Common.DTO.UserAnswer;
using Common.Enum;
using DAL.Models;
using DAL.UnitOfWork;
using Google.Apis.Storage.v1.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace BLL.Service
{
    public class ExamService : IExamService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;

        public ExamService(IUnitOfWork unitOfWork, IMapper mapper, IEmailService emailService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task<ResponseDTO> AnswerQuestion(AnswerDTO request)
        {
            foreach (var answer in request.Answers)
            {
                var mapAnswer = _mapper.Map<UserAnswer>(answer);
                mapAnswer.IsCorrect = false;

                if ((answer.ChoiceId != null && answer.UserChoice == null) || (answer.ChoiceId != null && answer.UserChoice != null))
                {
                    var choice = await _unitOfWork.QuestionChoiceRepository.GetByID(answer.ChoiceId);
                    mapAnswer.UserChoice = choice.ChoiceContent;

                    var correct = await _unitOfWork.QuestionRepository.GetByID(answer.QuestionId);
                    if (mapAnswer.UserChoice.ToLower().Equals(correct.CorrectAnswer.ToLower()))
                    {
                        mapAnswer.IsCorrect = true;
                    }
                }
                else if (answer.ChoiceId == null && answer.UserChoice != null)
                {
                    var correct = await _unitOfWork.QuestionRepository.GetByID(answer.QuestionId);
                    if (answer.UserChoice.ToLower().Equals(correct.CorrectAnswer.ToLower()))
                    {
                        mapAnswer.IsCorrect = true;
                    }
                }
                else if ((answer.ChoiceId == null && answer.UserChoice == null))
                {
                    return new ResponseDTO
                    {
                        IsSuccess = false,
                        Message = ExamMessage.SaveAnswerSuccessfully,
                        StatusCode = StatusCodeEnum.BadRequest,
                        MetaData = request
                    };
                }

                var question = await _unitOfWork.QuestionRepository.GetByID(answer.QuestionId);

                if (question != null && question.PassageId != null)
                {
                    var passage = await _unitOfWork.PassageRepository.GetByID(question.PassageId);

                    if (passage != null && passage.ExamId != null)
                    {
                        var exam = await _unitOfWork.ExamRepository.GetByID(passage.ExamId);
                        if (exam != null)
                        {
                            var userAns = await _unitOfWork.ProgressRepository.Get(filter: c => c.UserId == answer.UserId && c.ExamId == exam.ExamId);
                            var thisAns = userAns.FirstOrDefault();

                            var questionCount = request.Answers.Count();
                            if (thisAns != null)
                            {
                                var percent = ((double)questionCount / exam.NumOfQuestions) * 100;
                                thisAns.Percent = percent;
                                thisAns.ProgressId = thisAns.ProgressId;
                                thisAns.UpdatedDate = DateTime.Now;
                                thisAns.TestedDate = thisAns.TestedDate;
                                thisAns.Score = thisAns.Score;
                                _unitOfWork.ProgressRepository.Update(thisAns);
                            }
                        }
                    }
                }

                var thisAnswer = await _unitOfWork.UserAnswerRepository.Get(filter: c => c.UserId == answer.UserId && c.QuestionId == answer.QuestionId);
                var first = thisAnswer.FirstOrDefault();

                if (first != null)
                {
                    mapAnswer.UserAnswerId = first.UserAnswerId;
                    mapAnswer.CreateAt = first.CreateAt;
                    _unitOfWork.UserAnswerRepository.Update(mapAnswer);
                }
                else
                {
                    mapAnswer.UserAnswerId = Guid.NewGuid().ToString();
                    mapAnswer.CreateAt = DateTime.Now;

                    _unitOfWork.UserAnswerRepository.Insert(mapAnswer);
                }

                _unitOfWork.Save();
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = ExamMessage.SaveAnswerSuccessfully,
                StatusCode = StatusCodeEnum.Created,
                MetaData = request
            };
        }

        public async Task<ResponseDTO> CreateExam(ExamCreateDTO exam)
        {
            var mapQuestion = _mapper.Map<Exam>(exam);
            int numOfQuestion = 0;
            mapQuestion.ExamId = Guid.NewGuid().ToString();
            mapQuestion.ExamName = exam.ExamNameType + "_" + exam.ExamNames;

            _unitOfWork.ExamRepository.Insert(mapQuestion);

            try
            {
                _unitOfWork.Save();
            }
            catch (Exception ex)
            {
                return new ResponseDTO
                {
                    IsSuccess = false,
                    Message = ex.InnerException?.Message ?? ex.Message,
                    StatusCode = StatusCodeEnum.InteralServerError,
                };
            }

            if (exam.PassageIds != null)
            {
                foreach (var passage in exam.PassageIds)
                {
                    var thisPassage = await _unitOfWork.PassageRepository.Get(
                        c => c.PassageId == passage,
                        includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers"
                    );

                    foreach (var pas in thisPassage)
                    {
                        if (pas != null && pas.ExamId != null)
                        {
                            return new ResponseDTO
                            {
                                IsSuccess = false,
                                Message = ExamMessage.DuplicateExam,
                                StatusCode = StatusCodeEnum.BadRequest,
                            };
                        }

                        pas.ExamId = mapQuestion.ExamId;
                        _unitOfWork.PassageRepository.Update(pas);

                        foreach (var question in pas.SubQuestion)
                        {
                            var cPassage = await _unitOfWork.QuestionRepository.Get(c => c.PassageId == passage);
                            numOfQuestion += 1;
                        }

                        try
                        {
                            _unitOfWork.Save();
                        }
                        catch (Exception ex)
                        {
                            return new ResponseDTO
                            {
                                IsSuccess = false,
                                Message = ex.InnerException?.Message ?? ex.Message,
                                StatusCode = StatusCodeEnum.InteralServerError,
                            };
                        }
                    }
                }
            }

            if (exam.ExamType.ToLower().Contains(TestType.IELTS.ToLower()) && numOfQuestion > 40)
            {
                if (exam.PassageIds != null)
                {
                    foreach (var passage in exam.PassageIds)
                    {
                        var thisPassage = await _unitOfWork.PassageRepository.Get(
                            c => c.PassageId == passage,
                            includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers"
                        );

                        foreach (var pas in thisPassage)
                        {

                            pas.ExamId = null;
                            _unitOfWork.PassageRepository.Update(pas);

                            try
                            {
                                _unitOfWork.Save();
                            }
                            catch (Exception ex)
                            {
                                return new ResponseDTO
                                {
                                    IsSuccess = false,
                                    Message = ex.InnerException?.Message ?? ex.Message,
                                    StatusCode = StatusCodeEnum.InteralServerError,
                                };
                            }
                        }
                    }
                }
                await _unitOfWork.ExamRepository.Delete(mapQuestion.ExamId);

                try
                {
                    _unitOfWork.Save();
                }
                catch (Exception ex)
                {
                    return new ResponseDTO
                    {
                        IsSuccess = false,
                        Message = ex.InnerException?.Message ?? ex.Message,
                        StatusCode = StatusCodeEnum.InteralServerError,
                    };
                }
                return new ResponseDTO
                {
                    IsSuccess = false,
                    Message = ExamMessage.ExceedLimitQuestion,
                    StatusCode = StatusCodeEnum.BadRequest,
                };
            }

            if (exam.ExamType.ToLower().Contains(TestType.TOEIC.ToLower()) && numOfQuestion > 100)
            {
                if (exam.PassageIds != null)
                {
                    foreach (var passage in exam.PassageIds)
                    {
                        var thisPassage = await _unitOfWork.PassageRepository.Get(
                            c => c.PassageId == passage,
                            includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers"
                        );

                        foreach (var pas in thisPassage)
                        {

                            pas.ExamId = null;
                            _unitOfWork.PassageRepository.Update(pas);

                            try
                            {
                                _unitOfWork.Save();
                            }
                            catch (Exception ex)
                            {
                                return new ResponseDTO
                                {
                                    IsSuccess = false,
                                    Message = ex.InnerException?.Message ?? ex.Message,
                                    StatusCode = StatusCodeEnum.InteralServerError,
                                };
                            }
                        }
                    }
                }
                await _unitOfWork.ExamRepository.Delete(mapQuestion.ExamId);

                try
                {
                    _unitOfWork.Save();
                }
                catch (Exception ex)
                {
                    return new ResponseDTO
                    {
                        IsSuccess = false,
                        Message = ex.InnerException?.Message ?? ex.Message,
                        StatusCode = StatusCodeEnum.InteralServerError,
                    };
                }
                return new ResponseDTO
                {
                    IsSuccess = false,
                    Message = ExamMessage.ExceedLimitQuestion,
                    StatusCode = StatusCodeEnum.BadRequest,
                };
            }

            mapQuestion.NumOfQuestions = numOfQuestion;

            try
            {
                _unitOfWork.Save();
            }
            catch (Exception ex)
            {
                return new ResponseDTO
                {
                    IsSuccess = false,
                    Message = ex.InnerException?.Message ?? ex.Message,
                    StatusCode = StatusCodeEnum.InteralServerError,
                };
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapQuestion
            };
        }


        public async Task<ResponseDTO> GetAllExams(ExamParameters request)
        {
            var response = await _unitOfWork.ExamRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                        ? p => p.ExamName.Contains(request.Search.Trim())
                                                                        : null,
                                                                orderBy: null,
                                                                pageSize: request.PageSize,
                                                                pageIndex: request.PageNumber,
                                                                includeProperties: "Progress,Passages,Passages.SubQuestion," +
                                                                                   "Passages.Sections,Passages.SubQuestion.Choices,Passages.SubQuestion.UserAnswers");

            var response1 = await _unitOfWork.ExamRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                        ? p => p.ExamName.Contains(request.Search.Trim())
                                                                        : null,
                                                                orderBy: null,
                                                                includeProperties: "Progress,Passages,Passages.SubQuestion," +
                                                                                   "Passages.Sections,Passages.SubQuestion.Choices,Passages.SubQuestion.UserAnswers");
            var totalCount = response1.Count();
            var items = response.ToList();

            // Create the PagedList and map the results
            var pageList = new PagedList<Exam>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<ExamDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<ExamDTO>>(items);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
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

            var mapList = _mapper.Map<List<ExamDTO>>(exams);
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

            var checkExist = await _unitOfWork.ProgressRepository.Get(filter: c => c.ExamId == progress.ExamId && c.UserId == progress.UserId);
            var checkExist1 = checkExist.FirstOrDefault();
            if (checkExist1 != null)
            {
                checkExist1.ProgressId = checkExist1.ProgressId;
                checkExist1.Score = 0;
                checkExist1.Percent = 0;
                checkExist1.Status = ProgressStatus.InProgress;
                checkExist1.UpdatedDate = null;
                checkExist1.ExamId = checkExist1.ExamId;
                checkExist1.UserId = checkExist1.UserId;
                checkExist1.TestedDate = DateTime.Now;
                _unitOfWork.ProgressRepository.Update(checkExist1);
                _unitOfWork.Save();

                var passage = await _unitOfWork.PassageRepository.Get(filter: c => c.ExamId == progress.ExamId);
                foreach (var eachPassage in passage)
                {
                    var question = await _unitOfWork.QuestionRepository.Get(filter: c => c.PassageId == eachPassage.PassageId);

                    foreach (var eachQuestion in question)
                    {
                        var answer = await _unitOfWork.UserAnswerRepository.Get(filter: c => c.UserId == progress.UserId && c.QuestionId == eachQuestion.QuestionId);

                        foreach (var eachAnswer in answer)
                        {
                            if (eachAnswer != null)
                            {
                                _unitOfWork.UserAnswerRepository.Delete(eachAnswer);
                                _unitOfWork.Save();
                            }
                        }
                    }
                }
            }
            else
            {

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
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mapProgress,
                StatusCode = StatusCodeEnum.Created,
                Message = GeneralMessage.CreateSuccess
            };
        }

        private double? TOEICExamScore(int correctAns)
        {
            double? score = 0;
            if (correctAns < 3)
            {
                score = 5;
            }
            else
            {
                score = correctAns * 5;
            }

            return score;
        }

        private double? IELTSExamScore(int correctAns)
        {
            double? score = 0;
            if (correctAns < 3)
            {
                score = 0;
            }

            if (correctAns >= 3 && correctAns <= 4)
            {
                score = 2.5;
            }

            if (correctAns >= 5 && correctAns <= 6)
            {
                score = 3;
            }

            if (correctAns >= 7 && correctAns <= 9)
            {
                score = 3.5;
            }

            if (correctAns >= 10 && correctAns <= 12)
            {
                score = 4;
            }

            if (correctAns >= 13 && correctAns <= 15)
            {
                score = 4.5;
            }

            if (correctAns >= 16 && correctAns <= 19)
            {
                score = 5;
            }

            if (correctAns >= 20 && correctAns <= 22)
            {
                score = 5.5;
            }

            if (correctAns >= 23 && correctAns <= 26)
            {
                score = 6;
            }

            if (correctAns >= 27 && correctAns <= 29)
            {
                score = 6.5;
            }

            if (correctAns >= 30 && correctAns <= 32)
            {
                score = 7;
            }

            if (correctAns >= 33 && correctAns <= 34)
            {
                score = 7.5;
            }

            if (correctAns >= 35 && correctAns <= 36)
            {
                score = 8;
            }

            if (correctAns >= 37 && correctAns <= 38)
            {
                score = 8.5;
            }

            if (correctAns >= 39 && correctAns <= 40)
            {
                score = 9;
            }

            return score;
        }

        public async Task<ResponseDTO> SubmitAnswer(SubmitExamDTO exam)
        {
            var progress = await _unitOfWork.ProgressRepository.Get(filter: c => c.ExamId == exam.ExamId && c.UserId == exam.UserId);
            var thisProgress = progress.FirstOrDefault();
            int countCorrect = 0;

            thisProgress.Percent = 100;
            thisProgress.Status = ProgressStatus.Done;
            var passage = await _unitOfWork.PassageRepository.Get(filter: c => c.ExamId == exam.ExamId);

            foreach (var eachPassage in passage)
            {
                var question = await _unitOfWork.QuestionRepository.Get(filter: c => c.PassageId == eachPassage.PassageId);
                foreach (var eachQuestion in question)
                {
                    var answer = await _unitOfWork.UserAnswerRepository.Get(filter: c => c.UserId == exam.UserId && c.QuestionId == eachQuestion.QuestionId);

                    var thisAns = answer.FirstOrDefault();

                    if (thisAns != null && thisAns.IsCorrect == true)
                    {
                        countCorrect++;
                    }
                }
            }

            var thisExam = await _unitOfWork.ExamRepository.GetByID(exam.ExamId);

            if (thisExam == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            if (thisExam != null && thisExam.ExamType.ToLower().Contains(TestType.IELTS.ToLower())
                && !thisExam.ExamName.ToLower().Contains(ExamNameConstant.WritingTest))
            {
                thisProgress.Score = IELTSExamScore(countCorrect);
            }
            else if (thisExam != null && thisExam.ExamType.ToLower().Contains(TestType.TOEIC.ToLower())
                && !thisExam.ExamName.ToLower().Contains(ExamNameConstant.WritingTest))
            {
                thisProgress.Score = TOEICExamScore(countCorrect);
            }

            _unitOfWork.ProgressRepository.Update(thisProgress);
            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = thisProgress,
                StatusCode = StatusCodeEnum.Created,
                Message = ExamMessage.SubmitExam
            };
        }

        public async Task<ResponseDTO> GetUserAnswer(GetFinishDTO request)
        {
            var exam = await _unitOfWork.ExamRepository.Get(filter: c => c.ExamId == request.ExamId,
                                                            includeProperties: "Progress,Passages,Passages.SubQuestion," +
                                                                               "Passages.Sections,Passages.SubQuestion.Choices,Passages.SubQuestion.UserAnswers");

            var eachExam = exam.FirstOrDefault();
            List<CheckAnswerDTO> response = new List<CheckAnswerDTO>();
            var progress = await _unitOfWork.ProgressRepository.Get(filter: c => c.ExamId == request.ExamId && c.UserId == request.UserId);
            var thisProgress = progress.FirstOrDefault();
            int totalCorrectAnswers = 0;

            if (eachExam != null && thisProgress != null)
            {
                foreach (var pas in eachExam.Passages)
                {
                    var passage = await _unitOfWork.PassageRepository.GetByID(pas.PassageId);
                    if (passage != null)
                    {
                        foreach (var ques in passage.SubQuestion)
                        {
                            var userAnswers = await _unitOfWork.UserAnswerRepository.Get(filter: c => c.QuestionId == ques.QuestionId && c.UserId == request.UserId);
                            var eachAnswer = userAnswers.FirstOrDefault();

                            var eachResponse = new CheckAnswerDTO();

                            if (eachAnswer != null)
                            {
                                eachResponse.QuestionIndex = ques.QuestionIndex;
                                eachResponse.IsCorrect = eachAnswer.IsCorrect;
                                eachResponse.QuestionText = ques.QuestionText;
                                eachResponse.UserChoice = eachAnswer.UserChoice;
                                eachResponse.CorrectAnswer = ques.CorrectAnswer;

                                if (eachAnswer.IsCorrect != null && eachAnswer.IsCorrect == true)
                                {
                                    totalCorrectAnswers++;
                                }

                                response.Add(eachResponse);
                            }
                            else
                            {
                                eachResponse.QuestionIndex = ques.QuestionIndex;
                                eachResponse.IsCorrect = false;
                                eachResponse.QuestionText = ques.QuestionText;
                                eachResponse.UserChoice = null;
                                eachResponse.CorrectAnswer = ques.CorrectAnswer;

                                response.Add(eachResponse);
                            }
                        }
                    }
                }
            }
            TimeSpan? duration = null;

            if (thisProgress.TestedDate != null && thisProgress.UpdatedDate != null)
            {
                duration = thisProgress.UpdatedDate - thisProgress.TestedDate;

            }
            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = new
                {
                    Answers = response,
                    TotalCorrect = totalCorrectAnswers,
                    Time = duration,
                    Score = thisProgress.Score
                },
                StatusCode = StatusCodeEnum.OK,
                Message = ExamMessage.GetAnswers
            };
        }


        public ResponseDTO SendSpeakingEmail(ScheduleSpeakingDTO request)
        {
            _emailService.SendSpeakingTestEmail(request, EmailMessage.SpeakingEmailSubject);

            return new ResponseDTO
            {
                IsSuccess = true,
                StatusCode = StatusCodeEnum.OK,
                Message = ExamMessage.GetAnswers
            };
        }

        public async Task<ResponseDTO> RequestSpeakingExam(ProgressCreateDTO request)
        {
            var mapProgress = _mapper.Map<Progress>(request);

            var progress = await _unitOfWork.ProgressRepository.Get(filter: c => c.UserId == request.UserId && c.ExamId == request.ExamId);
            var thisProgress = progress.FirstOrDefault();

            if (thisProgress != null)
            {
                thisProgress.ProgressId = thisProgress.ProgressId;
                thisProgress.Score = 0;
                thisProgress.Percent = 0;
                thisProgress.Status = ProgressStatus.InProgress;
                thisProgress.UpdatedDate = null;
                thisProgress.ExamId = thisProgress.ExamId;
                thisProgress.UserId = thisProgress.UserId;
                thisProgress.TestedDate = DateTime.Now;
                _unitOfWork.ProgressRepository.Update(thisProgress);
                _unitOfWork.Save();
            }
            else
            {
                mapProgress.ProgressId = Guid.NewGuid().ToString();
                mapProgress.TestedDate = DateTime.Now;
                mapProgress.Status = ProgressStatus.InProgress;

                var user = await _unitOfWork.UserRepository.GetByID(request.UserId);
                var exam = await _unitOfWork.ExamRepository.GetByID(request.ExamId);

                if (exam == null || user == null)
                {
                    throw new NotFoundException(GeneralMessage.NotFound);
                }

                _unitOfWork.ProgressRepository.Insert(mapProgress);
                _unitOfWork.Save();
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mapProgress,
                StatusCode = StatusCodeEnum.Created,
                Message = GeneralMessage.CreateSuccess
            };
        }

        public async Task<ResponseDTO> GetSpeakingRequest(ExamParameters request)
        {
            var progress = await _unitOfWork.ProgressRepository.Get(includeProperties: "User,Exam",
                                                                    filter: c => (c.Exam.ExamName.ToLower().Trim().Contains(ExamNameConstant.SpeakingTest.ToLower()))
                                                                    && (string.IsNullOrEmpty(request.Search) ||
                                                                    c.Status.ToLower().Trim().Contains(request.Search.ToLower().Trim())),
                                                                    pageSize: request.PageSize,
                                                                    pageIndex: request.PageNumber);

            var progressCount = await _unitOfWork.ProgressRepository.Get(includeProperties: "User,Exam",
                                                                    filter: c => (c.Exam.ExamName.ToLower().Trim().Contains(ExamNameConstant.SpeakingTest.ToLower()))
                                                                    && (string.IsNullOrEmpty(request.Search) ||
                                                                    c.Status.ToLower().Trim().Contains(request.Search.ToLower().Trim())));

            var totalCount = progressCount.Count();
            var items = progressCount.ToList();

            // Create the PagedList and map the results
            var pageList = new PagedList<Progress>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<ProgressSpeakingDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<ProgressSpeakingDTO>>(items);

            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mappedResponse,
                StatusCode = StatusCodeEnum.Created,
                Message = GeneralMessage.CreateSuccess
            };
        }

        public async Task<ResponseDTO> GetWritingAnswer(ExamParameters request)
        {
            List<UserAnswer> userAnswers = new List<UserAnswer>();
            var userAnswerList = await _unitOfWork.UserAnswerRepository.Get(includeProperties: "User,Question,Question.Passage");

            foreach (var eachAnswer in userAnswerList)
            {
                var question = await _unitOfWork.QuestionRepository.GetByID(eachAnswer.QuestionId);

                if (question != null && question.PassageId != null)
                {
                    var passage = await _unitOfWork.PassageRepository.GetByID(question.PassageId);

                    if (passage != null && passage.ExamId != null)
                    {
                        var exam = await _unitOfWork.ExamRepository.GetByID(passage.ExamId);

                        if (exam != null && exam.ExamName.ToLower().Trim().Contains(ExamNameConstant.WritingTest.ToLower().Trim()))
                        {
                            userAnswers.Add(eachAnswer);
                        }
                    }
                }
            }

            var pagingData = userAnswers.Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize).ToList();

            var answerPageList = new PagedList<UserAnswer>(pagingData, userAnswers.Count, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<WritingAnswerDTO>>(answerPageList);

            if (request.PageNumber <= 0 || request.PageSize <= 0)
            {
                mappedResponse.Data = _mapper.Map<List<WritingAnswerDTO>>(userAnswers);
            }
            else
            {
                mappedResponse.Data = _mapper.Map<List<WritingAnswerDTO>>(pagingData);
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mappedResponse,
                StatusCode = StatusCodeEnum.OK,
                Message = ExamMessage.GetAnswers
            };
        }

        public async Task<ResponseDTO> AnswerWritingQuestion(WritingDTO request)
        {
            var mapAnswer = _mapper.Map<UserAnswer>(request);
            mapAnswer.IsCorrect = null;

            if (request.UserChoice != null)
            {
                mapAnswer.UserChoice = request.UserChoice;
                mapAnswer.QuestionId = request.QuestionId;
                mapAnswer.UserId = request.UserId;
            } else
            {
                mapAnswer.UserChoice = "";
                mapAnswer.QuestionId = request.QuestionId;
                mapAnswer.UserId = request.UserId;
            }

            var thisAnswer = await _unitOfWork.UserAnswerRepository.Get(filter: c => c.UserId == request.UserId && c.QuestionId == request.QuestionId);
            var first = thisAnswer.FirstOrDefault();

            if (first != null)
            {
                mapAnswer.UserAnswerId = first.UserAnswerId;
                mapAnswer.CreateAt = first.CreateAt;
                _unitOfWork.UserAnswerRepository.Update(mapAnswer);
            }
            else
            {
                mapAnswer.UserAnswerId = Guid.NewGuid().ToString();
                mapAnswer.CreateAt = DateTime.Now;

                _unitOfWork.UserAnswerRepository.Insert(mapAnswer);
            }

            _unitOfWork.Save();


            return new ResponseDTO
            {
                IsSuccess = true,
                Message = ExamMessage.SaveAnswerSuccessfully,
                StatusCode = StatusCodeEnum.Created,
                MetaData = request
            };
        }
    }
}




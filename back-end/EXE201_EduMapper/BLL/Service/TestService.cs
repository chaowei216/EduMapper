using AutoMapper;
using Azure;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Exam;
using Common.Constant.Message;
using Common.Constant.Test;
using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Query;
using Common.DTO.Test;
using Common.DTO.UserAnswer;
using Common.Enum;
using DAL.Models;
using DAL.UnitOfWork;

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

        public async Task<ResponseDTO> CreateTest(TestCreateDTO test)
        {
            var mapTest = _mapper.Map<Test>(test);
            int numOfQuestion = 0;
            mapTest.TestId = Guid.NewGuid().ToString();


            mapTest.CreatedDate = DateTime.Now;
            _unitOfWork.TestRepository.Insert(mapTest);
            if (test.ExamIds != null)
            {
                foreach (var exam in test.ExamIds)
                {
                    var thisExam = await _unitOfWork.ExamRepository.Get(filter: c => c.ExamId == exam,
                                                                        includeProperties: "Passages,Passages.SubQuestion," +
                                                                                   "Passages.Sections,Passages.SubQuestion.Choices");

                    foreach (var ex in thisExam)
                    {
                        if (ex.TestId != null)
                        {
                            return new ResponseDTO
                            {
                                IsSuccess = false,
                                Message = TestMessage.DuplicateTest,
                                StatusCode = StatusCodeEnum.BadRequest,
                            };
                        }
                        ex.TestId = mapTest.TestId;

                        _unitOfWork.ExamRepository.Update(ex);
                        _unitOfWork.Save();
                    }
                }
            }

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapTest
            };
        }

        public async Task<ResponseDTO> GetAllPremiumTest(TestParameters request)
        {
            var test1 = await _unitOfWork.TestRepository.Get(includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                           "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices",
                                                           filter: c => c.IsRequired == true);

            List<Test> getTests = new List<Test>();

            foreach (var eachTest in test1)
            {
                var result = await _unitOfWork.TestResultRepository.Get(filter: c => c.UserId == request.UserId && c.TestId == eachTest.TestId);
                var eachResult = result.FirstOrDefault();

                if (eachResult != null)
                {
                    getTests.Add(eachTest);
                }
            }

            var pagingData = getTests.Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize).ToList();

            var answerPageList = new PagedList<Test>(pagingData, getTests.Count, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<TestDTO>>(answerPageList);

            if (request.PageNumber <= 0 || request.PageSize <= 0)
            {
                mappedResponse.Data = _mapper.Map<List<TestDTO>>(getTests);
            }
            else
            {
                mappedResponse.Data = _mapper.Map<List<TestDTO>>(pagingData);
            }

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetAllTest(TestParameters request)
        {
            var test = await _unitOfWork.TestRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                        ? p => p.Description.Contains(request.Search.Trim())
                                                                        : null,
                                                            includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                                       "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices",
                                                            pageSize: request.PageSize,
                                                            pageIndex: request.PageNumber);

            var test1 = await _unitOfWork.TestRepository.Get(includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                                       "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices");

            var totalCount = test1.Count();
            var items = test.ToList();

            // Create the PagedList and map the results
            var pageList = new PagedList<Test>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<TestDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<TestDTO>>(items);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
/*
            var test1 = await _unitOfWork.TestRepository.Get(includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                           "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices");

            List<Test> getTests = new List<Test>();

            foreach (var eachTest in test1)
            {
                var result = await _unitOfWork.TestResultRepository.Get(filter: c => c.UserId == request.UserId && c.TestId == eachTest.TestId);
                var eachResult = result.FirstOrDefault();

                if (eachResult == null)
                {
                    getTests.Add(eachTest);
                }
            }

            var pagingData = getTests.Skip((request.PageNumber - 1) * request.PageSize).Take(request.PageSize).ToList();

            var answerPageList = new PagedList<Test>(pagingData, getTests.Count, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<TestDTO>>(answerPageList);

            if (request.PageNumber <= 0 || request.PageSize <= 0)
            {
                mappedResponse.Data = _mapper.Map<List<TestDTO>>(getTests);
            }
            else
            {
                mappedResponse.Data = _mapper.Map<List<TestDTO>>(pagingData);
            }

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };*/
        }

        public async Task<ResponseDTO> GetListeningTestById(string id)
        {
            var test = await _unitOfWork.TestRepository.Get(includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                                       "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices",
                                                filter: c => c.TestId == id);

            foreach (var item in test)
            {
                item.Exams = item.Exams.Where(e => e.ExamName.ToLower().Contains(ExamNameConstant.ListeningTest.ToLower())).ToList();
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

        public async Task<ResponseDTO> GetSpeakingTestById(string id)
        {
            var test = await _unitOfWork.TestRepository.Get(includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                                                       "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices",
                                                filter: c => c.TestId == id);

            foreach (var item in test)
            {
                item.Exams = item.Exams.Where(e => e.ExamName.ToLower().Contains(ExamNameConstant.SpeakingTest.ToLower())).ToList();
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
            var test = await _unitOfWork.TestRepository.Get(
                filter: c => c.TestId == id,
                includeProperties: "Exams,Exams.Passages,Exams.Passages.SubQuestion," +
                                   "Exams.Passages.Sections,Exams.Passages.SubQuestion.Choices"
            );

            foreach (var item in test)
            {
                // Lọc theo tên của bài thi
                item.Exams = item.Exams
                    .Where(e => e.ExamName.ToLower().Contains(ExamNameConstant.ReadingTest.ToLower()))
                    .ToList();

                foreach (var exam in item.Exams)
                {
                    foreach (var passage in exam.Passages)
                    {
                        passage.Sections = passage.Sections
                            .OrderBy(s => s.SectionLabel) 
                            .ToList();
                    }
                }
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
                item.Exams = item.Exams.Where(e => e.ExamName.ToLower().Contains(ExamNameConstant.WritingTest.ToLower())).ToList();
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

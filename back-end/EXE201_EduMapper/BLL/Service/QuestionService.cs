
using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Exam;
using Common.DTO.Query;
using Common.DTO.Question;
using Common.Enum;
using DAL.Models;
using DAL.UnitOfWork;

namespace BLL.Service
{
    public class QuestionService : IQuestionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public QuestionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ResponseDTO CreateQuestion(QuestionCreateDTO question)
        {
            var mapQuestion = _mapper.Map<Question>(question);

            mapQuestion.QuestionId = Guid.NewGuid().ToString();
            mapQuestion.CreatedAt = DateTime.Now;

            if (mapQuestion.Choices != null)
            {
                foreach (var choice in mapQuestion.Choices)
                {
                    choice.ChoiceId = Guid.NewGuid().ToString();
                    choice.CreatedAt = DateTime.Now;
                    _unitOfWork.QuestionChoiceRepository.Insert(choice);
                }
            }

            _unitOfWork.QuestionRepository.Insert(mapQuestion);

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapQuestion
            };
        }

        public async Task DeleteQuestion(string id)
        {
            var membership = await _unitOfWork.QuestionRepository.GetByID(id);

            if (membership == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            await _unitOfWork.QuestionRepository.Delete(id);

            _unitOfWork.Save();
        }

        public async Task<ResponseDTO> GetAllQuestions(QuestionParameters request)
        {
            var response = await _unitOfWork.QuestionRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                ? p => p.QuestionText.Contains(request.Search.Trim())
                                                                : null,
                                                                orderBy: null,
                                                                includeProperties: "Choices");

            var totalCount = response.Count(); // Make sure to use CountAsync to get the total count
            var items = response.ToList(); // Use ToListAsync to fetch items asynchronously

            // Create the PagedList and map the results
            var pageList = new PagedList<Question>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<QuestionDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<QuestionDTO>>(items);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetFreeQuestions(QuestionParameters request)
        {
            var response = await _unitOfWork.QuestionRepository.Get(filter: c => (c.PassageId == null) && (string.IsNullOrEmpty(request.Search)
                                                                || c.QuestionText.Contains(request.Search.Trim())),
                                                                includeProperties: "Choices");

            var totalCount = response.Count(); // Make sure to use CountAsync to get the total count
            var items = response.ToList(); // Use ToListAsync to fetch items asynchronously

            // Create the PagedList and map the results
            var pageList = new PagedList<Question>(items, totalCount, request.PageNumber, request.PageSize);
            var mappedResponse = _mapper.Map<PaginationResponseDTO<QuestionDTO>>(pageList);
            mappedResponse.Data = _mapper.Map<List<QuestionDTO>>(items);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mappedResponse
            };
        }

        public async Task<ResponseDTO> GetQuestionById(string id)
        {
            var question = await _unitOfWork.QuestionRepository.Get(filter: c => c.QuestionId == id, includeProperties: "Choices");

            var mapList = _mapper.Map<List<Question>>(question);

            if (mapList == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                MetaData = mapList,
                StatusCode = StatusCodeEnum.OK,
                Message = GeneralMessage.GetSuccess
            };
        }

        public async Task UpdateQuestion(string id, QuestionCreateDTO question)
        {
            var thisQuestion = await _unitOfWork.QuestionRepository.Get(filter: c => c.QuestionId == id, includeProperties: "Choices");


            if (thisQuestion == null)
                throw new NotFoundException(GeneralMessage.NotFound);

            var mapQuestion = _mapper.Map<Question>(question);

            foreach (var item2 in thisQuestion)
            {
                mapQuestion.QuestionId = item2.QuestionId;

                if (mapQuestion.Choices != null)
                {
                    foreach (var choice in mapQuestion.Choices)
                    {
                        foreach (var thisChoice in item2.Choices)
                        {
                            choice.ChoiceId = thisChoice.ChoiceId;
                            choice.CreatedAt = DateTime.Now;
                            _unitOfWork.QuestionChoiceRepository.Update(choice);
                        }
                    }
                }

                
            }

            _unitOfWork.QuestionRepository.Update(mapQuestion);

            _unitOfWork.Save();
        }
    }
}

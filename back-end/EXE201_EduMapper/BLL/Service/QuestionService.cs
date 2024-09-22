using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.DTO;
using Common.DTO.Question;
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
    public class QuestionService: IQuestionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public QuestionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ResponseDTO CreateQuestion(CreateQuestionDTO question)
        {
            var mapQuestion = _mapper.Map<Question>(question);

            mapQuestion.QuestionId = Guid.NewGuid().ToString();
            mapQuestion.CreatedAt = DateTime.Now;

            if (mapQuestion.Choices != null)
            {
                foreach (var choice in mapQuestion.Choices)
                {
                    choice.ChoiceId = Guid.NewGuid().ToString();
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
            };
        }

        public async Task<ResponseDTO> GetQuestionById(string id)
        {
            var question = await _unitOfWork.QuestionRepository.Get(filter: c => c.QuestionId ==  id,includeProperties: "Choices");

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
    }
}

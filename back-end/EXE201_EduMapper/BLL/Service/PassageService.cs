using AutoMapper;
using BLL.Exceptions;
using BLL.IService;
using Common.Constant.Message;
using Common.Constant.Message.Question;
using Common.DTO;
using Common.DTO.MemberShip;
using Common.DTO.Passage;
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
    public class PassageService : IPassageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PassageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDTO> AddQuestionToPassage(AddQuestionDTO passage)
        {
            var thisPassage = await _unitOfWork.PassageRepository.GetByID(passage.PassageId);

            if (thisPassage == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            if(passage.QuestionIds == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            foreach(var question in passage.QuestionIds)
            {
                var thisQuestion = await _unitOfWork.QuestionRepository.GetByID(question);

                if (thisQuestion == null)
                {
                    throw new NotFoundException(GeneralMessage.NotFound);
                }

                if (thisQuestion.PassageId != null)
                {
                    return new ResponseDTO
                    {
                        IsSuccess = false,
                        Message = QuestionMessage.DuplicateQuestion,
                        StatusCode = StatusCodeEnum.BadRequest,
                    };
                }

                thisQuestion.PassageId = passage.PassageId;
                _unitOfWork.QuestionRepository.Update(thisQuestion);
                _unitOfWork.Save();
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = QuestionMessage.AddQuestionSuccess,
                StatusCode = StatusCodeEnum.NoContent,
            };
        }

        public ResponseDTO CreateIELTSPassage(PassageIELTSCreateDTO passage)
        {
            var mapPassage = _mapper.Map<Passage>(passage);
            mapPassage.PassageId = Guid.NewGuid().ToString();
            mapPassage.CreatedAt = DateTime.Now;

            if (passage.SubQuestion != null)
            {
                foreach (var question in mapPassage.SubQuestion)
                {
                    question.QuestionId = Guid.NewGuid().ToString();
                    question.CreatedAt = DateTime.Now;
                    question.PassageId = mapPassage.PassageId;

                    foreach (var choice in question.Choices)
                    {
                        choice.ChoiceId = Guid.NewGuid().ToString();
                        choice.CreatedAt = DateTime.Now;
                        _unitOfWork.QuestionChoiceRepository.Insert(choice);
                    }

                    _unitOfWork.QuestionRepository.Insert(question);
                }
            }

            foreach (var section in mapPassage.Sections)
            {
                section.PassageSectionId = Guid.NewGuid().ToString();

                _unitOfWork.SectionRepository.Insert(section);
            }

            _unitOfWork.PassageRepository.Insert(mapPassage);

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapPassage
            };
        }

        public ResponseDTO CreatePassage(PassageCreateDTO passage)
        {
            var mapPassage = _mapper.Map<Passage>(passage);
            mapPassage.PassageId = Guid.NewGuid().ToString();
            mapPassage.CreatedAt = DateTime.Now;

            _unitOfWork.PassageRepository.Insert(mapPassage);

            _unitOfWork.Save();

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.CreateSuccess,
                StatusCode = StatusCodeEnum.Created,
                MetaData = mapPassage
            };
        }

        public async Task<ResponseDTO> GetAllPassages(QueryDTO request)
        {
            var response = await _unitOfWork.PassageRepository.Get(filter: !string.IsNullOrEmpty(request.Search)
                                                                        ? p => p.PassageTitle.Contains(request.Search.Trim())
                                                                        : null,
                                                                orderBy: null,
                                                                pageIndex: request.PageIndex,
                                                                pageSize: request.PageSize,
                                                                includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers");

            var mapPassage = _mapper.Map<List<PassageDTO>>(response);

            return new ResponseDTO
            {
                StatusCode = StatusCodeEnum.OK,
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mapPassage
            };
        }

        public async Task<ResponseDTO> GetPassageById(string id)
        {
            var thisPassage = await _unitOfWork.PassageRepository.Get(c => c.PassageId == id, includeProperties: "SubQuestion,Sections,SubQuestion.Choices,SubQuestion.UserAnswers");

            var mapList = _mapper.Map<List<Passage>>(thisPassage);

            if (mapList == null)
            {
                throw new NotFoundException(GeneralMessage.NotFound);
            }

            return new ResponseDTO
            {
                IsSuccess = true,
                Message = GeneralMessage.GetSuccess,
                MetaData = mapList,
                StatusCode = StatusCodeEnum.OK
            };
        }


    }
}

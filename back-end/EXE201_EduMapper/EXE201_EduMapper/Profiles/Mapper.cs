using AutoMapper;
using Common.DTO.Auth;
using Common.DTO.MemberShip;
using Common.DTO.Exam;
using Common.DTO.Passage;
using Common.DTO.Question;
using Common.DTO.Test;
using DAL.Models;

namespace EXE201_EduMapper.Profiles
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<RegisterRequestDTO, ApplicationUser>().ReverseMap();
            CreateMap<UserAuthDTO, ApplicationUser>().ReverseMap();
            CreateMap<ExternalLoginDTO, ApplicationUser>().ReverseMap();   
            CreateMap<MemberShip, MemberShipDTO>().ReverseMap();
            CreateMap<MemberShipCreateDTO, MemberShip>().ReverseMap();
            CreateMap<MemberShipUpdateDTO, MemberShip>().ReverseMap();
            CreateMap<ExternalLoginDTO, ApplicationUser>().ReverseMap();    
            CreateMap<Question, QuestionDTO>().ReverseMap();
            CreateMap<QuestionChoiceDTO, QuestionChoice>().ReverseMap();
            CreateMap<Passage, PassageDTO>().ReverseMap();
            CreateMap<Exam, ExamDTO>().ReverseMap();
            CreateMap<PassageSection, PassageSectionDTO>().ReverseMap();
            CreateMap<Test, TestDTO>().ReverseMap();
            CreateMap<Question, CreateQuestionDTO>().ReverseMap();
        }
    }
}

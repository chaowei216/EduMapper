using AutoMapper;
using Common.DTO.Auth;
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
        }
    }
}

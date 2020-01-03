using AutoMapper;
using NextTech.ChaChing123.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NextTech.ChaChing123.Services.WebApi.Mappings
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "ViewModelToDomainMappings"; }
        }

        protected override void Configure()
        {
            /*
            Mapper.CreateMap<MovieViewModel, Movie>()
                //.ForMember(m => m.Image, map => map.Ignore())
                .ForMember(m => m.Genre, map => map.Ignore());
                */
        }
    }
}
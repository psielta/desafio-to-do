using AutoMapper;
using DataAPI.Dto;
using DataAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace API.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            /*
               // Example mapping configuration
               CreateMap<MyDto, MyEntity>();
               // Add other mappings here
             */
            CreateMap<TarefaDto, Tarefa>();

        }
    }
}

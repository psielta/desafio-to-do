using AutoMapper;
using DataAPI.Data;
using DataAPI.Dto;
using DataAPI.Models;

namespace API.Dto.Repositories
{
    public class TarefaRepositoryDto : GenericRepositoryDto<Tarefa, DesafioToDoContext, int, TarefaDto>
    {
        public TarefaRepositoryDto(DesafioToDoContext injectedContext, IMapper mapper, ILogger<GenericRepositoryDto<Tarefa, DesafioToDoContext, int, TarefaDto>> logger) : base(injectedContext, mapper, logger)
        {
        }
    }
}

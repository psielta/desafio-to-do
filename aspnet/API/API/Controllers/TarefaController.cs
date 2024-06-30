using API.Dto;
using DataAPI.Dto;
using DataAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TarefaController : GenericDtoController<Tarefa, int, TarefaDto>
    {
        public TarefaController(IRepositoryDto<Tarefa, int, TarefaDto> repo, ILogger<GenericDtoController<Tarefa, int, TarefaDto>> logger) : base(repo, logger)
        {
        }
    }
}

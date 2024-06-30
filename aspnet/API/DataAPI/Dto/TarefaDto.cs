using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataAPI.Dto;

public partial class TarefaDto
{
    //public int Id { get; set; }

    public string Text { get; set; } = null!;

    public bool Completed { get; set; }
}

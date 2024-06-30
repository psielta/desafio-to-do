using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LibAPI.Database;
using Microsoft.EntityFrameworkCore;

namespace DataAPI.Models;

[Table("tarefas")]
public partial class Tarefa: IIdentifiable<int>
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("text")]
    [StringLength(16384)]
    public string Text { get; set; } = null!;

    [Column("completed")]
    public bool Completed { get; set; }

    public int GetId()
    {
        return Id;
    }

    public string GetKeyName()
    {
        return "Id";
    }
}

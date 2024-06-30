using System;
using System.Collections.Generic;
using DataAPI.Models;
using Microsoft.EntityFrameworkCore;
using LibAPI.Files;

namespace DataAPI.Data;

public partial class DesafioToDoContext : DbContext
{
    public DesafioToDoContext()
    {
    }

    public DesafioToDoContext(DbContextOptions<DesafioToDoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tarefa> Tarefas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(IniFile.GetConnectionString());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("pg_catalog", "adminpack");

        modelBuilder.Entity<Tarefa>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("tarefas_pkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

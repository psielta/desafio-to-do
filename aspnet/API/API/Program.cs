using Microsoft.EntityFrameworkCore;
using Serilog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using LibAPI.Database;
using API.Dto;
using DataAPI.Data;
using DataAPI.Models;
using DataAPI.Dto;
using API.Dto.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configura��o do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://177.153.50.185:5173") // frontend rodando em HTTP
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()); // Permite o uso de credenciais
});

var Configuration = builder.Configuration;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/myapp.txt", rollingInterval: RollingInterval.Day, rollOnFileSizeLimit: true, fileSizeLimitBytes: 10485760, retainedFileCountLimit: 7)
    .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog();

var y = Configuration["Jwt:Issuer"];
var x = Configuration["Jwt:Audience"];
var z = Configuration["Jwt:Key"];

// Adicionando servi�os ao container
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddDbContext<DesafioToDoContext>(options => options.UseNpgsql(IniFile.GetConnectionString()));
builder.Services.AddScoped<IRepositoryDto<Tarefa, int, TarefaDto>, TarefaRepositoryDto>();
builder.Services.AddControllers();
/*
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
        options.JsonSerializerOptions.MaxDepth = 64;
    });
*/

// Configura��o do Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configura��o do pipeline de requisi��o HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Uso do CORS
app.UseCors("AllowSpecificOrigin");

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

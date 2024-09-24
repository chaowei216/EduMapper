using BLL.IService;
using BLL.Service;
using EXE201_EduMapper.Extension;
using EXE201_EduMapper.Middlewares;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Authentication API",
        Version = "v1"
    });

    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description =
    "JWT Authorization header using the Bearer scheme. \r\n\r\n " +
    "Enter 'Bearer' [space] and then your token in the text input below. \r\n\r\n" +
    "Example: \"Bearer 12345abcdef\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Scheme = "Bearer",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

// auto mapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddDatabase();
builder.Services.ConfigIdentityServices();
builder.Services.ConfigAuthentication(builder.Configuration);

// Transient
builder.Services.AddTransient<IEmailService, EmailService>();

// Scoped
builder.Services.AddUnitOfWork();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMembershipService, MembershipService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IPassageService, PassageService>();
builder.Services.AddScoped<ITestService, TestService>();
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<ICenterService, CenterService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
                    b => b.AllowAnyHeader()
                            .AllowAnyOrigin()
                                .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.EntityFrameworkCore;
using TarantulaAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TarantulaDbContext>(options =>
    options.UseSqlite("Data Source=tarantulas.db"));

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Information);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//Create full HTTP body logging
app.Use(async (context, next) =>
{
    context.Request.EnableBuffering();
    var requestBody = new StreamReader(context.Request.Body).ReadToEndAsync().Result;
    context.Request.Body.Position = 0;

    Console.WriteLine($"--> {context.Request.Method} {context.Request.Path}");
    if (!string.IsNullOrEmpty(requestBody))
        Console.WriteLine($"Body: {requestBody}");

    var originalBody = context.Response.Body;
    using var newBody = new MemoryStream();
    context.Response.Body = newBody;

    await next();

    newBody.Position = 0;
    var responseBody = new StreamReader(newBody).ReadToEnd();
    newBody.Position = 0;

    await newBody.CopyToAsync(originalBody);
    context.Response.Body = originalBody;

    Console.WriteLine($"<-- {context.Response.StatusCode}");
    if (!string.IsNullOrEmpty(responseBody))
        Console.WriteLine($"Response Body: {responseBody}");
});

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TarantulaDbContext>();
    dbContext.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

app.Run();

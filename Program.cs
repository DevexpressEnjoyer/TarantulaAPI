using Microsoft.EntityFrameworkCore;
using TarantulaAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TarantulaDbContext>(options =>
    options.UseSqlite("Data Source=tarantulas.db"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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

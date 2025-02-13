using Microsoft.EntityFrameworkCore;
using TarantulaAPI.Models;

namespace TarantulaAPI.Data
{
    public class TarantulaDbContext : DbContext
    {
        public TarantulaDbContext(DbContextOptions<TarantulaDbContext> options) : base(options) { }

        public DbSet<Tarantula> Tarantulas { get; set; }
    }
}

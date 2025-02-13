using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TarantulaAPI.Data;
using TarantulaAPI.Models;

namespace TarantulaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarantulasController : ControllerBase
    {
        private readonly TarantulaDbContext _context;

        public TarantulasController(TarantulaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarantula>>> GetTarantulas()
        {
            return await _context.Tarantulas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tarantula>> GetTarantula(int id)
        {
            var tarantula = await _context.Tarantulas.FindAsync(id);
            if (tarantula == null) return NotFound();
            return tarantula;
        }

        [HttpPost]
        public async Task<ActionResult<Tarantula>> PostTarantula(Tarantula tarantula)
        {
            _context.Tarantulas.Add(tarantula);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTarantula), new { id = tarantula.Id }, tarantula);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarantula(int id, Tarantula tarantula)
        {
            if (id != tarantula.Id) return BadRequest();

            _context.Entry(tarantula).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarantula(int id)
        {
            var tarantula = await _context.Tarantulas.FindAsync(id);
            if (tarantula == null) return NotFound();

            _context.Tarantulas.Remove(tarantula);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
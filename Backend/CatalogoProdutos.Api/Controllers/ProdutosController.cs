using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CatalogoProdutos.API.Infrastructure.Data;
using CatalogoProdutos.API.Domain.Entities;

namespace CatalogoProdutos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? nome, [FromQuery] string? categoria)
        {
            var query = _context.Produtos.AsQueryable();

            if (!string.IsNullOrEmpty(nome))
                query = query.Where(p => p.Nome.Contains(nome));

            if (!string.IsNullOrEmpty(categoria))
                query = query.Where(p => p.Categoria == categoria);

            return Ok(await query.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
                return NotFound();

            return Ok(produto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Produto produto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            produto.DataCadastro = DateTime.UtcNow;

            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = produto.Id }, produto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Produto produto)
        {
            if (id != produto.Id)
                return BadRequest();

            var exists = await _context.Produtos.AnyAsync(p => p.Id == id);
            if (!exists)
                return NotFound();

            _context.Entry(produto).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
                return NotFound();

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("categorias")]
        public async Task<IActionResult> GetCategorias()
        {
            var categorias = await _context.Produtos
                .Select(p => p.Categoria)
                .Distinct()
                .ToListAsync();

            return Ok(categorias);
        }
    }
}
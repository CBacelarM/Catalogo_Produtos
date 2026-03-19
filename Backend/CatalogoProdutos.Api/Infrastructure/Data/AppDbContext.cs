using Microsoft.EntityFrameworkCore;
using CatalogoProdutos.API.Domain.Entities;

namespace CatalogoProdutos.API.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}
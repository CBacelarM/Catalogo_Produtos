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

        // Precisão para que o campo Preço seja armazenado corretamente no banco de dados e evite problemas de trucamento de valores decimais. 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>()
                .Property(p => p.Preco)
                .HasPrecision(18, 2);

            base.OnModelCreating(modelBuilder);
        }
    }
}
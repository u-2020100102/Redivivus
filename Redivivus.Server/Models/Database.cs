using Microsoft.EntityFrameworkCore;

namespace Redivivus.Server.Models
{
    public class Database : DbContext
    {

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Product>()
                .HasMany(p => p.Reviews)
                .WithOne(r => r.Product)
                .HasForeignKey(r => r.ProductId);



            base.OnModelCreating(modelBuilder);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
            optionsBuilder.UseLazyLoadingProxies();
            optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-V0JD1PI;User ID=newUser;Password=mvc_dev;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
        }


            public DbSet<User> Users { get; set; }
            public DbSet<Product> Products { get; set; }

            public DbSet<ShoppingCart> ShoppingCarts { get; set; }

    }
}

using Models;
using Microsoft.EntityFrameworkCore;

namespace DBRepository
{
    public class RepositoryContext : DbContext
    {
		public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options) { }

		public DbSet<Investment> Investments { get; set; }
		public DbSet<User> Users { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>().ToTable("UserInfo");
			modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Password).IsRequired();

			modelBuilder.Entity<Investment>().ToTable("Investment");
			modelBuilder.Entity<Investment>().Property(i => i.Name).IsRequired();
			modelBuilder.Entity<Investment>().Property(i => i.Description).IsRequired();
		}
	}
}

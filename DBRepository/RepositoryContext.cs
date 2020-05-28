using Models;
using Microsoft.EntityFrameworkCore;

namespace DBRepository
{
    public class RepositoryContext : DbContext
    {
		public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options) { }

		public DbSet<Investment> Investments { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<EMAIL> Emails { get; set; }
		public DbSet<Balance> Balances { get; set; }
		public DbSet<LoginHistory> LoginHistories { get; set; }
		public DbSet<CurrentSession>  CurrentSessions { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>().ToTable("UserInfo");
			modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Password).IsRequired();

			modelBuilder.Entity<Investment>().ToTable("Investment");
			modelBuilder.Entity<Investment>().Property(i => i.Name).IsRequired();
			modelBuilder.Entity<Investment>().Property(i => i.Description).IsRequired();

			modelBuilder.Entity<EMAIL>().ToTable("Email");
			modelBuilder.Entity<EMAIL>().Property(e => e.Email).IsRequired();

			modelBuilder.Entity<Balance>().ToTable("Balance");
			modelBuilder.Entity<Balance>().Property(b => b.USDBalance).IsRequired();

			modelBuilder.Entity<LoginHistory>().ToTable("LoginHistory");
			modelBuilder.Entity<LoginHistory>().Property(lh => lh.IP).IsRequired();

			modelBuilder.Entity<CurrentSession>().ToTable("CurrentSession");
			modelBuilder.Entity<CurrentSession>().Property(cs => cs.LoginTime).IsRequired();
			modelBuilder.Entity<CurrentSession>().Property(cs => cs.LogoutTime).IsRequired();
		}
	}
}

using Models;
using Microsoft.EntityFrameworkCore;

namespace DBRepository
{
    public class RepositoryContext : DbContext
    {
		public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options) { }

		public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
		public DbSet<Tag> Tags { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<UserRole> UserRoles { get; set; }
		public DbSet<UserToUserRole> UserToUserRoles { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>().ToTable("UserInfo");
			modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Password).IsRequired();

			modelBuilder.Entity<UserRole>().ToTable("UserRole");
			modelBuilder.Entity<UserRole>().Property(u => u.Name).IsRequired();

			modelBuilder.Entity<UserToUserRole>().ToTable("UI_TO_UR");
			modelBuilder.Entity<UserToUserRole>().HasKey(u => new { u.UserId, u.UserRoleID });
			modelBuilder.Entity<UserToUserRole>().Property(u => u.UserId).IsRequired();
			modelBuilder.Entity<UserToUserRole>().Property(u => u.UserRoleID).IsRequired();
		}
	}
}

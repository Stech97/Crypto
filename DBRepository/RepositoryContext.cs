using Models;
using Microsoft.EntityFrameworkCore;

namespace DBRepository
{
    public class RepositoryContext : DbContext
    {
		public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options) { }

		public DbSet<Investment> Investments { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<EmailAddres> Emails { get; set; }
		public DbSet<Balance> Balances { get; set; }
		public DbSet<LoginHistory> LoginHistories { get; set; }
		public DbSet<CurrentSession> CurrentSessions { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<ConfirmEmail> ConfirmEmails { get; set; }
        public DbSet<ForgotPassword> ForgotPasswords { get; set; }
        public DbSet<TypeInvestment> TypeInvestments { get; set; }
        public DbSet<TypeCommission> TypeCommissions { get; set; }
        public DbSet<BalanceHistory> BalanceHistories { get; set; }
        public DbSet<MainPage> MainPages { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<MarketFiles> MarketFiles { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
            #region User
			modelBuilder.Entity<User>().ToTable("UserInfo");
			modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
			modelBuilder.Entity<User>().Property(u => u.Password).IsRequired();
            #endregion

            #region Investment
            modelBuilder.Entity<Investment>().ToTable("Investment");
            modelBuilder.Entity<Investment>().Property(i => i.AddCash).IsRequired();
            modelBuilder.Entity<Investment>().Property(i => i.DateInvestment).IsRequired();
            #endregion

            #region Email
            modelBuilder.Entity<EmailAddres>().ToTable("Email");
            modelBuilder.Entity<EmailAddres>().HasKey(e => e.Email);
			modelBuilder.Entity<EmailAddres>().Property(e => e.Email).IsRequired();
            #endregion

            #region Balance
            modelBuilder.Entity<Balance>().ToTable("Balance");
			modelBuilder.Entity<Balance>().Property(b => b.USDBalance).IsRequired();
            #endregion

            #region Login History
            modelBuilder.Entity<LoginHistory>().ToTable("LoginHistory");
			modelBuilder.Entity<LoginHistory>().Property(lh => lh.IP).IsRequired();
            #endregion

            #region Current Session
            modelBuilder.Entity<CurrentSession>().ToTable("CurrentSession");
			modelBuilder.Entity<CurrentSession>().Property(cs => cs.LoginTime).IsRequired();
            #endregion

            #region News
            modelBuilder.Entity<News>().ToTable("News");
            modelBuilder.Entity<News>().Property(n => n.Header).IsRequired();
            modelBuilder.Entity<News>().Property(n => n.Description).IsRequired();
            #endregion

            #region Confirm Email
            modelBuilder.Entity<ConfirmEmail>().ToTable("ConfirmEmail");
            modelBuilder.Entity<ConfirmEmail>().Property(ce => ce.TimeConfirm).IsRequired();
            #endregion

            #region Forgot Password
            modelBuilder.Entity<ForgotPassword>().ToTable("ForgotPassword");
            modelBuilder.Entity<ForgotPassword>().Property(fp => fp.TimeForgot).IsRequired();
            modelBuilder.Entity<ForgotPassword>().Property(fp => fp.Username).IsRequired();
            modelBuilder.Entity<ForgotPassword>().Property(fp => fp.Email).IsRequired();
            #endregion

            #region Type Investment
            modelBuilder.Entity<TypeInvestment>().ToTable("TypeInvestment");
            modelBuilder.Entity<TypeInvestment>().HasKey(tc => tc.Type);
            modelBuilder.Entity<TypeInvestment>().Property(ti => ti.Persent).IsRequired();
            modelBuilder.Entity<TypeInvestment>().Property(ti => ti.Type).IsRequired();
            #endregion

            #region Type Commission
            modelBuilder.Entity<TypeCommission>().ToTable("TypeCommission");
            modelBuilder.Entity<TypeCommission>().HasKey(tc => tc.Level);
            modelBuilder.Entity<TypeCommission>().Property(tc => tc.Level).IsRequired();
            modelBuilder.Entity<TypeCommission>().Property(tc => tc.Value).IsRequired();
            #endregion

            #region Balance History
            modelBuilder.Entity<BalanceHistory>().ToTable("BalanceHistory");
            modelBuilder.Entity<BalanceHistory>().Property(bh => bh.Time).IsRequired();
            modelBuilder.Entity<BalanceHistory>().Property(bh => bh.Amount).IsRequired();
            modelBuilder.Entity<BalanceHistory>().Property(bh => bh.Balance).IsRequired();
            #endregion

            #region Main Page
            modelBuilder.Entity<MainPage>().ToTable("MainPage");
            modelBuilder.Entity<MainPage>().HasKey(mb => mb.Component);
            modelBuilder.Entity<MainPage>().Property(mp => mp.Component).IsRequired();
            #endregion

            #region Rate
            modelBuilder.Entity<Rate>().ToTable("Rate");
            modelBuilder.Entity<Rate>().Property(r => r.BTC_USD).IsRequired();
            modelBuilder.Entity<Rate>().Property(r => r.USD_DET).IsRequired();
            #endregion

            #region Market Files
            modelBuilder.Entity<MarketFiles>().ToTable("MarketFiles");
            modelBuilder.Entity<MarketFiles>().Property(mf => mf.Component).IsRequired();
            #endregion
        }
    }
}

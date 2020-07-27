using Microsoft.EntityFrameworkCore;
using Models;
using Models.Enum;
using System.Threading.Tasks;

namespace DBRepository
{
	public static class DbInitializer
	{
        public async static Task Initialize(RepositoryContext context)
        {
            await context.Database.MigrateAsync();

            #region User
            var userCount = await context.Users.CountAsync().ConfigureAwait(false);
            if (userCount == 0)
            {
                context.Users.Add(new User()
                {
                    Username = "admin",
                    Password = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg="
                });

                await context.SaveChangesAsync().ConfigureAwait(false);
            }
            #endregion

            #region Type Investment
            var typeInvestCount = await context.TypeInvestments.CountAsync().ConfigureAwait(false);
            if (typeInvestCount == 0)
            {
                context.TypeInvestments.Add(new TypeInvestment()
                {
                    Type = EnumTypeInvestment.Small,
                    Persent = 1.1722
                });

                context.TypeInvestments.Add(new TypeInvestment()
                {
                    Type = EnumTypeInvestment.Medium,
                    Persent = 1.55113
                });

                context.TypeInvestments.Add(new TypeInvestment()
                {
                    Type = EnumTypeInvestment.Large,
                    Persent = 2.10913
                });
                await context.SaveChangesAsync().ConfigureAwait(false);
            }
            #endregion

            #region Type Commissions
            var typeCommissions = await context.TypeCommissions.CountAsync().ConfigureAwait(false);
            if (typeCommissions == 0)
            {
                context.TypeCommissions.Add(new TypeCommission()
                {
                    Value = 0.3
                });
                context.TypeCommissions.Add(new TypeCommission()
                {
                    Value = 0.2
                });
                context.TypeCommissions.Add(new TypeCommission()
                {
                    Value = 0.2
                });
                context.TypeCommissions.Add(new TypeCommission()
                {
                    Value = 0.1
                });
                context.TypeCommissions.Add(new TypeCommission()
                {
                    Value = 0.1
                });
                context.TypeCommissions.Add(new TypeCommission()
                {
                    Value = 0.05
                });
                context.TypeCommissions.Add(new TypeCommission()
                {
                    Value = 0.05
                });
                context.TypeCommissions.Add(new TypeCommission()
                {
                    Value = 0.005
                });
                await context.SaveChangesAsync().ConfigureAwait(false);
            }
            #endregion

            #region Main Page
            var main = await context.MainPages.CountAsync().ConfigureAwait(false);
            if (main == 0)
            {
                context.MainPages.Add(new MainPage()
                {
                    Component = "Homescreen"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "Our mission"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "How it works"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "Portfolio"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "Career Team"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "Defima token"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "About us"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "Join us"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "FAQ"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "Terms"
                });

                context.MainPages.Add(new MainPage()
                {
                    Component = "Privacy"
                });

                await context.SaveChangesAsync().ConfigureAwait(false);
            }
            #endregion

            #region Rates
            var rate = await context.Rates.CountAsync().ConfigureAwait(false);
            if (rate == 0)
            {
                context.Rates.Add(new Rate()
                {
                    BTC_USD = 10000,
                    USD_DET = 1
                });
                await context.SaveChangesAsync().ConfigureAwait(false);
            }
            #endregion

            #region Market Files 
            var MarketCount = await context.MarketFiles.CountAsync().ConfigureAwait(false);
            if (MarketCount == 0)
            {
                context.MarketFiles.Add(new MarketFiles()
                {
                    Component = "Presentation"
                });

                context.MarketFiles.Add(new MarketFiles()
                {
                    Component = "Business Presentation"
                });

                context.MarketFiles.Add(new MarketFiles()
                {
                    Component = "Video Presentation"
                });

                context.MarketFiles.Add(new MarketFiles()
                {
                    Component = "Social post"
                });

                context.MarketFiles.Add(new MarketFiles()
                {
                    Component = "Instagram"
                });

                context.MarketFiles.Add(new MarketFiles()
                {
                    Component = "Promo Picture"
                });

                context.MarketFiles.Add(new MarketFiles()
                {
                    Component = "Promo Video"
                });

                context.MarketFiles.Add(new MarketFiles()
                {
                    Component = "Platform Tutorial"
                });

                await context.SaveChangesAsync().ConfigureAwait(false);
            }
            #endregion
        }
    }
}

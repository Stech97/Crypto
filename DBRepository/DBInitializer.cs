using Microsoft.EntityFrameworkCore;
using Models;
using System.Threading.Tasks;

namespace DBRepository
{
	public static class DbInitializer
	{
		public async static Task Initialize(RepositoryContext context)
		{
			await context.Database.MigrateAsync();

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
				await context.SaveChangesAsync().ConfigureAwait(false);
			}
		}
	}
}

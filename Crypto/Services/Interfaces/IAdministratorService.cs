using Crypto.ViewModels.Administrator;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IAdministratorService
    {
        Task AddNews(AddNewsViewModel requmodelest);
        Task<RateDETViewModel> UpdateDETRate(RateDETViewModel request);
        Task UpdateNews(UpdateNewsViewModel model, string heder);
        Task DeleteNews(string heder);

        #region Dev
        Task DelUser(int Id);
        Task<List<UserViewModel>> GetUsers();
        #endregion
    }
}

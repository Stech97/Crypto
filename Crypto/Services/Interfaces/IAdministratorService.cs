using Crypto.ViewModels.Administrator;
using Crypto.ViewModels.Dashdoard;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Services.Interfaces
{
    public interface IAdministratorService
    {
        Task<NewsViewModel> AddNews(AddNewsViewModel requmodelest);
        Task<RateDETViewModel> UpdateDETRate(RateDETViewModel request);
        Task<NewsViewModel> UpdateNews(UpdateNewsViewModel model, string heder);
        Task DeleteNews(string heder);
        Task UpdateInfo(SingleTextViewModel model);
        Task UpdatePic(byte[] image, string nameFile, string Component);
        Task<DownloadImage> GetPic(string Component);
        Task<SingleTextViewModel> GetInfo(string Component);
        Task<DownloadImage> GetPassportPicture(int userId);

        #region Dev
        Task DelUser(int Id);
        Task<List<UserViewModel>> GetUsers();
        #endregion
    }
}

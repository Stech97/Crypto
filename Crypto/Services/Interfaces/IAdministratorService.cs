using Crypto.ViewModels.Administrator;
using Crypto.ViewModels.Dashdoard;
using Models;
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
        Task<ImageDTO> GetPic(string Component);
        Task<SingleTextViewModel> GetInfo(string Component);
        #region Get User Picture
        Task<ImageDTO> GetPassportPicture(int userId);
        Task<ImageDTO> GeProofPicture(int UserId);
        Task<ImageDTO> GetSelfiPicture(int UserId);
        #endregion

        #region Dev
        Task DelUser(int Id);
        Task<List<UserViewModel>> GetUsers();
        #endregion
    }
}

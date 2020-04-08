using Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Crypto.Controllers
{
	[Route("api/[controller]")]
    public class BlogController : Controller
    {
		readonly IBlogService _blogService;

		public BlogController(IBlogService blogService)
        {
			_blogService = blogService;
		}

		[Route("page")]
		[HttpGet]
        public async Task<Page<PostLiteViewModel>> GetPosts(int pageIndex, string tag)
        {
			return await _blogService.GetPosts(pageIndex, tag);
        }

		[Route("post")]
		[HttpGet]
		public async Task<Post> GetPost(int postId)
		{
			return await _blogService.GetPost(postId);
		}

		[Authorize]
		[Route("comment")]
		[HttpPost]
		public async Task AddComment([FromBody] AddCommentRequest request, [FromHeader] string login)
		{
			await _blogService.AddComment(request, login);
		}

	    [Authorize]
	    [Route("comment")]
	    [HttpDelete]
	    public async Task DeleteComment(int commentId)
	    {
		    await _blogService.DeleteComment(commentId);
	    }

		[Authorize]
		[Route("post")]
		[HttpPost]
		public async Task AddPost([FromBody] AddPostRequest request)
		{
			await _blogService.AddPost(request);
		}

	    [Authorize]
	    [Route("post")]
	    [HttpDelete]
	    public async Task DeletePost(int postId)
	    {
		    await _blogService.DeletePost(postId);
	    }

		[Route("tags")]
		[HttpGet]
		public async Task<List<string>> GetTags()
		{
			return await _blogService.GetTags();
		}
	}
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Models;
using Crypto.Services.Interfaces;
using Crypto.ViewModels;
using DBRepository.Interfaces;
using Microsoft.Extensions.Configuration;
using AutoMapper;

namespace Crypto.Services.Implementation
{
	public class BlogService : IBlogService
	{
		readonly IBlogRepository _BlogRepository;
		readonly IIdentityRepository _IdentityRepository;
		readonly IConfiguration _config;
		readonly IMapper _mapper; 


		public BlogService(IBlogRepository blogRepository, IConfiguration configuration, IMapper mapper, IIdentityRepository identityRepository)
		{
			_BlogRepository = blogRepository;
			_IdentityRepository = identityRepository;
			_config = configuration;
			_mapper = mapper;
		}

		public async Task AddComment(AddCommentRequest request, string userName)
		{
			var comment = _mapper.Map<AddCommentRequest, Comment>(request);
			var user = await _IdentityRepository.GetUser(userName);
			await _BlogRepository.AddComment(comment, user);
		}

		public async Task AddPost(AddPostRequest request)
		{
			var post = _mapper.Map<AddPostRequest, Post>(request);
			await _BlogRepository.AddPost(post);
		}

		public async Task<Post> GetPost(int postId)
		{
			var result = await _BlogRepository.GetPost(postId);
			return result;
		}

		public async Task DeletePost(int postId)
		{
			await _BlogRepository.DeletePost(postId);
		}

		public async Task DeleteComment(int commentId)
		{
			await _BlogRepository.DeleteComment(commentId);
		}

		public async Task<Page<PostLiteViewModel>> GetPosts(int pageIndex, string tag)
		{
			var pageSize = _config.GetValue<int>("pageSize");
			var page = await _BlogRepository.GetPosts(pageIndex, pageSize, tag);
			var result = _mapper.ToMappedPage<Post, PostLiteViewModel>(page);
			return result;
		}

		public async Task<List<string>> GetTags()
		{
			var result = await _BlogRepository.GetAllTagNames();
			return result;
		}
	}
}

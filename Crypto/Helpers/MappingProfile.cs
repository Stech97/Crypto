﻿using AutoMapper;
using Models;
using Crypto.ViewModels;
using System;

namespace Crypto
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Post, PostLiteViewModel>()
				.ForMember(m => m.CommentCount, opt => opt.MapFrom(m => m.Comments != null ? m.Comments.Count : 0));
			CreateMap<AddCommentRequest, Comment>()
				.ForMember(m => m.Body, opt => opt.MapFrom(m => m.Comment))
				.ForMember(m => m.CreateDate, opt => opt.MapFrom(m => DateTime.Now));
			CreateMap<string, Tag>()
				.ForMember(m => m.TagName, opt => opt.MapFrom(m => m));
			CreateMap<AddPostRequest, Post>()
				.ForMember(m => m.CreatedDate, opt => opt.MapFrom(m => DateTime.Now));
			CreateMap<Investment, InvestmentViewModel>()
				.ForMember(m => m.Name, opt => opt.MapFrom(m => m.Name))
				.ForMember(m => m.CreatedDate, opt => opt.MapFrom(m => DateTime.Now));
		}
	}
}

import React, { Component, Fragment } from "react";

export default class MarketingContent extends Component {
	render() {
		return (
			<div className="marketing-box">
				<h5 className="marketing-business-header marketing-header">
					Business Presentation
				</h5>
				<div className="marketing-business marketing-content-whitebox">
					<div className="marketing-content-whitebox-image">
						<img src="/img/pdf-icon.png" alt="" />
					</div>
					<div className="marketing-content-whitebox-text">
						<h5>Download</h5>
					</div>
				</div>
				<h5 className="marketing-video-header marketing-header">
					Video Presentation
				</h5>
				<div className="marketing-video marketing-content-whitebox">
					<div className="marketing-content-whitebox-image">
						<img src="/img/video-icon.png" alt="" />
					</div>
					<div className="marketing-content-whitebox-text">
						<h5>Download</h5>
					</div>
				</div>
				<div className="marketing-follow">
					<h2 className="marketing-follow-header">Follow Us</h2>
					<svg
						viewBox="0 0 32 22"
						preserveAspectRatio="xMinYMid slice"
						className="marketing-follow-icon-news marketing-follow-icon"
					>
						<use href="#followus-news" />
					</svg>
					<h5 className="marketing-follow-news">
						Subscribe to our Newsletter
					</h5>
					<div className="marketing-follow-icon-blog marketing-follow-icon">
						<img
							src="/img/followus-blog-icon.png"
							alt="followus-blog-icon"
						/>
					</div>
					<h5 className="marketing-follow-blog">
						Subscribe our Blog
					</h5>
					<svg
						viewBox="0 0 31 31"
						preserveAspectRatio="xMinYMid slice"
						className="marketing-follow-icon-telegram marketing-follow-icon"
					>
						<use href="#followus-telegram" />
					</svg>
					<h5 className="marketing-follow-telegram">
						Join our Telegram News Channel
					</h5>
				</div>
				<h5 className="marketing-facebook-header marketing-header">
					Social Media Posts
				</h5>
				<div className="marketing-facebook marketing-content-whitebox">
					<div className="marketing-content-whitebox-image">
						<img src="/img/facebook-icon.png" alt="" />
					</div>
					<div className="marketing-content-whitebox-text">
						<h5>Download</h5>
					</div>
				</div>
				<h5 className="marketing-instagram-header marketing-header">
					Instagram Stories
				</h5>
				<div className="marketing-instagram marketing-content-whitebox">
					<div className="marketing-content-whitebox-image">
						<img src="/img/instagram-icon.png" alt="" />
					</div>
					<div className="marketing-content-whitebox-text">
						<h5>Download</h5>
					</div>
				</div>
				<h5 className="marketing-promopictures-header marketing-header">
					Promo Pictures{" "}
				</h5>
				<div className="marketing-promopictures marketing-content-whitebox">
					<div className="marketing-content-whitebox-image">
						<img src="/img/pictures-folder-icon.png" alt="" />
					</div>
					<div className="marketing-content-whitebox-text">
						<h5>Download</h5>
					</div>
				</div>
				<h5 className="marketing-promovideos-header marketing-header">
					Promo Videos
				</h5>
				<div className="marketing-promovideos marketing-content-whitebox">
					<div className="marketing-content-whitebox-image">
						<img src="/img/videos-folder-icon.png" alt="" />
					</div>
					<div className="marketing-content-whitebox-text">
						<h5>Download</h5>
					</div>
				</div>
			</div>
		);
	}
}

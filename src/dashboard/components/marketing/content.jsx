import React, { Component, Fragment } from "react";

const marketboxes = [
	{
		className: "business",
		link: "/files/Business_presentation.pptx",
		header: "Business Presentation",
		img: "pdf-icon.png",
	},
	{
		className: "video",
		link: "/files/Business_presentation.pptx",
		header: "Video Presentation",
		img: "video-icon.png",
	},
	{
		className: "facebook",
		link: "/files/Test.zip",
		header: "Social Media Posts",
		img: "facebook-icon.png",
	},
	{
		className: "instagram",
		link: "/files/Test.zip",
		header: "Instagram Stories",
		img: "instagram-icon.png",
	},
	{
		className: "promopictures",
		link: "/files/Test.zip",
		header: "Promo Pictures",
		img: "pictures-folder-icon.png",
	},
	{
		className: "promovideos",
		link: "/files/Test.zip",
		header: "Promo Videos",
		img: "videos-folder-icon.png",
	},
];

const MarketingContentBox = ({ box: { className, link, header, img } }) => {
	return (
		<Fragment>
			<h5
				className={
					"marketing-" + className + "-header marketing-header"
				}
			>
				{header}
			</h5>
			<div
				className={
					"marketing-" + className + " marketing-content-whitebox"
				}
			>
				<div className="marketing-content-whitebox-image">
					<img src={"/img/" + img} alt={className} />
				</div>
				<a
					href={link}
					className="marketing-content-whitebox-text"
					download
				>
					<h5>Download</h5>
				</a>
			</div>
		</Fragment>
	);
};

export default class MarketingContent extends Component {
	render() {
		return (
			<div className="marketing-box">
				{marketboxes.map((box, id) => (
					<MarketingContentBox key={id} box={box} />
				))}
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
						<a href="https://medium.com/">Subscribe our Blog</a>
					</h5>
					<svg
						viewBox="0 0 31 31"
						preserveAspectRatio="xMinYMid slice"
						className="marketing-follow-icon-telegram marketing-follow-icon"
					>
						<use href="#followus-telegram" />
					</svg>
					<h5 className="marketing-follow-telegram">
						<a href="https://telegram.org/">
							Join our Telegram News Channel
						</a>
					</h5>
				</div>
			</div>
		);
	}
}

import React, { Component } from "react";

const OurteamHeader = () => {
	return (
		<div id="Team" className="ourteam-header">
			<h1>About Us</h1>
			<h2>Employee Spotlight</h2>
		</div>
	);
};

const ourteamMembers = [
	{
		id: 1,
		name: "Thomas",
		post: "CEO & Founder",
	},
	{
		id: 2,
		name: "Scarlett",
		post: "CEO & Founder",
	},
	{
		id: 3,
		name: "Cagdas",
		post: "Brand Ambassador",
	},
];

class OurteamMember extends Component {
	render() {
		const ourteamMemberTemplate = this.props.data.map(function (item) {
			return (
				<React.Fragment key={item.id}>
					<div className={"ourteam-member-photo-" + item.id}>
						<img
							src={"img/member-photo-" + item.id + ".png"}
							alt={"member-photo-" + item.id}
						/>
					</div>
					<div className={"ourteam-member-caption-" + item.id}>
						<div className="ourteam-member-name">
							<p>{item.name}</p>
						</div>
						<div className="ourteam-member-post">
							<p>{item.post}</p>
						</div>
						<div className="ourteam-member-mailbutton">
							<a href="#">
								<i
									class="fa fa-linkedin-square"
									aria-hidden="true"
								/>
							</a>
						</div>
					</div>
				</React.Fragment>
			);
		});

		return <React.Fragment>{ourteamMemberTemplate}</React.Fragment>;
	}
}

class Ourteam extends Component {
	render() {
		return (
			<section className="ourteam">
				<div className="wrapper ourteam-wrapper">
					<OurteamHeader />
					<div className="ourteam-member">
						<OurteamMember data={ourteamMembers} />
					</div>
				</div>
			</section>
		);
	}
}

export default Ourteam;

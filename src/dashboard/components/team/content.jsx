import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getMembersAmount } from "../../actions/getTeam";
import { getTeamEarnings } from "../../actions/getTeamEarnings";

const MemberLevelRow = ({
	obj: {
		boxclass,
		level,
		members,
		total_invested,
		profits_paid,
		commission,
		total_earned,
	},
}) => {
	return (
		<div
			className={
				"team-table-content-row team-table-content-row-" + boxclass
			}
		>
			<h5 className="team-table-content-row-l gray-text">
				{"Level " + level}
			</h5>
			<h5 className="team-table-content-row-m gray-text">{members}</h5>
			<h5 className="team-table-content-row-i gray-text">
				{total_invested + "k €"}
			</h5>
			<h5 className="team-table-content-row-p gray-text">
				{profits_paid + "k"}
			</h5>
			<h5 className="team-table-content-row-c gray-text">
				{commission + "%"}
			</h5>
			<h5 className="team-table-content-row-e gray-text">
				{total_earned + "k DET"}
			</h5>
		</div>
	);
};

class TeamContent extends Component {
	componentDidMount = () => {
		this.props.getTotalMemAction();
		this.props.getTeamEarningsAction();
	};

	render() {
		const levels = [
			[
				{
					level: 1,
					members: 10,
					total_invested: 46,
					profits_paid: 12,
					commission: 50,
					total_earned: 1.78,
					boxclass: "start",
				},
				{
					level: 2,
					members: 10,
					total_invested: 46,
					profits_paid: 12,
					commission: 50,
					total_earned: 1.78,
					boxclass: "end",
				},
			],
			[
				{
					level: 3,
					members: 10,
					total_invested: 46,
					profits_paid: 12,
					commission: 50,
					total_earned: 1.78,
					boxclass: "start",
				},
				{
					level: 4,
					members: 10,
					total_invested: 46,
					profits_paid: 12,
					commission: 50,
					total_earned: 1.78,
					boxclass: "middle",
				},
				{
					level: 5,
					members: 10,
					total_invested: 46,
					profits_paid: 12,
					commission: 50,
					total_earned: 1.78,
					boxclass: "end",
				},
			],
			[
				{
					level: 6,
					members: 10,
					total_invested: 46,
					profits_paid: 12,
					commission: 50,
					total_earned: 1.78,
					boxclass: "start",
				},
				{
					level: 7,
					members: 10,
					total_invested: 46,
					profits_paid: 12,
					commission: 50,
					total_earned: 1.78,
					boxclass: "end",
				},
			],
		];

		const { earnings } = this.props;

		return (
			<div className="team-box">
				<div className="team-total">
					<div className="team-total-members team-total-box">
						<h5 className="team-total-box-header">
							TOTAL Team Members
						</h5>
						<div className="team-total-box-content team-whitebox">
							<h3 className="team-total-box-content-centered">
								{earnings.totalMembers.data.TotalMember}
							</h3>
						</div>
					</div>
					<div className="team-total-invested team-total-box">
						<h5 className="team-total-box-header">
							TOTAL Team Invested
						</h5>
						<div className="team-total-box-content team-whitebox">
							<h3>$17.110</h3>
							<h5>DET 1000</h5>
						</div>
					</div>
					<div className="team-total-earnings team-total-box">
						<h5 className="team-total-box-header">
							TOTAL Team Earnings
						</h5>
						<div className="team-total-box-content team-whitebox">
							<h3>{"DET " + earnings.teamEarnings.data.det}</h3>
							<h5>{"$" + earnings.teamEarnings.data.usd}</h5>
						</div>
					</div>
				</div>
				<div className="team-ref team-whitebox">
					<div className="team-ref-id">
						<h6>
							<b>REF LINK</b> www.defima.io/12390124
						</h6>
					</div>
					<div className="team-ref-username">
						<h6>
							<b>REF LINK</b> www.defima.io/username
						</h6>
					</div>
				</div>
				<div className="team-table">
					<div className="team-table-header">
						<h5 className="team-table-header-l">Level</h5>
						<h5 className="team-table-header-m">Members</h5>
						<h5 className="team-table-header-i">Total Invested</h5>
						<h5 className="team-table-header-p">Profits paid</h5>
						<h5 className="team-table-header-c">Commission</h5>
						<h5 className="team-table-header-e">Total earned</h5>
					</div>
					{levels.map((block, j) => (
						<div key={j + 1} className="team-table-content">
							{block.map((level, i) => (
								<Fragment key={level.level}>
									<div className="team-table-content-plus">
										<svg
											preserveAspectRatio="xMinYMid slice"
											viewBox="0 0 47 44"
										>
											<use href="#plus" />
										</svg>
									</div>
									<MemberLevelRow obj={level} />
								</Fragment>
							))}
						</div>
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	earnings: store.Earnings,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getTotalMemAction: () => dispatch(getMembersAmount()),
		getTeamEarningsAction: () => dispatch(getTeamEarnings()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamContent);

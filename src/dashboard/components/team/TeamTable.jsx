import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTeamTable } from "../../actions/getTeamTable";
import TeamPopupPlus from "./teamPopup";

const MemberLevelRow = ({
	obj: {
		boxclass,
		level,
		members,
		totalInvested,
		profitsPaid,
		commission,
		totalEarning,
	},
}) => {
	return (
		<div className="team-table-content-row">
			<h5 className="team-table-content-row-l gray-text">
				{"Level " + level}
			</h5>
			<h5 className="team-table-content-row-m gray-text">{members}</h5>
			<h5 className="team-table-content-row-i gray-text">
				{(totalInvested / 1000).toFixed(3) + "k $"}
			</h5>
			<h5 className="team-table-content-row-p gray-text">
				{(profitsPaid / 1000).toFixed(3) + "k"}
			</h5>
			<h5 className="team-table-content-row-c gray-text">
				{commission * 100 + "%"}
			</h5>
			<h5 className="team-table-content-row-e gray-text">
				{(totalEarning / 1000).toFixed(3) + "k USD"}
			</h5>
		</div>
	);
};

class TeamTable extends Component {
	componentDidMount = () => {
		this.props.teamTableAction();
	};

	render() {
		const { team } = this.props;

		const parseTeam = (levels) => {
			var array = [];
			var result = [];
			if (levels.length < 2) {
				for (let i = 0; i < Math.min(levels.length, 2); i++) {
					array.push(levels[i]);
				}
				result.push(array);
			} else if (levels.length < 5) {
				for (let i = 0; i < Math.min(levels.length, 2); i++) {
					array.push(levels[i]);
				}
				result.push(array);
				for (let i = 2; i < Math.min(levels.length, 5); i++) {
					array.push(levels[i]);
				}
				result.push(array);
			} else {
				for (let i = 0; i < Math.min(levels.length, 2); i++) {
					array.push(levels[i]);
				}
				result.push(array);
				for (let i = 2; i < Math.min(levels.length, 5); i++) {
					array.push(levels[i]);
				}
				result.push(array);
				for (let i = 5; i < levels.length; i++) {
					array.push(levels[i]);
				}
				result.push(array);
			}
			return result;
		};

		return (
			<div className="team-table">
				<div className="team-table-header">
					<h5 className="team-table-header-l">Level</h5>
					<h5 className="team-table-header-m">Members</h5>
					<h5 className="team-table-header-i">Total Invested</h5>
					<h5 className="team-table-header-p">Profits paid</h5>
					<h5 className="team-table-header-c">Commission</h5>
					<h5 className="team-table-header-e">Total earned</h5>
				</div>
				{parseTeam(team.levels).map((block, j) => (
					<div key={j + 1} className="team-table-content">
						{block.map((level, i) => (
							<Fragment key={level.level}>
								<TeamPopupPlus obj={level} />
								<MemberLevelRow obj={level} />
							</Fragment>
						))}
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	team: store.TeamTable,
});

const mapDispatchToProps = (dispatch) => {
	return {
		teamTableAction: () => dispatch(getTeamTable()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamTable);

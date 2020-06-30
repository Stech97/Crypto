import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTotalInvestments } from "../../actions/getTotalInvestments";
import { getMembersAmount } from "../../actions/getTeam";
import { getProfitFromInvest } from "../../actions/getProfitFromInvest";
import { getTeamEarnings } from "../../actions/getTeamEarnings";

const rounded = function (number, digits) {
	return Number(Number(number).toFixed(digits));
};

const rounded4 = (number) => rounded(number, 4);

function Graph({ height }) {
	return (
		<svg
			className="content-earnings-graph-plot-reached-svg"
			preserveAspectRatio="xMidYMin slice"
			viewBox="0 0 170 106"
			style={{ height: 30 + 0.8 * height + "%" }}
		>
			<defs>
				<linearGradient
					id="p70ca"
					x1="160"
					x2="9.1"
					y1="0.69"
					y2="106"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#005c9f"></stop>
					<stop offset="1" stopColor="#253771"></stop>
				</linearGradient>
			</defs>
			<path
				fill="url(#p70ca)"
				d="M.599 12.286s34.548 8.572 50.288-5.695c15.74-14.267 30.663 1.252 46.416 5.695 15.751 4.443 24.343.508 32.248-5.695 7.904-6.202 29.621 4.272 39.495 5.695l.052.008v77.36c0 .606-.033 1.204-.098 1.792V106H0V16h.599z"
			></path>
		</svg>
	);
}

const TotalInvestment = ({ data: { btc, usd } }) => {
	return (
		<Fragment>
			<div className="content-earnings-total-invmemb-invheader content-text-blue">
				<h5>Total Investments</h5>
			</div>
			<div className="content-earnings-total-invmemb-investments content-whitebox-earnings content-text-blue">
				<h5>{"BTC " + rounded4(btc)}</h5>
				<h6 className="content-text-grey">{"USD " + rounded4(usd)}</h6>
			</div>
		</Fragment>
	);
};

const TotalTeam = ({ members }) => {
	return (
		<Fragment>
			<div className="content-earnings-total-invmemb-membersheader content-text-blue">
				<h5>Total Team Members</h5>
			</div>
			<div className="content-earnings-total-invmemb-members content-whitebox-earnings content-text-blue">
				<h5>{members + " Members"}</h5>
			</div>
		</Fragment>
	);
};

const ProfitFromInvest = ({ data: { det, usd } }) => {
	return (
		<Fragment>
			<div className="content-earnings-profteam-profheader content-text-blue">
				<h5>Profit from Invest</h5>
			</div>
			<div className="content-earnings-profteam-profinvestments content-whitebox-earnings content-text-blue">
				<h5>{"DET " + rounded4(det)}</h5>
				<h6 className="content-text-grey">{"USD " + rounded4(usd)}</h6>
			</div>
		</Fragment>
	);
};

const TeamEarnings = ({ data: { det, usd } }) => {
	return (
		<Fragment>
			<div className="content-earnings-profteam-totalheader content-text-blue">
				<h5>Total Team Earnings</h5>
			</div>
			<div className="content-earnings-profteam-totalteam content-whitebox-earnings content-text-blue">
				<h5>{"DET " + rounded4(det)}</h5>
				<h6 className="content-text-grey">{"USD " + rounded4(usd)}</h6>
			</div>
		</Fragment>
	);
};

const TotalProfit = ({ data: { det, usd } }) => {
	return (
		<div className="content-earnings-totalprof-square-total content-text-blue">
			<h5>{"DET " + rounded4(det)}</h5>
			<h6 className="content-text-grey">{"USD " + rounded4(usd)}</h6>
		</div>
	);
};

const LastWeekProfits = ({ data: { det, usd } }) => {
	return (
		<Fragment>
			<div className="content-earnings-totalprof-square-header content-text-blue">
				<h5>Last week</h5>
			</div>
			<div className="content-earnings-totalprof-square-hours content-text-blue">
				<h5>{"DET " + rounded4(det)}</h5>
				<h6 className="content-text-grey">{"USD " + rounded4(usd)}</h6>
			</div>
		</Fragment>
	);
};

const GraphContainer = ({ height, text }) => {
	return (
		<div className="content-earnings-graph content-text-blue">
			<div className="content-earnings-graph-plot">
				<div className="content-earnings-graph-plot-rule content-text-blue">
					<h5>300% Rule</h5>
				</div>
				<div className="content-earnings-graph-plot-reached">
					<Graph height={height} />
					<h5
						style={{
							bottom: Math.min(50, 5 + 0.45 * height) + "%",
						}}
					>
						{text + "% Reached"}
					</h5>
				</div>
			</div>
		</div>
	);
};

class ContentEarnings extends Component {
	componentDidMount = () => {
		this.props.getTotalInvAction();
		this.props.getTotalMemAction();
		this.props.getProfitFromInvestAction();
	};

	render() {
		var earningsData = {
			lastWeekProfits: {
				det: 360,
				usd: 360,
			},
		};

		const { earnings } = this.props;

		earningsData = {
			...earningsData,
			totalProfit: {
				det: rounded(
					earnings.profitFromInvest.data.det +
						earnings.teamEarnings.data.det,
					4
				),
				usd: rounded(
					earnings.profitFromInvest.data.usd +
						earnings.teamEarnings.data.usd,
					4
				),
			},
			Graph: {
				height: Math.min(
					300,
					Math.max(
						15,
						rounded(
							earnings.totalInvestment.data.usd
								? (earnings.profitFromInvest.data.usd /
										earnings.totalInvestment.data.usd) *
										100
								: 0,
							2
						)
					)
				),
				text: earnings.totalInvestment.data.usd
					? (earnings.profitFromInvest.data.usd /
							earnings.totalInvestment.data.usd) *
					  100
					: 0,
			},
		};

		return (
			<div className="content-earnings">
				<div className="content-earnings-total-invmemb">
					<TotalInvestment data={earnings.totalInvestment.data} />
					<TotalTeam
						members={earnings.totalMembers.data.TotalMember}
					/>
				</div>
				<div className="content-earnings-profteam">
					<ProfitFromInvest data={earnings.profitFromInvest.data} />
					<TeamEarnings data={earnings.teamEarnings.data} />
				</div>
				<div className="content-earnings-totalprof">
					<div className="content-earnings-totalprof-header content-text-blue">
						<h5>Total Profits</h5>
					</div>
					<div className="content-earnings-totalprof-square content-whitebox-earnings content-text-blue">
						<TotalProfit data={earningsData.totalProfit} />
						<LastWeekProfits data={earningsData.lastWeekProfits} />
					</div>
				</div>
				<GraphContainer
					height={earningsData.Graph.height}
					text={earningsData.Graph.text}
				/>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	earnings: store.Earnings,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getTotalInvAction: () => dispatch(getTotalInvestments()),
		getTotalMemAction: () => dispatch(getMembersAmount()),
		getProfitFromInvestAction: () => dispatch(getProfitFromInvest()),
		getTeamEarningsAction: () => dispatch(getTeamEarnings()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentEarnings);

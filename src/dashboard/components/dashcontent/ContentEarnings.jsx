import React, { Component } from 'react'

const Graph = () => {
	return (
		<svg
			width={260}
			height={163}
			viewBox="0 0 260 163"
		>
			<defs>
				<linearGradient
					id="r9nta"
					x1={238.6}
					x2={30.56}
					y1={10.3}
					y2={151.31}
					gradientUnits="userSpaceOnUse"
				>
					<stop offset={0} stopColor="#005c9f" />
					<stop offset={1} stopColor="#123273" />
				</linearGradient>
			</defs>
			<path
				fill="url(#r9nta)"
				d="M25 163c-13.807 0-25-11.193-25-25V18.62s53.31 13.227 77.597-8.787c24.287-22.014 47.314 1.93 71.62 8.787 24.307 6.855 37.564.783 49.76-8.787 12.199-9.57 45.708 6.59 60.944 8.787l.08.012V138c0 13.807-11.194 25-25.001 25z"
			/>
		</svg>
	)
}



class ContentEarnings extends Component {
	render() {
		return (
			<div className="content-earnings">
				<div className="content-earnings-total-invmemb">
					<div className="content-earnings-total-invmemb-invheader content-text-blue">
						<h5>Total Investments</h5>
					</div>
					<div className="content-earnings-total-invmemb-investments content-whitebox-earnings content-text-blue">
						<h5>BTC 1.023</h5>
						<h6 className="content-text-grey">USD 7,012</h6>
					</div>
					<div className="content-earnings-total-invmemb-membersheader content-text-blue">
						<h5>Total Team Members</h5>
					</div>
					<div className="content-earnings-total-invmemb-members content-whitebox-earnings content-text-blue">
						<h5>300 Members</h5>
					</div>
				</div>
				<div className="content-earnings-profteam">
					<div className="content-earnings-profteam-profheader content-text-blue">
						<h5>Profit from Invest</h5>
					</div>
					<div className="content-earnings-profteam-profinvestments content-whitebox-earnings content-text-blue">
						<h5>DET 423</h5>
						<h6 className="content-text-grey">USD 423</h6>
					</div>
					<div className="content-earnings-profteam-totalheader content-text-blue">
						<h5>Total Team Earnings</h5>
					</div>
					<div className="content-earnings-profteam-totalteam content-whitebox-earnings content-text-blue">
						<h5>DET 423</h5>
						<h6 className="content-text-grey">USD 423</h6>
					</div>
				</div>
				<div className="content-earnings-totalprof">
					<div className="content-earnings-totalprof-header content-text-blue">
						<h5>Total Profits</h5>
					</div>
					<div className="content-earnings-totalprof-square content-whitebox-earnings content-text-blue">
						<div className="content-earnings-totalprof-square-total content-text-blue">
							<h5>DET 1000</h5>
							<h6 className="content-text-grey">USD 1000</h6>
						</div>
						<div className="content-earnings-totalprof-square-header content-text-blue">
							<h5>Last 24h</h5>
						</div>
						<div className="content-earnings-totalprof-square-hours content-text-blue">
							<h5>DET 360</h5>
							<h6 className="content-text-grey">USD 360</h6>
						</div>
					</div>
				</div>
				<div className="content-earnings-graph content-text-blue">
					<div className="content-earnings-graph-rule content-text-blue">
						<h5>300% Rule</h5>
					</div>
					<div className="content-earnings-graph-line">
						<div className="content-earnings-graph-line-border"></div>
					</div>
					<div className="content-earnings-graph-reached">
						<Graph />
						<div className="content-earnings-graph-reached-text">
							<h5>167% Reached</h5>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ContentEarnings
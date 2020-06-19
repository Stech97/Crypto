import React, { Component } from 'react'

function Graph() {
  return (
    <svg
      className="content-earnings-graph-plot-reached-svg"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin slice"
      viewBox="0 0 170 106"
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
					<div className="content-earnings-graph-plot">
						<div className="content-earnings-graph-plot-rule content-text-blue">
							<h5>300% Rule</h5>
						</div>
						<div
							className="content-earnings-graph-plot-reached"
						>
							<Graph />
							<h5>167% Reached</h5>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ContentEarnings
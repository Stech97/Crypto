import React, { Component, Fragment } from 'react'

class ContentLoginHistoryRow extends Component {
	render() {
		const { ip, country, date, time } = this.props.tab
		return(
			<div className="content-newslog-loginhistory-row">
				<h5 className="content-newslog-loginhistory-row-time">
					{date + "/" + time}
				</h5>
				<h5 className="content-newslog-loginhistory-row-ip">
					{ip}
				</h5>
				<h5 className="content-newslog-loginhistory-row-country">
					{country}
				</h5>
			</div>
		)
	}
}

class ContentLoginHistory extends Component {
	render() {
		const logins = [
			{
				ip: "111.222.333.444",
				date: "21.04",
				time: "04:20",
				country: "Austria",
			},
			{
				ip: "111.222.333.444",
				date: "22.06",
				time: "16:30",
				country: "Norway",
			},
		]
		return (
			<div className="content-newslog-loginhistory">
				<div className="content-newslog-loginhistory-header">
					<h4 className="content-newslog-loginhistory-timeheader content-newslog-loginhistory-text">
						Date/Time
					</h4>
					<h4 className="content-newslog-loginhistory-ipheader content-newslog-loginhistory-text">
						IP
					</h4>
					<h4 className="content-newslog-loginhistory-countryheader content-newslog-loginhistory-text">
						Country
					</h4>
				</div>
				{logins && logins.map((tab, id) => (
					<ContentLoginHistoryRow
						key = { id }
						tab = { tab }
					/>
				))}
			</div>
		)
	}
}

export default ContentLoginHistory
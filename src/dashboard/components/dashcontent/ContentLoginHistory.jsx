import React, { Component, Fragment } from 'react'

class ContentLoginHistory extends Component {
	render() {
		return (
			<Fragment>
				<div className="content-newslog-loginhistory">
					<div className="content-newslog-loginhistory-header">
						<div className="content-newslog-loginhistory-timeheader content-newslog-loginhistory-text">
							Date/Time
						</div>
						<div className="content-newslog-loginhistory-ipheader content-newslog-loginhistory-text">
							IP
						</div>
						<div className="content-newslog-loginhistory-countryheader content-newslog-loginhistory-text">
							Country
						</div>
					</div>
					<div className="content-newslog-loginhistory-row">
						<div className="content-newslog-loginhistory-time content-newslog-loginhistory-text">
							21.04/15:00
						</div>
						<div className="content-newslog-loginhistory-ip content-newslog-loginhistory-text">
							12.122.21
						</div>
						<div className="content-newslog-loginhistory-country content-newslog-loginhistory-text">
							Germany
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default ContentLoginHistory
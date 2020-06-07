import React, { Component } from 'react'

class ContentLinks extends Component {
	render() {
		return (
			<div className="content-links content-text-blue">
				<div className="content-links-ref content-whitebox-links">
					<div className="refbyid">REF LINK www.defima.io/12390124</div>
					<div className="refbyusername">REF LINK www.defima.io/username</div>
				</div>
				<div className="content-links-links content-whitebox-links">
					<div className="presentation-link">Download PDF</div>
					<div className="image-video-link">Image Video</div>
					<div className="tutorial-link">Telgram Channel</div>
				</div>
			</div>
		)
	}
}

export default ContentLinks
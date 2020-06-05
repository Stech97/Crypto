import React, { Component } from 'react'
import FooterNewsletter from './footer/FooterNewsletter'
import FooterNav from './footer/FooterNavigation'

const FooterLogo = () => {
	return (
	    <div className="footer-logo">
	      <img src="img/Logo-footer.png" alt="logo-footer" />
	    </div>
	)
}

class Footer extends Component {
	render() {
		return (
			<footer>
				<div className="footer-wrapper">
					<FooterLogo />
				    <FooterNav />
				    <FooterNewsletter />
			    </div>
			</footer>
		)
	}
}

export default Footer
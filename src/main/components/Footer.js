import React, { Component, Fragment } from 'react'

const FooterLogo = () => {
	return (
	    <div className="footer-logo">
	      <img src="img/Logo-footer.png" alt="logo-footer" />
	    </div>
	)
}

const FooterNewsletter = () => {
	return (
		<div className="footer-newsletter">
	        <div className="footer-newsletter-header">
	        	<h2>Newsletter</h2>
	        </div>
	      	<form className="footer-newsletter-form-box" action="POST">
		        <input
		          className="footer-newsletter-input-email"
		          type="text"
		          required
		          placeholder="maxmustter@hotmail.com"
		        />
		        <input
		          className="footer-newsletter-input-button"
		          type="button"
		          defaultValue="Notify Me"
		        />
	        </form>
	    </div>
	)
}

class Footer extends Component {
	render() {
		return (
			<footer>
				<div className="footer-wrapper">
					<FooterLogo />
				    <div className="footer-nav">
				      <div className="footer-nav-company">
				        <h3>Company</h3>
				        <a href>
				          <p>Get started</p>
				        </a>
				        <a href>
				          <p>Our mission</p>
				        </a>
				        <a href>
				          <p>Team</p>
				        </a>
				        <a href>
				          <p>Terms of Service</p>
				        </a>
				        <a href>
				          <p>Privacy Policy</p>
				        </a>
				      </div>
				      <div className="footer-nav-news">
				        <h3>News</h3>
				        <a href>
				          <p>Blog</p>
				        </a>
				        <a href>
				          <p>News Channel</p>
				        </a>
				      </div>
				      <div className="footer-nav-help">
				        <h3>Help &amp; Support</h3>
				        <a href>
				          <p>Email</p>
				        </a>
				        <a href>
				          <p>Telegram</p>
				        </a>
				        <a href>
				          <p>Presentatiom</p>
				        </a>
				      </div>
				    </div>
				    <FooterNewsletter />
			    </div>
			</footer>
		)
	}
}

export default Footer
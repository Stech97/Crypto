import React, { Component } from 'react'

const HeaderLogo = () => {
	return(
		<div className="top-logo-box">
		    <img
		        src="img/logo.png"
		        srcSet="img/logo@2x.png 2x, img/logo@3x.png 3x"
		        alt="Logo"
		      />
		</div>
	)
}

class HeaderNav extends Component {
	render() {
		return(
			<div className="top-nav-box">
				<div className="nav-bar nav-about">
					<a href>About</a>
				</div>
				<div className="nav-bar nav-team">
					<a href>Team</a>
				</div>
				<div className="nav-bar nav-blog">
					<a href>Blog</a>
				</div>
				<div className="nav-bar nav-login">
					<a href>Login</a>
				</div>
				<div className="nav-bar nav-signup">
					<a href="#" className="button-main-inversed button-signup">
					  Sign Up
					</a>
				</div>
		    </div>
		)
	}
}

class Header extends Component {
	render() {
		return (
			<header>
				<div className="header-grid-container">
			    	<HeaderLogo />
			    	<HeaderNav />
			  	</div>
			</header>
		)
	}
}

export default Header
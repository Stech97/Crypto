import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import '../styles/login.scss'

class Checkmail extends Component {
	
	render() {
		return (
			<Fragment>
				<Header />
				<h2>We have sent you confirmation email. Please check your mail box.</h2>
			</Fragment>
		)
	}
}

export default Checkmail
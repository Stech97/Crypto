import React, { Component, Fragment } from 'react'
import '../styles/login.scss'
import { connect } from 'react-redux'
import Header from './components/Header'
import Content from './components/Content'

class SignupPage extends Component {
	render() {
		return(
			<Fragment>
				<Header />
				<Content />
			</Fragment>
		)
	}
}

export default SignupPage
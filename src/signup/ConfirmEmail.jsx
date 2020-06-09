import React, { Component, Fragment } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { API } from '../config'
import Header from './components/Header'
import '../styles/login.scss'

const ConfirmRedirect = async(redirects) => {

	let { hash } = useParams()
	let response = await API('/Identity/ConfirmEmail?Id=' + hash)
	if (response.ok) {
		switch (response.data.status) {
			case "Ok":
				redirects.redirectOk(response.id)
			case "No login": 
				redirects.redirectLogin()
			default:
				return (
					<h1>Link has expired</h1>
				)
		}
	}
}

class ConfirmEmail extends Component {
	
	state = {
		redirect: null
	}

	redirectOk = (id) => {
		this.setState({ redirect: "/dashboard/?Id="+id})
	}

	redirectLogin = () => {
		this.setState({ redirect: "/login" })
	}

	render() {
		return (
			<Fragment>
				<Header />
				<ConfirmRedirect redirects={() => this.redirectOk(), () => this.redirectLogin()}/>
			</Fragment>
		)
	}
}

export default ConfirmEmail
import React, { Component } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form'
import { API } from '../../config'
import { getBalance } from '../actions/getBalance'
import { connect } from 'react-redux'

const renderField = ({ input, placeholder, className, type }) => {
	return (
 		<input {...input} className={className} placeholder={placeholder} type={type} />
	)
}

class TestAddFundsForm extends Component {
	render() {
		const { handleSubmit, reset, pristine, submitting, user, balance } = this.props

		const submit = async(values) => {
			if (( Number(values.amount) + Number(this.props.balance.btc)) >= 0 ) {
				let response = await API('Dashboard/CashBTC?Id='+localStorage.getItem('id'), 'patch', { "BTC" : values.amount })
				.then((res) => {
					if (res.ok) {
						values.amount = ""
						this.props.closeForm()
					} else {
						console.log(res)
					}
				})
				this.props.getBalanceAction(localStorage.getItem('id'))
			} else {
				alert("Not enough currency!!!")
			}
		}

		return(

			<form
				className="test-add-funds-form"
				onSubmit={handleSubmit(submit)}
			>
				<Field
					component={renderField}
					name="amount"
					className="test-add-funds-form-amount"
					type="number"
					placeholder="Enter value you want to add or withdraw"
				/>
				<button
					className="test-add-funds-form-button"
					type="submit"
					disabled={ pristine || submitting }
				>Submit</button>
			</form>
		)
	}
}

const mapStateToProps = store => {
	console.log(store)
	return {
		balance: store.ContentBalanceContainer,
		user: store.DashHeader
	}
}

const mapDispatchToProps = dispatch => {
  return {
    getBalanceAction: ID => dispatch(getBalance(ID)),
  }
}

TestAddFundsForm = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TestAddFundsForm)

export default reduxForm({
	form: 'TestAddFundsForm'
})(TestAddFundsForm)
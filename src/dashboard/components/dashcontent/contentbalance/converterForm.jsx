import React, { Component, Fragment } from 'react'
import { getFormValues, reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Exchange } from '../../../actions/exchange'
import { getBalance } from '../../../actions/getBalance'

const renderField = ({ input, className, placeholder }) => {
	return(
		<input
			{...input}
			type="text"
			min="0"
			className={className + " exchange-form-input"}
			placeholder={placeholder}
		/>
	)
}

class ExchangeForm extends Component {
	
	render() {
		const { cur1, cur2, submitting, handleSubmit, isOpened, closeModal, exchange } = this.props

		const curToString = (cur) => {
			if (cur === 'btc') {
				return 'Bitcoin'
			} else if (cur === 'dol') {
				return 'USD'
			} else {
				return 'DET'
			}
		}
		
		const curUpperCase = (cur) => {
			if (cur === 'btc') {
				return 'BTC'
			} else if (cur === 'dol') {
				return 'USD'
			} else {
				return 'DET'
			}
		}
		
		const submit = (values) => {
			console.log(values.cur1, this.props.cur1, this.props.cur2)
			this.props.ExchangeAction(Number(values[this.props.cur1]), curUpperCase(this.props.cur1), curUpperCase(this.props.cur2))
			closeModal()
		}

		

		return(
		    <form
		    	className="exchange-form"
		    	onSubmit={handleSubmit(submit)}
		    >
				<h5 className="exchange-form-label1">{"Insert " + curToString(cur1) + " Amount"}</h5>
				<Field
					component={renderField}
					name={cur1}
					className="exchange-form-cur1"
					placeholder={curToString(cur1)}
				/>
		    	<div className="exchange-form-img">
			    	<img src="/img/exchange-icon.png" />
			    </div>
			    <h5 className="exchange-form-label2">{curToString(cur2) + " Amount"}</h5>
			    <Field
					component={renderField}
					name={cur2}
					className="exchange-form-cur2"
					placeholder={curToString(cur2)}
				/>
			    <button
			    	className="exchange-form-button"
			    	type="submit"
			    	disabled={ submitting }
			    >Exchange</button>
		    </form>
		)
	}
}

const mapStateToProps = store => {
	return {
		balance: store.ContentBalanceContainer,
		exchange: store.Exchange
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getBalanceAction: ID => dispatch(getBalance(ID)),
		ExchangeAction: (amount, cur1, cur2) => dispatch(Exchange(amount, cur1, cur2))
	}
}

ExchangeForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(ExchangeForm)

export default reduxForm({
	form: 'ExchangeForm'
})(ExchangeForm)
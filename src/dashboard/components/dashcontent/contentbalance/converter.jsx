import React, { Component, Fragment } from 'react'

class ExchangeContainer extends Component {
	render() {
		const { cur1, cur2, isOpened, closeModal } = this.props
		
		const curToString = (cur) => {
			if (cur === 'btc') {
				return 'Bitcoin'
			} else if (cur === 'dol') {
				return 'USD'
			} else {
				return 'DET'
			}
		}

		return(
			<div className={isOpened ? "exchangebox" : "none"}>
				<div className="exchange">
				    <h1 className="exchange-header exchange-bluetext">
				      Exchange
				    </h1>
				    <div className="exchange-closeimg">
				      <img onClick={(isOpened) => closeModal(isOpened)} src="/img/close-icon.png" />
				    </div>
				    <div className="exchange-subheader exchange-bluetext">
				      <h2>From USD to Bitcoin</h2>
				    </div>
				    <div className="exchange-rate exchange-greytext">
				      <h3>
				        Exchange Rate
				        <br />
				        1 BTC = $7,2309
				      </h3>
				    </div>
				    <form className="exchange-form">
						<h5 className="exchange-form-label1">Insert USD Amount</h5>
						<input
					      className="exchange-form-cur1 exchange-form-input"
					      type="text"
					      placeholder="BTC"
					    >
				    	</input>
				    	<div className="exchange-form-img">
					    	<img src="/img/exchange-icon.png" />
					    </div>
					    <h5 className="exchange-form-label2">Bitcoin Amount</h5>
					    <input
					    	className="exchange-form-cur2 exchange-form-input"
					    	type="text"
					    	placeholder="$$$"
					    ></input>
					    <button className="exchange-form-button">Exchange</button>
				    </form>
				</div>
			</div>
		)
	}
}

export default class ContentBalanceConverter extends Component {
	
	state = {
		leftModal: false,
		rightModal: false,
	}
	
	toggleLeft = () => {
		this.setState({
			...this.state,
			leftModal: !this.state.leftModal,
		})
	}

	toggleRight = () => {
		this.setState({
			...this.state,
			rightModal: !this.state.rightModal,
		})
	}

	render() {
		const { currency1, currency2 } = this.props
		return (
			<div className={"content-balance-" + currency1 + "-" + currency2 }>
				<div onClick={() => this.toggleLeft()} className="content-balance-arrow-left" >
					<svg viewBox="0 0 31 56">
						<use href="#arrow-left" />
					</svg>
				</div>
				<ExchangeContainer
					key={1}
					closeModal={() => this.toggleLeft()}
					isOpened={this.state.leftModal}
					cur1 = {currency2}
					cur2 = {currency1}
				/>
				<div onClick={() => this.toggleRight()} className="content-balance-arrow-right">
					<svg viewBox="0 0 31 56">
						<use href="#arrow-right" />
					</svg>
				</div>
				<ExchangeContainer
					key = {2}
					closeModal={() => this.toggleRight()}
					isOpened={this.state.rightModal}
					cur1 = {currency1}
					cur2 = {currency2}
				/>
			</div>
		)
	}
}
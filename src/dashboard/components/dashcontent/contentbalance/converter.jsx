import React, { Component, Fragment } from 'react'

class ExchangeContainerUSDtoBTC extends Component {
	render() {
		const { isOpened, closeModal } = this.props

		return(
			<div className={isOpened ? "exchangebox" : "none"}>
				<div className="exchangeusdtobtc">
				    <div className="exchangeusdtobtc-header exchange-bluetext">
				      <h1>Exchange</h1>
				    </div>
				    <div onClick={closeModal} className="exchangeusdtobtc-closeimg">
				      <img src="/img/close-icon.png" />
				    </div>
				    <div className="exchangeusdtobtc-usdtobtc exchange-bluetext">
				      <h2>From USD to Bitcoin</h2>
				    </div>
				    <div className="exchangeusdtobtc-rate exchange-greytext">
				      <h3>
				        Exchange Rate
				        <br />1 BTC = $7,2309
				      </h3>
				    </div>
				    <div className="exchangeusdtobtc-usdammountheader exchange-bluetext">
				      <h3>Insert USD Amount</h3>
				    </div>
				    <form
				      className="exchangeusdtobtc-usdammount exchange-form"
				      type="text"
				      placeholder="1,05241231"
				    ></form>
				    <div className="exchangeusdtobtc-exchangeimg">
				      <img src="exchange.svg" />
				    </div>
				    <div className="exchangeusdtobtc-btcammountheader exchange-bluetext">
				      <h3>Bitcoin Amount</h3>
				    </div>
				    <form
				      className="exchangeusdtobtc-btcammount exchange-form"
				      type="text"
				      placeholder="= $7,212"
				    ></form>
				    <div className="exchangeusdtobtc-exchangebutton">
				      <div className="exchangeusdtobtc-exchangebutton-text">Exchange</div>
				    </div>
				</div>
			</div>
		)
	}
}

export default class ContentBalanceConverter extends Component {
	
	state = {
		leftModal: {
			isOpened: false,
		},
		rightModal: {
			isOpened: false,
		}
	}
	
	toggleLeft = () => {
		this.setState({
			...this.state,
			leftModal: {
				isOpened: true,
			},
		})
	}

	toggleRight = () => {
		this.setState({
			...this.state,
			rightModal: {
				isOpened: false,
			},
		})
	}
	
	closeLeft() {
		console.log('######')
		this.setState({
			leftModal: {
				isOpened: !this.state.leftModal.isOpened,
			}
		})
	}

	closeRight() {
		this.setState({
			rightModal: {
				isOpened: !this.state.rightModal.isOpened,
			}
		})
	}

	render() {
		const { currency1, currency2 } = this.props
		return (
			<div className={"content-balance-" + currency1 + "-" + currency2 }>
				<div onClick={this.toggleLeft} className="content-balance-arrow-left" >
					<svg viewBox="0 0 31 56">
						<use href="#arrow-left" />
					</svg>
					<ExchangeContainerUSDtoBTC closeModal={() => this.closeLeft()} isOpened = {this.state.leftModal.isOpened}/>
				</div>
				<div onClick={this.toggleRight} className="content-balance-arrow-right">
					<svg viewBox="0 0 31 56">
						<use href="#arrow-right" />
					</svg>
					<ExchangeContainerUSDtoBTC closeModal={() => this.closeRight()} isOpened = {this.state.rightModal.isOpened}/>
				</div>
			</div>
		)
	}
}
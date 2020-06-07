import React, { Component, Fragment } from 'react'

export default class ContentBalanceConverter extends Component {
	render() {
		const { currency1, currency2 } = this.props
		return (
			<div className={"content-balance-" + currency1 + "-" + currency2 }>
				<svg className="content-balance-arrow-left" viewBox="0 0 31 56">
					<use href="#arrow-left" />
				</svg>
				<svg className="content-balance-arrow-right" viewBox="0 0 31 56">
					<use href="#arrow-right" />
				</svg>
			</div>
		)
	}
}
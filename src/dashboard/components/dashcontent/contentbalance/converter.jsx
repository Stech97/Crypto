import React, { Component, Fragment } from "react";
import ExchangeForm from "./converterForm";
import { RateRequest } from "../../../actions/getRate";

class ExchangeContainer extends Component {
	state = {
		[this.props.cur1]: 0,
		[this.props.cur2]: 0,
	};

	currencyToDef = (cur) => {
		if (cur === "dol") {
			return "USD";
		} else if (cur === "coin") {
			return "DET";
		} else {
			return "BTC";
		}
	};

	getRateForComponent = () => {
		RateRequest(
			this.currencyToDef(this.props.cur1),
			this.currencyToDef(this.props.cur2)
		).then((res) => {
			console.log("res", res);
			this.setState({
				...this.state,
				[this.props.cur1]: res.data.rate,
			});
		});
		RateRequest(
			this.currencyToDef(this.props.cur2),
			this.currencyToDef(this.props.cur1)
		).then((res) => {
			console.log("res", res);
			this.setState({
				...this.state,
				[this.props.cur2]: res.data.rate,
			});
		});
	};

	componentDidMount() {
		this.interval = setInterval(() => this.getRateForComponent(), 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		this.timer = null;
	}

	render() {
		const { cur1, cur2, isOpened, closeModal } = this.props;

		const curToString = (cur) => {
			if (cur === "btc") {
				return "Bitcoin";
			} else if (cur === "dol") {
				return "USD";
			} else {
				return "DET";
			}
		};

		const ExchangeRateText = (curFrom, curTo) => {
			if (curFrom === "btc") {
				return "1 BTC = $" + Number(this.state[curFrom].toFixed(2));
			}
			if (curFrom === "dol") {
				if (curTo === "btc") {
					return "1 BTC = $" + Number(this.state[curTo].toFixed(2));
				} else if (curTo === "coin") {
					return "1 DET = $" + Number(this.state[curTo].toFixed(2));
				}
			} else {
				return "1 DET = $" + Number(this.state[curFrom].toFixed(2));
			}
		};

		const subHeader = (curr1, curr2) => {
			if (curr1 === "coin") {
				return (
					<h2>
						From Defima Token
						<br />
						{"(DET) to " + curToString(curr2)}
					</h2>
				);
			} else if (curr2 == "coin") {
				return (
					<h2>
						{"From " + curToString(curr1) + " to"}
						<br />
						Defima Token (DET)
					</h2>
				);
			} else {
				return (
					<h2>
						{"From " +
							curToString(curr1) +
							" to " +
							curToString(curr2)}
					</h2>
				);
			}
		};

		return (
			<div className={isOpened ? "exchangebox" : "none"}>
				<div className="exchange">
					<h1 className="exchange-header exchange-bluetext">
						Exchange
					</h1>
					<div className="exchange-closeimg">
						<img
							onClick={() => closeModal()}
							src="/img/close-icon.png"
						/>
					</div>
					<div className="exchange-subheader exchange-bluetext">
						{subHeader(cur1, cur2)}
					</div>
					<div className="exchange-rate exchange-greytext">
						<h3>
							Exchange Rate
							<br />
							{ExchangeRateText(cur1, cur2)}
						</h3>
					</div>
					<ExchangeForm
						cur1={{ cur: cur1, rate: this.state[cur2] }}
						cur2={{ cur: cur2, rate: this.state[cur1] }}
						isOpened={isOpened}
						closeModal={closeModal}
					/>
				</div>
			</div>
		);
	}
}

export default class ContentBalanceConverter extends Component {
	state = {
		leftModal: false,
		rightModal: false,
	};

	toggleLeft = () => {
		this.setState({
			...this.state,
			leftModal: !this.state.leftModal,
		});
	};

	toggleRight = () => {
		this.setState({
			...this.state,
			rightModal: !this.state.rightModal,
		});
	};

	render() {
		const { currency1, currency2 } = this.props;
		return (
			<div className={"content-balance-" + currency1 + "-" + currency2}>
				<div
					onClick={() => this.toggleLeft()}
					className="content-balance-arrow-left"
				>
					<svg viewBox="0 0 31 56">
						<use href="#arrow-left" />
					</svg>
				</div>
				<ExchangeContainer
					key={1}
					closeModal={() => this.toggleLeft()}
					isOpened={this.state.leftModal}
					cur1={currency2}
					cur2={currency1}
				/>
				<div
					onClick={() => this.toggleRight()}
					className="content-balance-arrow-right"
				>
					<svg viewBox="0 0 31 56">
						<use href="#arrow-right" />
					</svg>
				</div>
				<ExchangeContainer
					key={2}
					closeModal={() => this.toggleRight()}
					isOpened={this.state.rightModal}
					cur1={currency1}
					cur2={currency2}
				/>
			</div>
		);
	}
}

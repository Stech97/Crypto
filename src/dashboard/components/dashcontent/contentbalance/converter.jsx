import React, { Component, Fragment } from "react";
import ExchangeForm from "./converterForm";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { ArrowLeft, ArrowRight } from "../../../svg/iconComponents";

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
		this.setState({
			[this.props.cur1]: this.props.cur1rate,
			[this.props.cur2]: this.props.cur2rate,
		});
	};

	componentDidMount() {
		this.getRateForComponent();
	}

	render() {
		const { cur1, cur2, isOpened, closeModal, classes } = this.props;

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
					<h4>
						From Defima Token
						<br />
						{"(DET) to " + curToString(curr2)}
					</h4>
				);
			} else if (curr2 == "coin") {
				return (
					<h4>
						{"From " + curToString(curr1) + " to"}
						<br />
						Defima Token (DET)
					</h4>
				);
			} else {
				return (
					<h4>
						{"From " +
							curToString(curr1) +
							" to " +
							curToString(curr2)}
					</h4>
				);
			}
		};

		return (
			<Dialog
				className={classes.dialog}
				maxWidth="sm"
				open={isOpened}
				onClose={this.handleClose}
			>
				<DialogTitle>
					<Grid justify="space-between" container xs={12}>
						<Grid container item xs={10}>
							<Typography
								variant="h4"
								style={{
									color: "#123273",
									fontWeight: "500",
									margin: "auto 0",
								}}
							>
								Exchange
							</Typography>
						</Grid>
						<Grid container justify="flex-end" item xs={2}>
							<IconButton onClick={closeModal}>
								<CloseIcon />
							</IconButton>
						</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent>
					<ExchangeForm
						cur1={{ cur: cur1, rate: this.state[cur2] }}
						cur2={{ cur: cur2, rate: this.state[cur1] }}
						isOpened={isOpened}
						closeModal={closeModal}
					/>
				</DialogContent>
			</Dialog>
		);
	}
}

export default class BalanceConverter extends Component {
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
		const { currency1, currency2, rate1, rate2, classes } = this.props;
		return (
			<Fragment>
				<Grid className={classes.arrow} item xs={6} md="auto">
					<ArrowLeft onClick={() => this.toggleLeft()} />
					<ExchangeContainer
						key={1}
						classes={classes}
						closeModal={() => this.toggleLeft()}
						isOpened={this.state.leftModal}
						cur1={currency2}
						cur2={currency1}
						cur1rate={rate2}
						cur2rate={rate1}
					/>
				</Grid>
				<Grid className={classes.arrow} item xs={6} md="auto">
					<ArrowRight onClick={() => this.toggleRight()} />
					<ExchangeContainer
						key={2}
						classes={classes}
						closeModal={() => this.toggleRight()}
						isOpened={this.state.rightModal}
						cur1={currency1}
						cur2={currency2}
						cur1rate={rate1}
						cur2rate={rate2}
					/>
				</Grid>
			</Fragment>
		);
	}
}

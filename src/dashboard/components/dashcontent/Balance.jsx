import React, { useEffect } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import BalanceConverter from "./contentbalance/converter";
import BalanceBox from "./BalanceBox";
import BitcoinBox from "./BitcoinBox";
import AddFunds from "./contentbalance/AddFunds";
import { connect } from "react-redux";
import {
	ArrowLeft,
	ArrowRight,
	MinusIcon,
	PlusIcon,
} from "../../svg/iconComponents";
import { getBalance, getBTCRate, getDETRate } from "../../actions/getBalance";
import { makeStyles } from "@material-ui/core/styles";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const fixNum = (value) => Number(Number(value).toFixed(4));

const useStyles = makeStyles((theme) => ({
	arrow: {
		alignSelf: "center",
		display: "grid",
		"&>svg": {
			justifySelf: "center",
			fill: orange,
			stroke: orange,
			height: "1em",
			width: "auto",
			fontSize: "3.5rem",
			"&:hover": {
				padding: "0.3125rem",
			},
			[theme.breakpoints.down("sm")]: {
				transform: "rotate(90deg)",
			},
		},
	},
	balance: {
		flexWrap: "nowrap",
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap",
		},
	},
}));

function Balance(props) {
	const { balance, rate } = props;
	const classes = useStyles();
	useEffect(() => {
		props.getBalanceAction();
	}, []);

	return (
		<Grid
			item
			container
			justify="space-between"
			spacing={2}
			xs={12}
			className={classes.balance}
		>
			<BitcoinBox
				contentBlue={"BTC " + fixNum(balance.btc)}
				contentGray={"USD " + fixNum(balance.btc * rate.b2u)}
			/>
			<BalanceConverter
				currency1="btc"
				currency2="dol"
				rate1={rate.b2u}
				rate2={rate.u2b}
				classes={classes}
			/>
			<BalanceBox
				header="USD Balance"
				contentBlue={"USD " + fixNum(balance.usd)}
				contentGray={[
					"BTC " + fixNum(balance.usd * rate.u2b),
					"DET " + fixNum(balance.usd * rate.u2d),
				]}
				justify="center"
			/>
			<BalanceConverter
				currency1="dol"
				currency2="det"
				rate1={rate.u2d}
				rate2={rate.d2u}
				classes={classes}
			/>
			<BalanceBox
				header="DEFIMA Token Balance"
				contentBlue={"DET " + fixNum(balance.det)}
				contentGray={["DET/USD " + rate.d2u]}
				justify="flex-end"
			/>
		</Grid>
	);
}

const mapStateToProps = (state) => ({
	balance: state.Balance.balance,
	rate: state.Balance.rate,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getAllRateAction: () => {
			dispatch(getBTCRate());
			dispatch(getDETRate());
		},
		getBalanceAction: () => dispatch(getBalance()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Balance);

import React, { useEffect, Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { GetFinance, PatchFinance } from "../actions/finance";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
	},
	root: {
		display: "flex",
		flexGrow: 1,
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "100%",
		},
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

function Row(props) {
	const { id, title, defaultValue, symbol } = props;

	return (
		<Grid
			spacing={2}
			item
			container
			xs={12}
			justify="space-around"
			component={Box}
			container
			alignContent="center"
		>
			<Grid item container alignContent="center" xs={3}>
				<Typography align="center" variant="subtitle1">
					{title}
				</Typography>
			</Grid>
			<Grid item container alignContent="center" xs={3}>
				<TextField
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{symbol}
							</InputAdornment>
						),
					}}
					defaultValue={defaultValue}
					id={id}
					type="text"
				/>
			</Grid>
		</Grid>
	);
}

function FinanceContent(props) {
	const classes = useStyles();
	const theme = useTheme();

	const { comissions, profit, rateDet } = props;
	const levels = props.comissions;
	const [state, setState] = useState({
		comissions: props.comissions,
		rateDet: props.rateDet,
		profit: props.profit,
	});

	const handleClick = () => {};

	return (
		<main
			className={clsx(classes.content, {
				[classes.contentShift]: props.open,
			})}
		>
			<div className={classes.drawerHeader} />
			<Grid item container spacing={2} justify="space-around" xs={12}>
				<Grid item container spacing={2} xs={4}>
					<Grid spacing={2} item container xs={12}>
						<Typography align="center" variant="h5">
							Teams commissions
						</Typography>
					</Grid>
					{levels.map((percent, id) => (
						<Row
							title={"Level " + (id + 1)}
							key={id + 1}
							defaultValue={percent}
							id={"level" + (id + 1)}
							symbol="%"
						/>
					))}
				</Grid>
				<Grid item container spacing={2} xs={4}>
					<Grid item container spacing={2} xs={12}>
						<Grid spacing={2} item container xs={12}>
							<Typography align="center" variant="h5">
								Super user
							</Typography>
						</Grid>
						<Row
							title={"Comission"}
							defaultValue={comissions[7]}
							id={"superuser"}
							symbol="%"
						/>
						<Row
							title={"Threshold"}
							defaultValue={"100000"}
							id={"Threshold"}
							symbol="$"
						/>
					</Grid>
					<Grid item container spacing={2} xs={12}>
						<Grid item container xs={12}>
							<Typography align="center" variant="h5">
								Weekly percent
							</Typography>
						</Grid>
						{profit.map((row, id) => (
							<Row
								title={row.type}
								defaultValue={row.percent}
								id={id}
								key={id}
								symbol="%"
							/>
						))}
					</Grid>
					<Grid item container spacing={2} xs={12}>
						<Grid spacing={2} item container xs={12}>
							<Typography align="center" variant="h5">
								{"DET <-> USD"}
							</Typography>
						</Grid>
						<Row
							title={"Comission"}
							defaultValue={props.rateDet}
							id={"weekly"}
							symbol=""
						/>
					</Grid>
				</Grid>
				<Grid item container justify="flex-end" xs={8}>
					<Button onClick={props.PatchFinanceAction}>
						Apply Changes
					</Button>
				</Grid>
			</Grid>
		</main>
	);
}

class Finance extends Component {
	componentDidMount = () => {
		this.props.GetFinanceAction();
	};

	render() {
		console.log("this.props", this.props);
		const {
			finance: { isFetching, comissions, profit, rateDet },
		} = this.props;
		return (
			<FinanceContent
				comissions={comissions}
				profit={profit}
				rateDet={rateDet}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	finance: state.finance,
});

const mapDispatchToProps = (dispatch) => {
	return {
		GetFinanceAction: () => dispatch(GetFinance()),
		PatchFinanceAction: (rate, comission, profit) =>
			dispatch(PatchFinance(rate, comission, profit)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Finance);

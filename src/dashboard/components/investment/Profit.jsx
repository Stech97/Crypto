import React, { useState } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import moment from "moment";

const Plot = createPlotlyComponent(Plotly);

const darkBlue = "#123273";
const grayText = "#838383";
const grayBack = "#efefef";
const lightBlue = "#16428d";

const useStyles = makeStyles((theme) => ({
	whitebox: {
		boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
		border: "1px solid #efefef",
		backgroundColor: "#ffffff",
		borderRadius: "2vw",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "1rem",
		},
		flexDirection: "row",
		justifyContent: "space-around",
		"& h6": {
			color: lightBlue,
		},
	},
	header: {
		color: darkBlue,
		fontWeight: "500",
		whiteSpace: "nowrap",
		height: "3rem",
	},
	earnings: {
		justifyContent: "flex-end",
	},
	graph: {
		height: "400px",
		width: "600px",
		[theme.breakpoints.down("lg")]: {
			height: "300px",
			width: "600px",
		},
	},
	input: {
		width: "150px",
		height: "75px",
		backgroundImage: "linear-gradient(250deg, #005c9f 0%, #123273 100%)",
		boxShadow: "0 0 20px rgba(0, 0, 0, 0.06)",
		padding: "15px",
		borderRadius: "10px",
		color: "#fff",
		[theme.breakpoints.down("sm")]: {
			borderRadius: "35px",
		},
	},
	textInput: {
		"&>div": {
			borderBottom: "2px solid #fff",
			color: "#fff",
		},
	},
	selectInput: {
		borderBottom: "none!important",
		"&:before": {
			borderBottom: "none",
		},
		"& svg": {
			fill: "#fff",
			stroke: "#fff",
			color: "#fff!important",
		},
	},
	container: {
		marginTop: "20px",
	},
}));

function Profit() {
	const classes = useStyles();
	const [{ investment, product, AMP }, setInvest] = useState({
		investment: 1000,
		product: "Small",
		AMP: 0.06,
	});

	const handleChange = (event) => {
		let investment = event.target.value.slice(1);
		if (investment >= 100 && investment < 5000) {
			setInvest({ investment, product: "Small", AMP: 0.06 });
		} else if (investment >= 5000 && investment < 10000) {
			setInvest({ investment, product: "Medium", AMP: 0.08 });
		} else if (investment >= 10000) {
			setInvest({ investment, product: "Large", AMP: 0.11 });
		} else {
			setInvest({ investment, product: "Small", AMP: 0.06 });
		}
	};

	const generateMonths = () => {
		const months = [];
		const dateStart = moment();
		const dateEnd = moment().add(12, "month");
		while (dateEnd.diff(dateStart, "months") >= 0) {
			months.push(dateStart.format("M"));
			dateStart.add(1, "month");
		}
		return months;
	};

	const profitForTime = (months) => investment * (1 + AMP) ** months;

	const MonthsArray = generateMonths();

	const generateTimeStamps = () => {
		const months = [];
		const dateStart = moment();
		const dateEnd = moment().add(12, "month");
		while (dateEnd.diff(dateStart, "months") >= 0) {
			months.push(dateStart.format("YYYY-MM-DD"));
			dateStart.add(1, "month");
		}
		return months;
	};

	const TimeStampsArray = generateTimeStamps();

	const ValuesArray = MonthsArray.map((month, i) => profitForTime(i));

	const data = [
		{
			x: TimeStampsArray,
			y: ValuesArray,
			type: "scatter",
			line: {
				shape: "spline",
				color: "#005C9F",
			},
			mode: "lines",
		},
	];

	const layout = {
		autosize: true,
		margin: {
			l: 5 + "%",
			r: 5 + "%",
			b: 25 + "%",
			t: 5 + "%",
		},

		plot_bgcolor: "#EFEFEF",
		yaxis: {
			title: "SUM",
			titlefont: {
				family: "IBM Plex Sans, sans-serif",
				size: 1.5 + "rem",
				color: "#838383",
			},
			side: "right",
		},
		xaxis: {
			automargin: true,
			title: "Time",
			titlefont: {
				family: "IBM Plex Sans, sans-serif",
				size: 1.5 + "rem",
				color: "#838383",
			},
			ticks: "inside",
		},
		font: {
			family: "IBM Plex Sans",
			size: 1 + "rem",
			color: "#838383",
		},
	};

	return (
		<Grid
			className={classes.container}
			item
			container
			xs={12}
			spacing={2}
			justify="space-around"
		>
			<Grid item xs={12} justify="center">
				<Typography
					className={classes.header}
					variant="h5"
					align="center"
				>
					Profit Calculator
				</Typography>
			</Grid>
			<Grid
				className={classes.whitebox}
				item
				container
				xs={12}
				alignContent="space-around"
			>
				<Grid
					alignContent="space-around"
					spacing={2}
					item
					container
					xs={12}
					md={5}
				>
					<Grid
						component={Typography}
						align="center"
						justify="center"
						variant="h6"
						xs={6}
					>
						Investment
					</Grid>
					<Grid xs={6}>
						<TextField
							className={clsx(classes.input, classes.textInput)}
							onChange={handleChange}
							value={"$" + investment}
							id="standard-basic"
						/>
					</Grid>
					<Grid
						component={Typography}
						align="center"
						variant="h6"
						xs={6}
					>
						Product
					</Grid>
					<Grid xs={6}>
						<NativeSelect
							className={classes.input}
							inputProps={{
								name: "type",
								id: "type-native-label-placeholder",
							}}
							value={product}
						>
							<option value={"Small"}>Small</option>
							<option value={"Medium"}>Medium</option>
							<option value={"Large"}>Large</option>
						</NativeSelect>
					</Grid>
					<Grid
						component={Typography}
						align="center"
						variant="h6"
						xs={6}
					>
						Average Monthly Profit
					</Grid>
					<Grid xs={6}>
						<NativeSelect
							className={classes.input}
							inputProps={{
								name: "percent",
								id: "percent-native-label-placeholder",
							}}
							value={AMP * 100}
						>
							<option value={"6"}>6</option>
							<option value={"8"}>8</option>
							<option value={"11"}>11</option>
						</NativeSelect>
					</Grid>
				</Grid>
				<Grid className={classes.graph} item container xs={12} md={7}>
					<Plot
						data={data}
						layout={layout}
						config={{
							displayModeBar: false,
							useResizeHandler: true,
							responsive: true,
						}}
						className="investment-profit-content-plot"
					/>
				</Grid>
				<Grid
					spacing={2}
					item
					container
					xs={12}
					md={12}
					className={classes.earnings}
				>
					<Grid
						xs={4}
						md={2}
						item
						component={Typography}
						variant="subtitle1"
					>
						Weekly Earnings
						<br />
						{"+" + (ValuesArray[11] / 52).toFixed(2) + " USD"}
					</Grid>
					<Grid
						xs={4}
						md={2}
						item
						component={Typography}
						variant="subtitle1"
					>
						Montly Earnings
						<br />
						{"+" + (ValuesArray[11] / 12).toFixed(2) + " USD"}
					</Grid>
					<Grid
						xs={4}
						md={2}
						item
						component={Typography}
						variant="subtitle1"
					>
						Yearly Earnings
						<br />
						{"+" + ValuesArray[11].toFixed(2) + " USD"}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Profit;

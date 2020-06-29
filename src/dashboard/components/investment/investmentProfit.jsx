import React, { Component, Fragment } from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import moment from "moment";

const Plot = createPlotlyComponent(Plotly);

class InvestmentPlot extends Component {
	render() {
		return (
			<Plot
				data={this.props.data}
				layout={this.props.layout}
				config={{ displayModeBar: false, useResizeHandler: true }}
				className="investment-profit-content-plot"
			/>
		);
	}
}

export default class InvestmentProfit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			investment: 1000,
			product: "Small",
			AMP: 6,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		let { product, AMP } = this.state;
		let investment = event.target.value;
		if (investment >= 100 && investment < 5000) {
			product = "Small";
			AMP = 0.06;
		} else if (investment >= 5000 && investment < 10000) {
			product = "Medium";
			AMP = 0.08;
		} else if (investment >= 10000) {
			product = "Large";
			AMP = 0.11;
		} else {
			product = 0;
			AMP = 0;
		}

		this.setState({
			investment: investment,
			product: product,
			AMP: AMP,
		});
	}

	render() {
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

		const profitForTime = (investment, months) =>
			investment * (1 + this.state.AMP) ** months;

		const MonthsArray = generateMonths();

		const TimeStamps = () => {
			const months = [];
			const dateStart = moment();
			const dateEnd = moment().add(12, "month");
			while (dateEnd.diff(dateStart, "months") >= 0) {
				months.push(dateStart.format("YYYY-MM-DD"));
				dateStart.add(1, "month");
			}
			return months;
		};

		const ValuesArray = MonthsArray.map((month, i) =>
			profitForTime(this.state.investment, i)
		);

		const data = [
			{
				x: TimeStamps(),
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
			autoresize: true,
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
			<div className="investment-profit">
				<h3 className="investment-profit-header">Profit Calculator</h3>
				<div className="investment-profit-content">
					<h3 className="investment-profit-content-header-1">
						Investment
					</h3>
					<div className="investment-profit-content-box-1">
						<input
							type="text"
							value={this.state.investment}
							onChange={this.handleChange}
						/>
					</div>
					<h3 className="investment-profit-content-header-2">
						Product
					</h3>
					<div className="investment-profit-content-box-2">
						<select
							name="investment"
							size="1"
							value={this.state.product}
						>
							<option value="Small">Small</option>
							<option value="Medium">Medium</option>
							<option value="Large">Large</option>
						</select>
					</div>
					<h3 className="investment-profit-content-header-3">
						Average Monthly Profit
					</h3>
					<div className="investment-profit-content-box-3">
						<select
							name="investment"
							size="1"
							value={(this.state.AMP * 100).toString()}
						>
							<option value="6" selected="selected">
								6%
							</option>
							<option value="8">8%</option>
							<option value="11">11%</option>
						</select>
					</div>

					<InvestmentPlot data={data} layout={layout} />

					<div className="investment-profit-content-earnings">
						<h5>
							Weekly Earnings
							<br />
							+210 USD
						</h5>
						<h5>
							Montly Earnings
							<br />
							+921 USD
						</h5>
						<h5>
							Yearly Earnings
							<br />
							+21,211 USD
						</h5>
					</div>
				</div>
			</div>
		);
	}
}

import React, { Component, Fragment } from 'react'
import {Helmet} from "react-helmet";
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory' 

const Plot = createPlotlyComponent(Plotly)

const HistoryRecord = ({record: { time, type, amount, balance }}) => {
	return(
		<div className="history-balance-content-row">
			<h5 className="history-balance-content-row-column">{time}</h5>
			<h5 className="history-balance-content-row-column">{type}</h5>
			<h5 className="history-balance-content-row-column">{'$ ' + amount}</h5>
			<h5 className="history-balance-content-row-column">{'$ ' + balance}</h5>		
		</div>
	)
}

class HistoryStatisticsPlot extends Component {
	render() {
		return(
			<Plot
				data = {this.props.data}
				layout = {this.props.layout}
				config = { {displayModeBar: false, useResizeHandler: true } }
				className="history-statistics-content-plot"
			/>
		)
	}
}

export default class HistoryContent extends Component {
	render() {
		const history = [
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
			{
				time: '17.05/15:20',
				type: 'small',
				amount: 500,
				balance: 2600,
			},
		]
		
		const data = [
			{
				x: [
					'01-05-2019 22:23:00',
					'01-06-2019 22:23:00',
					'01-07-2019 22:23:00',
					'01-08-2019 22:23:00',
				],
				y: [10, 15, 16, 19],
				type: 'scatter',
				line: {
					shape: 'spline',
					color: '#005C9F',
				},
				mode: 'lines',
			},
		]

		const layout = {
			plot_bgcolor:"#EFEFEF",
			yaxis: {
				title: 'SUM',
				titlefont: {
					family: 'IBM Plex Sans, sans-serif',
					size: 25,
					color: '#838383'
				}
			},
			xaxis: {
				title: 'Time',
				titlefont: {
					family: 'IBM Plex Sans, sans-serif',
					size: 25,
					color: '#838383'
				}
			}
		}

		return(
			<div className="history-box">
				<Helmet>
					<title>History</title>
					<script crossorigin src="https://cdn.plot.ly/plotly-latest.min.js"></script>
					<script crossorigin src="https://unpkg.com/react-plotly.js@1.0.2/dist/create-plotly-component.js"></script>
				</Helmet>
				<div className="history-statistics">
					<h3 className="history-statistics-header">My Statistics</h3>
					<div className="history-statistics-content">
						<h4 className="history-statistics-content-balance">
							Active Balance:
							<br/>
							USD 2.201
						</h4>
						<HistoryStatisticsPlot 
							data = {data}
							layout = {layout}
						/>
					</div>
				</div>
				<div className="history-balance">
					<h3 className="history-balance-header">Your balance events over time</h3>
					<div className="history-balance-content">
						<div className="history-balance-content-header">
							<h5 className="history-balance-content-row-column">Time</h5>
							<h5 className="history-balance-content-row-column">Type</h5>
							<h5 className="history-balance-content-row-column">Amount (USD)</h5>
							<h5 className="history-balance-content-row-column">Balance (USD)</h5>
						</div>
						<div className="history-balance-content-box">
							{ history.map((record, i) => (
								<HistoryRecord
									key = {i}
									record = {record}
								/>
							))}
						</div>
					</div>
					<h5 className="history-balance-download">
						Download Statement CSV
					</h5>
				</div>
			</div>
		)
	}
}
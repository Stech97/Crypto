import React, { Component } from 'react'
import {Helmet} from "react-helmet";
import { HistoryRecord } from '../history/content'
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory' 

const Plot = createPlotlyComponent(Plotly)

class InvestmentDetails extends Component {

	state = {
		isOpened: true,
	}
	
	handleClick = () => {
		this.setState({ isOpened: !this.state.isOpened })
	}

	render() {
		return(
			<div className="investment-details">
				<div className="investment-details-panel">
					<div className="investment-details-panel-header">
						<h5>Investment Details</h5>
					</div>
					<div className="investment-details-panel-arrow">
					  	<svg 
					  		onClick={() => this.handleClick()}
					  		role="img"
					  		className={"arrow" + (this.state.isOpened ? "" : "-closed") }
					  		preserveAspectRatio="xMinYMin slice" viewBox="0 0 25 15"
					  	>
					    	<use href="#arrow-down" />
					  	</svg>
					</div>
				</div>
				<div className={this.state.isOpened ? "investment-details-content" : "none"}>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
					sed diam nonumy eirmod tempor invidunt ut labore et dolore 
					magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
					et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
					no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem 
					ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
					eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
					sed diam voluptua. At vero eos et accusam et justo duo dolores et 
					ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est 
					Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur 
					sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore 
					et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
					et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 
					takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor 
					sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
					invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
					At vero eos et accusam et justo duo dolores et ea rebum.</p>
				</div>
			</div>
		)
	}
}

class InvestmentGoods extends Component {
	render() {
		const goods = [
			{
				name: 'Small',
				percent: 6,
				invest: 100,
				levels: 2,
			},
			{
				name: 'Medium',
				percent: 8,
				invest: 5000,
				levels: 4,
			},
			{
				name: 'Large',
				percent: 11,
				invest: 10000,
				levels: 7,
			},
		]

		return(
			<div className="investment-goods">
				{ goods.map((good, i) => (
					<div key = {i} className="investment-goods-box">
						<div className="investment-goods-box-header">
							<h4>{good.name}</h4>
						</div>
						<div className="investment-goods-box-content">
							<p>{"Monthly Profit of up to " + good.percent + "% month"}</p>
							<p>{"Starting from $" + good.invest}</p>
							<p>{"Career commission qualified Level 1-" + good.levels}</p>
						</div>
						<div className="investment-goods-box-button">
							Invest
						</div>
					</div>
				))}
			</div>
		)
	}
}

class InvestmentPlot extends Component {
	render() {
		return(
			<Plot
				data = {this.props.data}
				layout = {this.props.layout}
				config = { {displayModeBar: false, useResizeHandler: true } }
				className="investment-profit-content-plot"
				style = {{width: "100%", height: "100%"}}
			/>
		)
	}
}

class InvestmentProfit extends Component {

	state = {
		investment: 1000,
		product: 'Small',
		profit: 6,
	}
	
	render() {
		
		const data = [
			{
				x: [
					'1',
					'2',
					'3',
					'4',
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
			autosize: true,
			margin: {
			    l: 5,
			    r: 5,
			    b: 5,
			    t: 5,
			    pad: 4
			},
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
			<div className="investment-profit">
				<h3 className="investment-profit-header">Profit Calculator</h3>
				<div className="investment-profit-content">
					<h3 className="investment-profit-content-header-1">
						Investment
					</h3>
					<div className="investment-profit-content-box-1">
						<input type="text"/>
					</div>
					<h3 className="investment-profit-content-header-2">
						Product
					</h3>
					<div className="investment-profit-content-box-2">
						<select name="investment" size="1">
							<option value="Small" selected="selected">Small</option>
							<option value="Medium">Medium</option>
							<option value="Large">Large</option>
						</select>
					</div>
					<h3 className="investment-profit-content-header-3">
						Average Monthly Profit
					</h3>
					<div className="investment-profit-content-box-3">
						<select name="investment" size="1">
							<option value="6" selected="selected">6%</option>
							<option value="8">8%</option>
							<option value="11">11%</option>
						</select>
					</div>

					<InvestmentPlot data = {data} layout = {layout} />

					<div className="investment-profit-content-earnings">
						<h5>
							Weekly Earnings
							<br/>
							+210 USD
						</h5>
						<h5>
							Montly Earnings
							<br/>
							+921 USD
						</h5>
						<h5>
							Yearly Earnings
							<br/>
							+21,211 USD							
						</h5>
					</div>
				</div>
			</div>
		)
	}
}

class InvestmentHistory extends Component {
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

		return(
			<div className="investment-history">
				<h3 className="investment-history-header">Transaction History</h3>
				<div className="investment-history-content">
					<div className="investment-history-content-header">
						<h5 className="investment-history-content-row-column">Time</h5>
						<h5 className="investment-history-content-row-column">Type</h5>
						<h5 className="investment-history-content-row-column">Amount (USD)</h5>
						<h5 className="investment-history-content-row-column">Balance (USD)</h5>
					</div>
					<div className="investment-history-content-box">
						{ history.map((record, i) => (
							<HistoryRecord
								key = {i}
								record = {record}
							/>
						))}
					</div>
				</div>
			</div>
		)
	}
}

class InvestmentContent extends Component {
	render() {
		return (
			<div className="investment-box">
				<Helmet>
					<title>Investment</title>
				</Helmet>
				<InvestmentGoods/>
				<InvestmentDetails/>
				<InvestmentProfit/>
				<InvestmentHistory/>
			</div>
		)
	}
}

export default InvestmentContent
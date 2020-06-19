import React, { Component } from 'react'

class InvestmentContent extends Component {

	render() {
		return (
			<div className="investments-box">
				<div className="investments-box-small tariff-box-style"
				>
					<div className="investments-box-small-header tariff-box-header-style investments-whitetext">
						<h1>Small</h1>
					</div>
					<div className="investments-box-small-text tariff-box-text-style investment-greytext">
						<h3>
							Monthly Profit of up to 6% month
							<br />
							Starting from $100
							<br />
							Career commission qualified Level 1-2
						</h3>
					</div>
					<div className="investments-box-small-buttonbox">
						<div className="investments-box-small-buttonbox-button tariff-box-button-style investments-whitetext">
							<div className="tariff-box-button-text-style">
								<h3>Invest</h3>
							</div>
						</div>
					</div>
				</div>
				<div
					className="investments-box-medium 
								tariff-box-style"
				>
					<div
						className="investments-box-medium-header 
									tariff-box-header-style 
									investments-whitetext"
					>
						<h1>Medium</h1>
					</div>
					<div
						className="investments-box-medium-text 
									tariff-box-text-style 
									investment-greytext"
					>
						<h3>
							Monthly Profit of up to 8% month
							<br />
							Starting from $5.000
							<br />
							Career commission qualified Level 1-4
						</h3>
					</div>
					<div className="investments-box-medium-buttonbox">
						<div
							className="investments-box-medium-buttonbox-button 
										tariff-box-button-style 
										investments-whitetext"
						>
							<div className="tariff-box-button-text-style">
								<h3>Invest</h3>
							</div>
						</div>
					</div>
				</div>
				<div
					className="investments-box-large 
								tariff-box-style"
				>
					<div
						className="investments-box-large-header 
									tariff-box-header-style 
									investments-whitetext"
					>
						<h1>Large</h1>
					</div>
					<div
						className="investments-box-large-text 
									tariff-box-text-style 
									investment-greytext"
					>
						<h3>
							Monthly Profit of up to 11% month
							<br />
							Starting from $10.000
							<br />
							Career commission qualified Level 1-7
						</h3>
					</div>
					<div className="investments-box-large-buttonbox">
						<div
							className="investments-box-large-buttonbox-button 
										tariff-box-button-style 
										investments-whitetext"
						>
							<div className="tariff-box-button-text-style">
								<h3>Invest</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="investments-box-details">
					<div
						className="investments-box-details-headertext 
									investment-bluetext"
					>
						<h3>Investment details</h3>
					</div>
					<div className="investments-box-details-headerarrow">
						<svg role="img" preserveAspectRatio="xMinYMin slice" viewBox="0 0 25 15">
							<use href="#arrow-down" />
						</svg>
					</div>
					<div
						className="investments-box-details-text 
									investment-greytext"
					>
						<h3>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
							nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
							sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
							rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
							ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
							sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
							dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
							et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
							takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
							amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
							At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
							kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
							diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
							erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
							et ea rebum.{" "}
						</h3>
					</div>
				</div>
				<div className="investments-box-calculatorheader">
					<h2>Profit Calculator</h2>
				</div>
				<div className="investments-box-calculator">
					<div
						className="investments-box-calculator-investmentheader 
									investment-bluetext"
					>
						<h2>Investment</h2>
					</div>
					<form
						className="investments-box-calculator-investment 
									investments-whitetext"
					>
						<input className="investments-form" type="text" placeholder={1000} />
					</form>
					<div className="investments-box-calculator-graph">
						<img src="graph2.svg" alt="graph" />
					</div>
					<div
						className="investments-box-calculator-productheader 
									investment-bluetext"
					>
						<h2>Product</h2>
					</div>
					<div
						className="investments-box-calculator-product 
									investments-whitetext"
					>
						<div className="investments-box-calculator-product-text investments-whitetext">
							<h3>SMALL</h3>
						</div>
						<div className="investments-box-calculator-product-headerarrow">
							<svg role="img" preserveAspectRatio="xMinYMin slice" viewBox="0 0 25 15">
								<use href="#arrow-down" />
							</svg>
						</div>
					</div>
					<div
						className="investments-box-calculator-profitheader 
									investment-bluetext"
					>
						<h2>Average Monthly Profit</h2>
					</div>
					<div
						className="investments-box-calculator-profit 
									investments-whitetext"
					>
						<div className="investments-box-calculator-profit-text investments-whitetext">
							<h3>6%</h3>
						</div>
						<div className="investments-box-calculator-profit-headerarrow">
							<svg role="img" preserveAspectRatio="xMinYMin slice" viewBox="0 0 25 15">
								<use href="#arrow-down" />
							</svg>
						</div>
					</div>
					<div
						className="investments-box-calculator-weeklyearnings 
									investment-bluetext"
					>
						<h3>Weekly Earnings +210 USD</h3>
					</div>
					<div
						className="investments-box-calculator-monthlyyearnings 
									investment-bluetext"
					>
						<h3>Monthly Earnings +921 USD</h3>
					</div>
					<div
						className="investments-box-calculator-yearlyyearnings 
									investment-bluetext"
					>
						<h3>Yearly Earnings +21,211 USD</h3>
					</div>
				</div>
				<div className="investments-box-historyheader">
					<h2>Transaction History</h2>
				</div>
				<div className="investments-box-history">
					<div className="investments-box-history-headers">
						<div
							className="investments-box-history-headers-day 
										investments-whitetext"
						>
							<h3>Day</h3>
						</div>
						<div
							className="investments-box-history-headers-product 
										investments-whitetext"
						>
							<h3>Product</h3>
						</div>
						<div
							className="investments-box-history-headers-investment 
										investments-whitetext"
						>
							<h3>Investment</h3>
						</div>
						<div
							className="investments-box-history-headers-profit 
											investments-whitetext"
						>
							<h3>Profit</h3>
						</div>
					</div>
					<div className="investments-box-history-content">
						<div className="investments-box-history-content-content1">
							<div
								className="investments-box-history-content-content1-day 
													investment-greytext"
							>
								<h2>13th May 2020</h2>
							</div>
							<div
								className="investments-box-history-content-content1-product 
													investment-greytext"
							>
								<h2>Small</h2>
							</div>
							<div
								className="investments-box-history-content-content1-investment 
																	investment-greytext"
							>
								<h2>$ 500</h2>
							</div>
							<div
								className="investments-box-history-content-content1-profit 
																	investment-greytext"
							>
								<h2>$ 120</h2>
							</div>
						</div>
						<div className="investments-box-history-content-content2">
							<div
								className="investments-box-history-content-content2-day 
																	investment-greytext"
							>
								<h2>15th May 2020</h2>
							</div>
							<div
								className="investments-box-history-content-content2-product 
																	investment-greytext"
							>
								<h2>Medium</h2>
							</div>
							<div
								className="investments-box-history-content-content2-investment 
																	investment-greytext"
							>
								<h2>$ 5000</h2>
							</div>
							<div
								className="investments-box-history-content-content2-profit 
																	investment-greytext"
							>
								<h2>$ 1200</h2>
							</div>
						</div>
						<div className="investments-box-history-content-content3">
							<div
								className="investments-box-history-content-content3-day 
																	investment-greytext"
							>
								<h2>21th May 2020</h2>
							</div>
							<div
								className="investments-box-history-content-content3-product 
																	investment-greytext"
							>
								<h2>Small</h2>
							</div>
							<div
								className="investments-box-history-content-content3-investment 
																	investment-greytext"
							>
								<h2>$ 500</h2>
							</div>
							<div
								className="investments-box-history-content-content3-profit 
																	investment-greytext"
							>
								<h2>$ 120</h2>
							</div>
						</div>
						<div className="investments-box-history-content-content4">
							<div
								className="investments-box-history-content-content4-day 
																	investment-greytext"
							>
								<h2>28th May 2020</h2>
							</div>
							<div
								className="investments-box-history-content-content4-product 
																	investment-greytext"
							>
								<h2>Large</h2>
							</div>
							<div
								className="investments-box-history-content-content4-investment 
																	investment-greytext"
							>
								<h2>$ 10.000</h2>
							</div>
							<div
								className="investments-box-history-content-content4-profit 
																	investment-greytext"
							>
								<h2>$ 2400</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default InvestmentContent
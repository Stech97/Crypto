import React, { Component } from 'react'

const HowitworksHeader = () => {
	return (
	    <div className="howitworks-header">
	      <h1>How It Works</h1>
	      <h2>Business model</h2>
	    </div>
	)
}

const HowitworksScheme = () => {
	return (
	    <div className="howitworks-scheme">
	    	<img src="img/howitworks_scheme.png" alt="howitworks_scheme" />
	    </div>
	)
}

const howitworksPoints = [
	{
		id: 1,
		header: "Investor",
		text: "The Investor deposits and buys a product."
	},
	{
		id: 2,
		header: "Defima Pool",
		text: "Every Investor is a small part of the Defima pool. With this pool, we are able to get the best profits in the market."
	},
	{
		id: 3,
		header: "Defima Oracle",
		text: "Together with Artificial Intelligence, our finance experts invest in safe and highly profitable investment opportunities in the DeFi market."
	},
	{
		id: 4,
		header: "DeFi Markets",
		text: "We close the positions and collect all profits from the DeFi markets every week. We pay all our investors and keep a small amount as a backup in the Defima pool."
	}
];

class HowitworksPoints extends Component {
	render () {
		const howitworksPointTemplate = this.props.data.map(function(item) {
			return (
				<React.Fragment key={item.id}>
					<div className={"howitworks-image-" + item.id}>
						<img src={"img/howitworks-icon-" + item.id + ".png"} alt={"howitworks-icon-" + item.id} />
					</div>
					<div className={"howitworks-caption-" + item.id}>
						<h3>{item.header}</h3>
						<p>{item.text}</p>
				    </div>
				</React.Fragment>
			)
		})

		return (
			<React.Fragment>
				{howitworksPointTemplate}
			</React.Fragment>
		)
	}
}

class Howitworks extends Component {
	render () {
		return  (
			<section className="howitworks">
				<div className="howitworks-wrapper wrapper">
					<HowitworksHeader />
					<HowitworksScheme />
					<HowitworksPoints data={howitworksPoints}/>
				</div>
			</section>
		)
	}
}

export default Howitworks 
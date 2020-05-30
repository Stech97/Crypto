import React, { Component } from 'react'

const DefimaTokenImage = () => {
	return (
		<div className="defimatoken-image">
		    <img
		    	src="img/defimacoin.png"
		        srcSet="img/defimacoin@2x.png 2x, img/defimacoin@3x.png 3x"
		        alt="defima coin"
		    />
    	</div>
	)
}

const DefimaTokenHeader = () => {
	return (
		<div className="defimatoken-content-header">
        	<h1>Defima Token</h1>
      	</div>
	)
}

const DefimaTokenText = () => {
	return (
		<div className="defimatoken-content-text">
	        <p>
	          Defima Token is a cryptocurrency token and operates on the Ethereum
	          platform. We developed the token in order to get more financial power
	          to build the platform.
	        </p>
	        <p>
	          All profits and commission earnings will be paid out in our
	          defimatoken. You can, of course, always exchange the token to Bitcoin
	          or USD, and withdraw the money.
	        </p>
	        <p>
	          For now, the token is only reserved for all Defima investors, and you
	          can only get defimatoken by profits or commissions from Defima
	          products. One token is currently worth 1 USD.
	        </p>
	        <p>
	          As part of its strategy plan, Defima plans to make a public sale (ICO)
	          in the near future. When this happens, we expect that the token will
	          double or triple its price. We recommend all Defima investors to hold
	          as many defimatoken as possible in order to benefit from the public
	          sale.
	        </p>
      	</div>
	)
}

class DefimaToken extends Component {
	render () {
		return (
			<section className="defimatoken">
				<div className="defimatoken-wrapper">
					<DefimaTokenImage />
				    <div className="defimatoken-content">
				    	<DefimaTokenHeader />
				    	<DefimaTokenText />	
				    </div>
				</div>
			</section>
		)
	}
}

export default DefimaToken
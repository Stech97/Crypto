import React, { Component } from 'react'

const OurmissionHeader = () => {
  return (
    <div className="ourmission-header">
        <h1>Our Mission</h1>
        <h2>The World Of Financial Freedom</h2>
    </div>
  )
}

const OurmissionText = () => {
    return (
        <div className="ourmission-text">
            <p>
            Our goal is to find the most profitable and secure way to participate in
            the DeFi markets. In order to get the most profit out of all
            possibilities of decentralized finance, it is of utmost importance to
            have huge investments and useful knowledge.
            </p>
            <p>
            So, the reason why we developed the DEFIMA platform is to give investors
            an easy accessibility to invest in DeFi products without having a lot of
            knowledge nor a big budget.
            </p>
            <p>
            All of the investor’s money will be bundled in a big pool. With this
            pool, we can reach higher profits, better security and long-term
            investments.
            </p>
            <p>
            With this advantage, we can reach up to 11% on your investment each
            month. This wouldn’t be possible, if everyone is on his own.
            </p>
            <p>
            Our mission is to give everyone an easy way to join the very profitable
            DeFi lending market.
            </p>
        </div>
    )
}

const OurmissionIcons = () => {
    return (
        <div className="ourmission-icons">
            <div className="ourmission-iconbox-1">
                <img
                  className="ourmission-icon-image-1"
                  src="img/ourmission-icon-1.png"
                  alt="ourmission-icon-1"
                  srcSet="img/ourmission-icon-1@2x.png 2x, img/ourmission-icon-1@3x.png 3x"
                />
            </div>
            <div className="ourmission-iconbox-2">
                <img
                  className="ourmission-icon-image-2"
                  src="img/ourmission-icon-2.png"
                  alt="ourmission-icon-2"
                  srcSet="img/ourmission-icon-2@2x.png 2x, img/ourmission-icon-2@3x.png 3x"
                />
            </div>
            <div className="ourmission-iconbox-3">
                <img
                  className="ourmission-icon-image-3"
                  src="img/ourmission-icon-3.png"
                  alt="ourmission-icon-3"
                  srcSet="img/ourmission-icon-3@2x.png 2x, img/ourmission-icon-3@3x.png 3x"
                />
            </div>
            <div className="ourmission-iconbox-4">
                <img
                  className="ourmission-icon-image-4"
                  src="img/ourmission-icon-4.png"
                  alt="ourmission-icon-4"
                  srcSet="img/ourmission-icon-4@2x.png 2x, img/ourmission-icon-4@3x.png 3x"
                />
            </div>
        </div>
    )
}

class Ourmission extends Component {
  render() {
    return (
        <section className="ourmission">
            <div className="wrapper">
                <OurmissionHeader />
                <OurmissionText />
                <OurmissionIcons />
            </div>
        </section>
    )
  }
}

export default Ourmission
import React, { Component } from 'react'

class DashContent extends Component {
  render() {
    return (
      <div className="content">
        <div className="content-balance">
          <div className="content-balance-btc-header" />
          <div className="content-balance-btc-square" />
          <div className="content-balance-btc-dol" />
          <div className="content-balance-dol-header" />
          <div className="content-balance-dol-square" />
          <div className="content-balance-dol-coin" />
          <div className="content-balance-coin-header" />
          <div className="content-balance-coin-square" />
        </div>
        <div className="content-earnings">
          <div className="content-earnings-total-invmemb" />
          <div className="content-earnings-profteam" />
          <div className="content-earnings-totalprof" />
          <div className="content-earnings-graph" />
        </div>
        <div className="content-links">
          <div className="refbyid" />
          <div className="refbyusername" />
          <div className="presentation-link" />
          <div className="image-video-link" />
          <div className="tutorial-link" />
        </div>
        <div className="content-newslog">
          <div className="content-newslog-news" />
          <div className="content-newslog-loginhistory" />
        </div>
      </div>
    )
  }
}

export default DashContent
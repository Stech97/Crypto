import React, { Component } from 'react'

class DashContent extends Component {
  render() {
    return (
      <div className="content">
        <div className="content-balance">
          <div className="content-balance-btc-header content-text-blue">
            Bitcoin Balance
          </div>
          <div className="content-balance-btc-square content-whitebox-balance">
            <div className="content-balance-btc-square-text content-text-blue">
              BTC 1.023
              <br />
              <span className="content-text-grey">USD 7,012</span>
            </div>
            <div className="content-balance-btc-square-calc">
              <div className="content-balance-btc-square-calc-plus">
                <img src="img/sprite.svg#plus" />
              </div>
              <div className="content-balance-btc-square-calc-line">
                <img src="img/sprite.svg#line" />
              </div>
              <div className="content-balance-btc-square-calc-minus">
                <img src="img/sprite.svg#minus" />
              </div>
            </div>
          </div>
          <div className="content-balance-btc-dol">
            <img src="img/sprite.svg#dol" />
          </div>
          <div className="content-balance-dol-header content-text-blue">
            USD Balance
          </div>
          <div className="content-balance-dol-square content-whitebox-balance content-text-blue">
            <p>
              USD 467
              <br />
              <span className="content-text-grey">
                BTC 0,12
                <br />
                DET 467
              </span>
            </p>
          </div>
          <div className="content-balance-dol-coin">
            <img src="img/sprite.svg#dol" />
          </div>
          <div className="content-balance-coin-header content-text-blue">
            DEFIMA Token Balance
          </div>
          <div className="content-balance-coin-square content-whitebox-balance content-text-blue">
            <p>
              DET 1000
              <br />
              <span className="content-text-grey">DET/USD 1.0</span>
            </p>
          </div>
        </div>
        <div className="content-earnings">
          <div className="content-earnings-total-invmemb">
            <div className="content-earnings-total-invmemb-invheader content-text-blue">
              Total Investments
            </div>
            <div className="content-earnings-total-invmemb-investments content-whitebox-earnings content-text-blue">
              <p>
                BTC 1.023
                <br />
                <span className="content-text-grey">USD 7,012</span>
              </p>
            </div>
            <div className="content-earnings-total-invmemb-membersheader content-text-blue">
              Total Team Members
            </div>
            <div className="content-earnings-total-invmemb-members content-whitebox-earnings content-text-blue">
              <br />
              300 Members
            </div>
          </div>
          <div className="content-earnings-profteam">
            <div className="content-earnings-profteam-profheader content-text-blue">
              Profit from Invest
            </div>
            <div className="content-earnings-profteam-profinvestments content-whitebox-earnings content-text-blue">
              <p>
                DET 423
                <br />
                <span className="content-text-grey">USD 423</span>
              </p>
            </div>
            <div className="content-earnings-profteam-totalheader content-text-blue">
              Total Team Earnings
            </div>
            <div className="content-earnings-profteam-totalteam content-whitebox-earnings content-text-blue">
              <p>
                DET 423
                <br />
                <span className="content-text-grey">USD 423</span>
              </p>
            </div>
          </div>
          <div className="content-earnings-totalprof">
            <div className="content-earnings-total-totalprof-totalprofheader content-text-blue">
              Total Profits
            </div>
            <div className="content-earnings-total-totalprof-totalprofsquare content-whitebox-earnings content-text-blue">
              <p>
                DET 1000
                <br />
                <span className="content-text-grey">USD 1000</span>
              </p>
              <p>Last 24h</p>
              DET 360
              <br />
              <span className="content-text-grey">USD 360</span>
            </div>
          </div>
          <div className="content-earnings-graph content-whitebox-earnings content-text-blue">
            <br />
            300% Rule
            <br />
            <br />
            <img src="img/sprite.svg#graph" />
          </div>
        </div>
        <div className="content-links  content-text-blue">
          <div className="content-links-ref content-whitebox-links">
            <div className="refbyid">REF LINK www.defima.io/12390124</div>
            <div className="refbyusername">REF LINK www.defima.io/username</div>
          </div>
          <div className="content-links-links content-whitebox-links">
            <div className="presentation-link">Download PDF</div>
            <div className="image-video-link">Image Video</div>
            <div className="tutorial-link">Telgram Channel</div>
          </div>
        </div>
        <div className="content-newslog">
          <div className="content-newslog-newslogheadings content-text-blue-newslogheadings">
            News
          </div>
          <div className="content-newslog-historyheadings content-text-blue-newslogheadings">
            Login History
          </div>
          <div className="content-newslog-news content-whitebox-news">
            <div className="content-text-blue content-newslog-news-heading1 ">
              Heading
            </div>
            <div className="content-newslog-news-text1 content-text-grey">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="content-newslog-news-button1 ">
              <div className="content-newslog-news-button-text">View More</div>
            </div>
            <div className="content-newslog-news-line">
              <img src="img/sprite.svg#Line_news" />
            </div>
            <div className="content-newslog-news-heading2 content-text-blue">
              Heading
            </div>
            <div className="content-newslog-news-text2 content-text-grey">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="content-newslog-news-button2 ">
              <div className="content-newslog-news-button-text">View More</div>
            </div>
          </div>
          <div className="content-newslog-loginhistory">
            <div className="content-newslog-loginhistory-timeheader content-newslog-loginhistory-text">
              Date/Time
            </div>
            <div className="content-newslog-loginhistory-ipheader content-newslog-loginhistory-text">
              IP
            </div>
            <div className="content-newslog-loginhistory-countryheader content-newslog-loginhistory-text">
              Country
            </div>
            <div className="content-newslog-loginhistory-time content-newslog-loginhistory-text">
              21.04/15:00
            </div>
            <div className="content-newslog-loginhistory-ip content-newslog-loginhistory-text">
              12.122.21
            </div>
            <div className="content-newslog-loginhistory-country content-newslog-loginhistory-text">
              Germany
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashContent
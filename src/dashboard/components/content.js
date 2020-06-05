import React, { Component } from 'react'

const Graph = () => {
  return (
    <svg
      width={260}
      height={163}
      viewBox="0 0 260 163"
    >
      <defs>
        <linearGradient
          id="r9nta"
          x1={238.6}
          x2={30.56}
          y1={10.3}
          y2={151.31}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#005c9f" />
          <stop offset={1} stopColor="#123273" />
        </linearGradient>
      </defs>
      <path
        fill="url(#r9nta)"
        d="M25 163c-13.807 0-25-11.193-25-25V18.62s53.31 13.227 77.597-8.787c24.287-22.014 47.314 1.93 71.62 8.787 24.307 6.855 37.564.783 49.76-8.787 12.199-9.57 45.708 6.59 60.944 8.787l.08.012V138c0 13.807-11.194 25-25.001 25z"
      />
    </svg>
  );
}

class DashContent extends Component {
  render() {
    return (
      <div className="contentbox">
        <div className="content">
          <div className="content-balance">
            <div className="content-balance-btc-header content-text-blue">
              <h3>Bitcoin Balance</h3>
            </div>
            <div className="content-balance-btc-square content-whitebox-balance">
              <div className="content-balance-btc-square-text content-text-blue">
                <h3>BTC 1.023</h3>
                <span className="content-text-grey">USD 7,012</span>
              </div>
              <div className="content-balance-btc-square-calc">
                <svg className="content-balance-btc-square-calc-plus" preserveAspectRatio="xMinYMid slice" viewBox="0 0 47 44">
                  <use href="#plus" />
                </svg>
                <div className="content-balance-btc-square-calc-line">
                  <div className="content-balance-btc-square-calc-line-border"></div>
                </div>
                <svg className="content-balance-btc-square-calc-minus" preserveAspectRatio="xMinYMid slice" viewBox="0 0 46 6">
                  <use href="#minus" />
                </svg>
              </div>
            </div>
            <div className="content-balance-btc-dol">
              <svg className="content-balance-arrow-left" viewBox="0 0 31 56">
                <use href="#arrow-left" />
              </svg>
              <svg className="content-balance-arrow-right" viewBox="0 0 31 56">
                <use href="#arrow-right" />
              </svg>
            </div>
            <div className="content-balance-dol-header content-text-blue">
              <h3>USD Balance</h3>
            </div>
            <div className="content-balance-dol-square content-whitebox-balance content-text-blue">
              <h3>USD 467</h3>
              <span className="content-text-grey">
                BTC 0,12
                <br />
                DET 467
              </span>
            </div>
            <div className="content-balance-dol-coin">
              <svg className="content-balance-arrow-left" viewBox="0 0 31 56">
                <use href="#arrow-left" />
              </svg>
              <svg className="content-balance-arrow-right" viewBox="0 0 31 56">
                <use href="#arrow-right" />
              </svg>
            </div>
            <div className="content-balance-coin-header content-text-blue">
              <h3>DEFIMA Token Balance</h3>
            </div>
            <div className="content-balance-coin-square content-whitebox-balance content-text-blue">
              <h3>DET 1000</h3>
              <span className="content-text-grey">DET/USD 1.0</span>
            </div>
          </div>
          <div className="content-earnings">
            <div className="content-earnings-total-invmemb">
              <div className="content-earnings-total-invmemb-invheader content-text-blue">
                <h3>Total Investments</h3>
              </div>
              <div className="content-earnings-total-invmemb-investments content-whitebox-earnings content-text-blue">
                <h3>BTC 1.023</h3>
                <span className="content-text-grey">USD 7,012</span>
                <p />
              </div>
              <div className="content-earnings-total-invmemb-membersheader content-text-blue">
                <h3>Total Team Members</h3>
              </div>
              <div className="content-earnings-total-invmemb-members content-whitebox-earnings content-text-blue">
                <br />
                <h3>300 Members</h3>
              </div>
            </div>
            <div className="content-earnings-profteam">
              <div className="content-earnings-profteam-profheader content-text-blue">
                <h3>Profit from Invest</h3>
              </div>
              <div className="content-earnings-profteam-profinvestments content-whitebox-earnings content-text-blue">
                <h3>DET 423</h3>
                <span className="content-text-grey">USD 423</span>
              </div>
              <div className="content-earnings-profteam-totalheader content-text-blue">
                <h3>Total Team Earnings</h3>
              </div>
              <div className="content-earnings-profteam-totalteam content-whitebox-earnings content-text-blue">
                <h3>DET 423</h3>
                <span className="content-text-grey">USD 423</span>
              </div>
            </div>
            <div className="content-earnings-totalprof">
              <div className="content-earnings-total-totalprof-totalprofheader content-text-blue">
                <h3>Total Profits</h3>
              </div>
              <div className="content-earnings-total-totalprof-totalprofsquare content-whitebox-earnings content-text-blue">
                <div className="content-earnings-total-totalprof-totalprofsquare-total content-text-blue">
                  <h3>DET 1000</h3>
                  <span className="content-text-grey">USD 1000</span>
                </div>
                <div className="content-earnings-total-totalprof-totalprofsquare-header content-text-blue">
                  <h3>Last 24h</h3>
                </div>
                <div className="content-earnings-total-totalprof-totalprofsquare-hours content-text-blue">
                  <h3>DET 360</h3>
                  <span className="content-text-grey">USD 360</span>
                </div>
              </div>
            </div>
            <div className="content-earnings-graph content-text-blue">
              <div className="content-earnings-graph-rule content-text-blue">
                <h3>300% Rule</h3>
              </div>
              <div className="content-earnings-graph-line">
                <div className="content-earnings-graph-line-border"></div>
              </div>
              <div className="content-earnings-graph-reached">
                <Graph />
                <div className="content-earnings-graph-reached-text">
                  <h3>167% Reached</h3>
                </div>
              </div>
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
              <div className="content-newslog-news-news1 content-newslog-news-style">
                <div className="content-newslog-news-news1-heading content-text-blue content-newslog-news-heading-style">
                  <h3>Heading</h3>
                </div>
                <div className="content-newslog-news-news1-text content-text-grey content-newslog-news-text-style">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className="content-newslog-news-news1-button content-newslog-news-button-style">
                  <div className="content-newslog-news-button-text">View More</div>
                </div>
              </div>
              <div className="content-newslog-news-line">
                <div className="content-newslog-news-line-border"></div>
              </div>
              <div className="content-newslog-news-news2 content-newslog-news-style">
                <div className="content-newslog-news-news2-heading content-text-blue content-newslog-news-heading-style">
                  <h3>Heading</h3>
                </div>
                <div className="content-newslog-news-news2-text content-text-grey content-newslog-news-text-style">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className="content-newslog-news-news2-button content-newslog-news-button-style">
                  <div className="content-newslog-news-button-text">View More</div>
                </div>
              </div>
            </div>
            <div className="content-newslog-loginhistory">
              <div className="content-newslog-loginhistory-header">
                <div className="content-newslog-loginhistory-timeheader content-newslog-loginhistory-text">
                  Date/Time
                </div>
                <div className="content-newslog-loginhistory-ipheader content-newslog-loginhistory-text">
                  IP
                </div>
                <div className="content-newslog-loginhistory-countryheader content-newslog-loginhistory-text">
                  Country
                </div>
              </div>
              <div className="content-newslog-loginhistory-row">
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
        </div>
      </div>
    )
  }
}

export default DashContent
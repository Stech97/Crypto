import React, { Component } from 'react';

const JoinusHeader = () => {
  return (
    <div className="joinus-header">
      <h1>Join the Defima Platform Now</h1>
    </div>
  );
};

const JoinusContent = () => {
  return (
    <div className="joinus-content">
      <div className="joinus-content-point-1">
        <div className="joinus-content-check">
          <i className="far fa-check-circle" />
        </div>
        <div className="joinus-content-text">
          <p>
            Starting from <span>$100</span>
          </p>
        </div>
      </div>
      <div className="joinus-content-point-2">
        <div className="joinus-content-check">
          <i className="far fa-check-circle" />
        </div>
        <div className="joinus-content-text">
          <p>
            Earn up to <span>132%</span> APY
          </p>
        </div>
      </div>
      <div className="joinus-content-point-3">
        <div className="joinus-content-check">
          <i className="far fa-check-circle" />
        </div>
        <div className="joinus-content-text">
          <p>
            Affiliate commission in <span>1-7</span> Levels
          </p>
        </div>
      </div>
    </div>
  );
};

const JoinusButtons = () => {
  return (
    <div className="joinus-buttons">
      <div className="joinus-buttons-getstarted">
        <a href="#">Get started</a>
      </div>
      <div className="joinus-buttons-download">
        <a href="#">Download presentation</a>
      </div>
    </div>
  );
};

class Joinus extends Component {
  render() {
    return (
      <section className="joinus">
        <div className="wrapper joinus-wrapper">
          <JoinusHeader />
          <JoinusContent />
          <JoinusButtons />
        </div>
      </section>
    );
  }
}

export default Joinus;

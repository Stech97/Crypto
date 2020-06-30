import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const HomescreenHeader = () => {
  return (
    <div className="homescreen-header">
      <h1>
        The most profitable and secure way to get cashflow from the DeFi
        markets.
      </h1>
    </div>
  );
};

const HomescreenButton = () => {
  return (
    <Link
      to={'/signup'}
      className="button-main button-getstarted homescreen-button"
    >
      Get started
    </Link>
  );

  // <a href="#" className="button-main button-getstarted homescreen-button">Get started</a>
};

class Homescreen extends Component {
  render() {
    return (
      <section className="homescreen">
        <div className="wrapper">
          <div className="homescreen-grid-container">
            <HomescreenHeader />
            <HomescreenButton />
          </div>
        </div>
      </section>
    );
  }
}

export default Homescreen;

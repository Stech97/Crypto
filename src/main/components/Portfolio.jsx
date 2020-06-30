import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const PortfolioHeader = () => {
  return (
    <div className="portfolio-header">
      <h1>Portfolio</h1>
      <h2>Investment Products</h2>
    </div>
  );
};

const portfolioProducts = [
  {
    id: 1,
    header: 'Small',
    percent: 6,
    investment: 100,
    level: 2,
  },
  {
    id: 2,
    header: 'Medium',
    percent: 8,
    investment: 5000,
    level: 4,
  },
  {
    id: 3,
    header: 'Large',
    percent: 11,
    investment: 10000,
    level: 7,
  },
];

class PortfolioProduct extends Component {
  render() {
    const portfolioProductTemplate = this.props.data.map(function (item) {
      return (
        <div key={item.id} className={'portfolio-product-' + item.id}>
          <div className="portfolio-product-header">
            <h3>{item.header}</h3>
          </div>
          <p>Monthly Profit of up to {item.percent}% month</p>
          <p>Starting from ${item.investment}</p>
          <p>Career commission qualified Level 1-{item.level}</p>

          <div className="porfolio-product-button">
            <Link to={'/signup'}>Invest</Link>
          </div>
        </div>
      );
    });

    return <div className="portfolio-product">{portfolioProductTemplate}</div>;
  }
}

class Portfolio extends Component {
  render() {
    return (
      <section className="portfolio">
        <div className="wrapper portfolio-wrapper">
          <PortfolioHeader />
          <PortfolioProduct data={portfolioProducts} />
        </div>
      </section>
    );
  }
}

export default Portfolio;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const darkBlue = '#123273';
export const gradient = 'linear-gradient(50deg, #123273 0%, #005c9f 100%)';
export const grayText = '#838383';
export const grayBack = '#efefef';
export const orange = '#ed7102';
export const lightBlue = '#16428d';
export const whitebox = '#efefef';
export const contentBack = '#f5fbff';

const useStyles = makeStyles((theme) => ({
  scheme: {
    width: '100%',
  },
}));

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
            <Link to={'/account/investment'}>Invest</Link>
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

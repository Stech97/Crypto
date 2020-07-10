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
import { Box } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Swiper, SwiperSlide } from 'swiper/react';

export const darkBlue = '#123273';
export const gradient = 'linear-gradient(50deg, #123273 0%, #005c9f 100%)';
export const grayText = '#838383';
export const grayBack = '#efefef';
export const orange = '#ed7102';
export const lightBlue = '#16428d';
export const whitebox = '#efefef';
export const contentBack = '#f5fbff';

const useStyles = makeStyles((theme) => ({
  card: {
    justifySelf: 'center',
    background: '#fff',
    borderRadius: '1.25rem',
    height: '100%',
    width: '20.125rem',
    justifyContent: 'center',
  },

  button_invest: {
    margin: 'auto',
    color: '#ffffff',
    width: '12.9625rem',
    height: '3.1563rem',
    backgroundImage: 'linear-gradient(77deg,#16428d 1%,#005c9f 78%)',
    margin: 'auto',
    borderRadius: '1.5625rem',
    textTransform: 'capitalize',
    '&:hover': {
      background: orange,
    },
  },
}));

const PortfolioHeader = () => {
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" style={{ color: '#ffffff' }}>
          Portfolio
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3" style={{ color: '#ffffff' }}>
          Investment Products
        </Typography>
      </Grid>
    </Grid>
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

const Invest = (item) => {
  const classes = useStyles();
  return (
    <Grid item md={6}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h3" component="h3" gutterBottom>
            {item.header}
          </Typography>
          <Typography variant="body1" component="p">
            {' '}
            Monthly Profit of up to {item.percent}% month
          </Typography>
          <Typography variant="body1" component="p">
            Starting from ${item.investment}
          </Typography>
          <Typography variant="body1" component="p">
            Career commission qualified Level 1-{item.level}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            href={'/account/investment'}
            className={classes.button_invest}
          >
            Invest
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
class PortfolioProduct extends Component {
  render() {
    const portfolioProductTemplate = this.props.data.map(function (item) {
      return <Invest item={item} />;
    });

    return <div className="portfolio-product">{portfolioProductTemplate}</div>;
  }
}

class Portfolio extends Component {
  render() {
    return (
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: orange,
          height: '100%',
          borderBottomLeftRadius: '9.375rem',
          border: 'none',
        }}
      >
        <Container maxWidth="lg">
          <section className="portfolio">
            <div className="wrapper portfolio-wrapper">
              <PortfolioHeader />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <PortfolioProduct data={portfolioProducts} />
              </Grid>
            </div>
          </section>
        </Container>
      </Container>
    );
  }
}

export default Portfolio;

import React, { Component } from 'react';

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
  white_text: {
    margin: 'auto',
    color: '#000000',
    width: '100%',
    height: '100%',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
      // color: '#FFF',
    },
  },
  header: {
    color: darkBlue,
    fontFamily: 'IBM Plex Sans',
    fontWeight: 500,
    fontSize: '1.2rem',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: '100%',
    margin: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  faq_heading: { color: darkBlue, fontWeight: 500, fontSize: '1.75rem' },
}));

const FaqHeader = () => {
  const classes = useStyles();
  return (
    <Typography variant="h2" component="h2">
      Frequently Asked Questions (FAQs)
    </Typography>
  );
};

const FaqText = () => {
  return (
    <Typography variant="body1" component="p">
      Here you’ll find answers to the most common questions our customers ask.
      If you can’t find your answer here, please email us at{' '}
      <b>contact@defima.io</b> or hit us up on <b>telegram @defimasupport</b>
    </Typography>
  );
};

const FaqAccordion = ({ state }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            {state.topic.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{state.topic.text}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

class FaqTopics extends Component {
  state = {
    topic: [
      {
        id: 1,
        opened: false,
        question: 'Who is behind DEFIMA and is DEFIMA trustworthy?',
        text: 'Lorem ipsum tvou mamu',
      },
      {
        id: 2,
        opened: false,
        question: 'How does DEFIMA protect customer’s assets?',
        text: 'Lorem ipsum tvou mamu',
      },
      {
        id: 3,
        opened: true,
        question: 'Who can participate?',
        text:
          'Anyone can participate, as long as you have an internet connection (to use our website) and access to a bitcoin wallet (to deposit and Withdraw your money). Also, please note we don’t accept people from the USA and Canada.',
      },
    ],
    openedAll: false,
  };

  toggleTopic = (id) => {
    this.setState((state) => {
      let item = state.topic.find((t) => t.id === id);
      console.log(item);
      item.opened = !item.opened;
      let openedAll = state.topic.every((t) => t.opened === true);
      return { item, openedAll };
    });
  };

  toggleAll = () => {
    this.setState((state) => {
      let openedAll = state.openedAll;
      console.log(openedAll);
      let newtopic = state.topic.filter((t) => t.opened === openedAll);
      newtopic = newtopic.forEach((t) => (t.opened = !openedAll));
      openedAll = !openedAll;
      return { newtopic, openedAll };
    });
  };

  // Сюда нужно подставить мой аккордионовский шаблон
  render() {
    return (
      <div className="faq-topic">
        {this.state.topic &&
          this.state.topic.map((item) => (
            <div
              key={item.id}
              className={
                'faq-topic-' + item.id + (item.opened ? '-opened' : '')
              }
            >
              <div className="faq-topic-question-opened">
                <p>{item.question}</p>
              </div>
              <div
                onClick={() => this.toggleTopic(item.id)}
                className={'faq-topic-arrow' + (item.opened ? '-opened' : '')}
              />
              <div
                className={'faq-topic-answer' + (item.opened ? '-opened' : '')}
              >
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        <div className="faq-topic-button">
          <Button onClick={() => this.toggleAll()}>
            {!this.state.openedAll ? 'View All' : 'Close All'}
          </Button>
        </div>
      </div>
    );
  }
}

class Faq extends Component {
  render() {
    return (
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: '#ffffff',
          height: '100%',
          border: 'none',
        }}
      >
        <Container maxWidth="lg">
          <section className="faq">
            <div className="wrapper faq-wrapper">
              <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={6}>
                  <Grid container direction="row" spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FaqHeader />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FaqText />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FaqTopics />
                </Grid>
              </Grid>
            </div>
          </section>
        </Container>
      </Container>
    );
  }
}

export default Faq;

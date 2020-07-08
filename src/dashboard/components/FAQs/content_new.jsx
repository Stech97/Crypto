import React, { Component, Fragment } from 'react';

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

const links = [
  {
    header: 'Platform Tutorial',
    Link: (className) => (
      <Button
        className={className}
        href="/files/Business_presentation.pptx"
        download
      >
        {' '}
        Download PDF
      </Button>
    ),
  },

  {
    header: 'E-Mail',
    Link: () => (
      <Button className="white_text" href="mailto:support@defima.io">
        {' '}
        Contact us
      </Button>
    ),
  },
  {
    header: 'Defima Community',
    Link: () => (
      <Button className="white_text" href="https://telegram.org">
        Join Telegram
      </Button>
    ),
  },
  {
    header: 'Blog/News',
    Link: () => (
      <Button className="white_text" href="https://medium.com">
        Open Blog
      </Button>
    ),
  },
];

const faq = [
  {
    id: 1,
    question: 'Who is behind DEFIMA?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 2,
    question: 'How does Defima protect investors assets?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 3,
    question: 'Why is DEFIMA trustworthy?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 4,
    question: 'How does Defima generate profits?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 5,
    question: 'What is Defima’s business model?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 6,
    question: 'Who can participate?',
    answer:
      'Anyone can participate, as long as you have an internet connection (to use our website) and access to a bitcoin wallet (to deposit and Withdraw your money). Also, please note we don’t accept people from the USA and Canada.',
  },
];

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

const FaqLink = ({ id, header, Link }) => {
  const classes = useStyles();
  return (
    <Grid item xs={6} md={3}>
      <Typography variant="h5" element="h5" className={classes.header}>
        {header}
      </Typography>{' '}
      <Link className={classes.white_text} />
    </Grid>
  );
};

const FaqAccordion = ({ question, answer }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const FaqHeading = ({}) => {
  const classes = useStyles();
  return <Typography className={classes.faq_heading}>{"FAQ's"}</Typography>;
};

class FaqTab extends Component {
  state = {
    isOpened: false,
  };

  handleClick = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    const { question, answer } = this.props;

    return <FaqAccordion question={question} answer={answer} />;
  }
}

class FaqsContent extends Component {
  render() {
    return (
      <div className="faq-box">
        <Grid container direction="row" spacing={3}>
          {links.map((link, id) => (
            <FaqLink key={id} {...link} />
          ))}

          <div className="faq-questions">
            <Grid item xs={12}>
              <FaqHeading />
            </Grid>
            <Grid item xs={12}>
              {faq.map((tab) => (
                <FaqTab
                  key={tab.id}
                  question={tab.question}
                  answer={tab.answer}
                />
              ))}
            </Grid>
          </div>
        </Grid>
      </div>
    );
  }
}

export default FaqsContent;

import React, { Fragment, useState, useEffect } from "react";
import FluidContainer from "../Content";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { GetFAQBlock, UpdateFAQBlock } from "../actions/mainpage";
import { connect } from "react-redux";

const darkBlue = "#123273";
const gradient = "linear-gradient(50deg, #123273 0%, #005c9f 100%)";
const grayText = "#838383";
const grayBack = "#efefef";
const orange = "#ed7102";
const lightBlue = "#16428d";
const whitebox = "#efefef";
const contentBack = "#f5fbff";

const useStyles = makeStyles((theme) => ({
  white_text: {
    margin: "auto",
    color: "#000000",
    width: "100%",
    height: "100%",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "transparent",
      // color: '#FFF',
    },
  },
  header: {
    color: darkBlue,
    fontFamily: "IBM Plex Sans",
    fontWeight: 500,
    fontSize: "1.2rem",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    width: "100%",
    margin: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  faq_heading: {
    color: darkBlue,
    fontWeight: 500,
    fontSize: "1.75rem",
  },
  accordion: {
    width: "100%",
    "&>div": {
      boxShadow: "0 0 99px rgba(0, 0, 0, 0.05)",
      backgroundColor: "#ffffff",
    },
  },
}));

const OrangeButton = withStyles({
  root: {
    color: orange,
    backgroundColor: "#fff",
    border: "3px solid " + orange,
    borderRadius: "30px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    textTransform: "none",
    "&:hover": {
      color: "#fff",
      backgroundColor: orange,
    },
    "&[disabled]": {
      borderColor: "#838383",
    },
  },
})(Button);

const FaqHeader = () => {
  const classes = useStyles();
  return (
    <Grid xs={12}>
      <Typography paragraph variant="h2" component="h2">
        Frequently Asked Questions (FAQs)
      </Typography>
    </Grid>
  );
};

const FaqText = ({ text }) => {
  return (
    <Typography paragraph variant="body1" component="p">
      {text}
    </Typography>
  );
};

const FaqAccordion = (props) => {
  const classes = useStyles();
  return (
    <Box m={1} className={classes.accordion}>
      <Accordion expanded={props.topic.opened} onChange={props.toggleTopic}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"panel" + props.id}
          id={"panel" + props.id}
        >
          <Typography className={classes.heading}>
            {props.data.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{props.data.text}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

function FaqTopics(props) {
  const { data } = props;
  const initialState = data.header
    ? {
        topic: [
          {
            opened: false,
            question: data.question1Header,
            text: data.question1Text,
          },
          {
            opened: false,
            question: data.question2Header,
            text: data.question2Text,
          },
          {
            opened: true,
            question: data.question3Header,
            text: data.question3Text,
          },
        ],
        openedAll: false,
      }
    : {
        topic: [
          {
            opened: false,
            question: "Who is behind DEFIMA and is DEFIMA trustworthy?",
            text: "Lorem ipsum tvou mamu",
          },
          {
            opened: false,
            question: "How does DEFIMA protect customer’s assets?",
            text: "Lorem ipsum tvou mamu",
          },
          {
            opened: true,
            question: "Who can participate?",
            text:
              "Anyone can participate, as long as you have an internet connection (to use our website) and access to a bitcoin wallet (to deposit and Withdraw your money). Also, please note we don’t accept people from the USA and Canada.",
          },
        ],
        openedAll: false,
      };

  const [state, setState] = useState(initialState);

  const toggleTopic = (id) => {
    var arr = state.topic;
    arr[id] = {
      ...arr[id],
      opened: !arr[id].opened,
    };
    setState({ ...state, topic: arr });
  };

  const toggleAll = () => {
    var arr = state.topic.map((item) => ({
      ...item,
      opened: !state.openedAll,
    }));
    setState({ openedAll: !state.openedAll, topic: arr });
  };

  // Сюда нужно подставить мой аккордионовский шаблон
  return (
    <Fragment>
      {state.topic.map((item, id) => (
        <FaqAccordion
          key={id}
          id={id}
          topic={item}
          data={{
            question: data[`question${id + 1}Header`],
            text: data[`question${id + 1}Text`],
          }}
          toggleTopic={() => toggleTopic(id)}
        />
      ))}
      <OrangeButton onClick={toggleAll}>
        {state.openedAll ? "Hide" : "View All"}
      </OrangeButton>
    </Fragment>
  );
}

function Faq(props) {
  const { data, block } = props;

  useEffect(() => {
    props.GetAction();
  }, [data.data.upload]);

  return (
    <FluidContainer zIndex="10" background="#fff" radius="0 0 0 75px">
      <Grid container justify="space-between" spacing={3} xs={12}>
        <Grid item container justify="flex-start" spacing={3} xs={12} md={3}>
          <FaqHeader header={data.data.header} />
          <FaqText text={data.data.text} />
        </Grid>
        <Grid item container justify="flex-end" spacing={3} xs={12} md={6}>
          <FaqTopics data={data.data} />
        </Grid>
      </Grid>
    </FluidContainer>
  );
}

const mapStateToProps = (state, props) => ({
  data: state.Mainpage.faq,
});

const mapDispatchToProps = (dispatch, state) => {
  let GetAction = () => dispatch(GetFAQBlock());
  return {
    GetAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Faq);

import React, { memo } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MinusIcon, PlusIcon } from '../../svg/iconComponents';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Container } from '@material-ui/core';

const darkBlue = '#123273';
const gradient = 'linear-gradient(50deg, #123273 0%, #005c9f 100%)';
const grayText = '#838383';
const grayBack = '#efefef';
const orange = '#ed7102';
const lightBlue = '#16428d';
const whitebox = '#efefef';
const contentBack = '#f5fbff';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: contentBack,
      contrastText: darkBlue,
    },
    secondary: {
      main: darkBlue,
      contrastText: '#ffffff',
    },
    warning: {
      main: '#fff',
      dark: orange,
    },
  },
  typography: {
    fontFamily: ['IBM Plex Sans'],
    h1: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#ffffff',
      fontSize: '2rem',
      fontWeight: 600,
      fontStyle: 'normal',
    },

    h2: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#005c9f',
      fontSize: '1.75rem',
      fontWeight: 600,
      fontStyle: 'normal',
    },

    h3: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#005c9f',
      fontSize: '1.5rem',
      fontWeight: 400,
      fontStretch: 'normal',
      fontStyle: 'italic',
    },

    h4: {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#005c9f',
      fontSize: '1.0rem',
      fontWeight: 600,
      fontStretch: 'normal',
    },

    body1: {
      fontSize: '1.0rem',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.32,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#838383',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  field: {
    width: '100%',
    '& label.Mui-focused': {
      margin: 0,
      lineHeight: 1.3,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: darkBlue,
      fontSize: '1.0rem',
      fontWeight: 300,
      fontStretch: 'normal',
    },
  },

  withdraw: {
    margin: 'auto',
    width: '16rem',
    height: '2.75rem',
    borderRadius: '1.875rem',
    border: '.1875rem solid #ed7102',
    backgroundColor: '#ed7102',
    fontFamily: 'IBM Plex Sans',
    fontSize: '1.25rem',
    lineHeight: 1.29,
    textAlign: 'center',
    padding: '.8125rem 1.9375rem',
    color: '#ffffff',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#ed7102',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '3vw',
  },

  whitebox: {
    boxShadow: '0 0 1.25rem rgba(0, 0, 0, 0.06)',
    border: '1px solid #efefef',
    backgroundColor: '#ffffff',
    borderRadius: '3vw',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '1rem',
    },
  },
  header: {
    color: darkBlue,
    fontWeight: '500',
    whiteSpace: 'nowrap',
    height: '3rem',
    width: '15vw',
    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'wrap',
    },
  },
  balanceBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '15vw',
    height: '15vw',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      height: 'auto',
      width: '100%',
    },
  },
  boxContent: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    '&>h6': {
      color: lightBlue,
    },
    '&>p': {
      color: grayText,
    },
  },
  btcContent: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: '50%',

    [theme.breakpoints.down('sm')]: {
      height: '100%',
      width: '50%',
    },
  },
  btcButtons: {
    backgroundImage: 'linear-gradient(232deg, #005c9f 0%, #123273 100%)',
    alignSelf: 'flex-end',
    width: '100%',
    height: '50%',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      width: '50%',
      borderRadius: '1rem',
    },
  },
  btcPlus: {
    borderRight: '1px solid #ffffff',
    width: '50%',
    height: '100%',
    padding: 0,
    '& svg': {
      fill: '#ffffff',
      stroke: '#ffffff',
      width: '60%',
      height: 'auto',
      fontSize: '3rem',
    },
    borderRadius: 0,
    '&:hover': {
      backgroundColor: orange,
    },
    [theme.breakpoints.down('sm')]: {
      '& svg': {
        height: 'auto',
        width: '2rem',
      },
      borderRadius: '1rem 0 0 1rem',
    },
  },
  btcMinus: {
    borderLeft: '1px solid #ffffff',
    width: '50%',
    height: '100%',
    padding: 0,
    margin: '0!important',
    '& svg': {
      fill: '#ffffff',
      stroke: '#ffffff',
      width: '60%',
      height: 'auto',
    },
    borderRadius: 0,
    '&:hover': {
      backgroundColor: orange,
    },
    [theme.breakpoints.down('sm')]: {
      '& svg': {
        height: 'auto',
        width: '2rem',
      },
    },
  },
}));

export default memo(function BitcoinBox({ contentBlue, contentGray }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid justify="flex-start" container item xs={12} md={3}>
      <Typography
        align="center"
        variant="h5"
        justify="center"
        className={classes.header}
      >
        Bitcoin Balance
      </Typography>
      <Card className={clsx(classes.whitebox, classes.balanceBox)}>
        <CardContent className={clsx(classes.btcContent, classes.boxContent)}>
          <Typography variant="h6" align="center">
            {contentBlue}
          </Typography>
          <Typography variant="subtitle1" component="p" align="center">
            {contentGray}
          </Typography>
        </CardContent>
        <CardActions className={classes.btcButtons}>
          <Button className={classes.btcPlus}>
            <PlusIcon />
          </Button>
          <Button className={classes.btcMinus} onClick={handleOpen}>
            <MinusIcon />
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Container maxWidth="sm" className={classes.paper}>
                  <Typography variant="h2" component="h2">
                    Withdraw funds
                  </Typography>
                  <Typography variant="body1" component="p">
                    To withdraw bitcoin, please let us know your bitcoin address
                    below and your exact amount you want to withdraw. Withdraw
                    requests will be executed every Monday and credited on your
                    wallet within 72 hours.
                  </Typography>
                  <Grid container direction="row">
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" component="h4">
                        Min. withdraw $10
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        id="filled-basic"
                        label="Your bitcoin address"
                        className={classes.field}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="filled-basic"
                        label="Insert withdraw amount"
                        className={classes.field}
                        variant="filled"
                      />
                    </Grid>
                  </Grid>
                  <Button size="large" className={classes.withdraw}>
                    Withdraw now
                  </Button>
                </Container>
              </Fade>
            </Modal>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
});

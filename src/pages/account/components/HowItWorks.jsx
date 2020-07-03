import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'primary',
  },
  table: {
    minWidth: 650,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function HowItWorks(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid
        container
        spacing={3}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-multiline-flexible"
              label="Header editor"
              multiline
              rowsMax={4}
              variant="outlined"
              value="Investor; Defima Pool; Defima Oracle; DeFi Markets"
            />
          </form>
          <Button variant="contained" color="secondary">
            Apply
          </Button>
        </Grid>

        <Grid item xs={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-multiline-flexible"
              label="Text editor"
              multiline
              rowsMax={4}
              variant="outlined"
              value="The Investor deposits and buys a product.; 
              Every Investor is a small part of the Defima pool. With this pool, we are able to get the best profits in the market.; 
              Together with Artificial Intelligence, our finance experts invest in safe and highly profitable investment opportunities in the DeFi market.;
              We close the positions and collect all profits from the DeFi markets every week. We pay all our investors and keep a small amount as a backup in the Defima pool."
            />
          </form>
          <Button variant="contained" color="secondary">
            Apply
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={3}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={3}>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                Edit figure
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {' '}
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  View current
                </Button>
              </label>
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
                  <div className={classes.paper}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image="/static/pirate.jpg"
                          title="Pirate"
                        />
                      </CardActionArea>
                    </Card>
                  </div>
                </Fade>
              </Modal>
            </Grid>

            {/* Лучше тоже mapping сделать */}
            <Grid item xs={3}>
              {' '}
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="grey" component="span">
                  Select file
                </Button>
              </label>
            </Grid>
            <Grid item xs={3}>
              {' '}
              <Button variant="contained" color="secondary">
                Apply
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}

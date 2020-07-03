import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
  table: {
    minWidth: 650,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
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

export default function Finance(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {' '}
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                Teams Comission
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Level 1
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="30%"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Level 2
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="20%"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Level 3
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="20%"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Level 4
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="10%"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Level 5
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="10%"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Level 6
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="5%"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Level 7
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="5%"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {' '}
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                Super User
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Comission
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="0.5%"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Threshold
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="100500"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Weekly percent
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Threshold
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="100500"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  DET to USD
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Rate
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="1"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Button variant="contained" color="secondary">
                  Apply changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}

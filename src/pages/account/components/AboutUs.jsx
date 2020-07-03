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
              value="Our goal is to find..."
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
              label="Sub-Header editor"
              multiline
              rowsMax={4}
              variant="outlined"
              value="The world of financial..."
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
              label="Name editor"
              multiline
              rowsMax={4}
              variant="outlined"
              value="Our goal is to find..."
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
              label="Title editor"
              multiline
              rowsMax={4}
              variant="outlined"
              value="Our goal is to find..."
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
              label="Link editor"
              multiline
              rowsMax={4}
              variant="outlined"
              value="Our goal is to find..."
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
              <Button variant="contained" color="primary">
                View current
              </Button>
            </Grid>
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

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
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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

export default function Dashboard(props) {
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
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Added Funds
            </Typography>
            <Typography variant="p" component="h2">
              BTC 1.02
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Invested Ammount
            </Typography>
            <Typography variant="p" component="h2">
              BTC 1.02
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Registered Users
            </Typography>
            <Typography variant="p" component="h2">
              100500
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Users with investments
            </Typography>
            <Typography variant="p" component="h2">
              50250
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Withdrawn amount
            </Typography>
            <Typography variant="p" component="h2">
              BTC 0.521
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              variant="h4"
              component="h2"
              gutterBottom
            >
              User Balance
            </Typography>
            <Typography variant="p" component="h2">
              BTC 0.521
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Comission payed to users
            </Typography>
            <Typography variant="p" component="h2">
              DET 100500
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </main>
  );
}

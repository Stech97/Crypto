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

function createData_withdrawl(user, amount, decision) {
  return { user, amount, decision };
}

const rows_withdrawl = [
  createData_withdrawl(
    'User 1',
    '0.1 BTC',
    <Button variant="contained" color="secondary">
      Accept
    </Button>,
  ),
  createData_withdrawl(
    'User 2',
    '0.5 BTC',
    <Button variant="contained" color="secondary">
      Accept
    </Button>,
  ),
];

function createData_KYC(user, view, decision) {
  return { user, view, decision };
}

const rows_KYC = [
  createData_KYC(
    'User 1',
    <Button variant="contained" color="primary">
      View
    </Button>,
    <Button variant="contained" color="secondary">
      Accept
    </Button>,
  ),
  createData_KYC(
    'User 2',
    <Button variant="contained" color="primary">
      View
    </Button>,
    <Button variant="contained" color="secondary">
      Accept
    </Button>,
  ),
];

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
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                Added Funds
              </Typography>
              <Typography variant="p" component="h2">
                BTC 1.02
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                Invested Ammount
              </Typography>
              <Typography variant="p" component="h2">
                BTC 1.02
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                Registered Users
              </Typography>
              <Typography variant="p" component="h2">
                100500
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                Users with investments
              </Typography>
              <Typography variant="p" component="h2">
                50250
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                Withdrawn amount
              </Typography>
              <Typography variant="p" component="h2">
                BTC 0.521
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
                gutterBottom
              >
                User Balance
              </Typography>
              <Typography variant="p" component="h2">
                BTC 0.521
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="p"
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

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="baseline"
        >
          <Grid item xs={3}>
            <Typography
              className={classes.title}
              variant="h5"
              component="p"
              gutterBottom
            >
              Withdral requests
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="secondary">
              Bulk accept
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="right">User</TableCell>
                    <TableCell align="right">Ammount</TableCell>
                    <TableCell align="right">Decision</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows_withdrawl.map((rows_withdrawl) => (
                    <TableRow key={rows_withdrawl.name}>
                      <TableCell align="right">{rows_withdrawl.user}</TableCell>
                      <TableCell align="right">
                        {rows_withdrawl.amount}
                      </TableCell>
                      <TableCell align="right">
                        {rows_withdrawl.decision}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="baseline"
        >
          <Grid item xs={3}>
            <Typography
              className={classes.title}
              variant="h5"
              component="p"
              gutterBottom
            >
              KYC requests
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="secondary">
              Bulk accept
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="right">User</TableCell>
                    <TableCell align="right">View KYC</TableCell>
                    <TableCell align="right">Decision</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows_KYC.map((rows_KYC) => (
                    <TableRow key={rows_KYC.name}>
                      <TableCell align="right">{rows_KYC.user}</TableCell>
                      <TableCell align="right">{rows_KYC.view}</TableCell>
                      <TableCell align="right">{rows_KYC.decision}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}

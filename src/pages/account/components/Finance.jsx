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

export default function Finance(props) {
  const { openStatus, classes, theme } = props;

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.openStatus,
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
                variant="h4"
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
                variant="h4"
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
                  variant="h4"
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
                  Comission "Small"
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="1.5%"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Comission "Medium"
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="1.5%"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  component="p"
                  gutterBottom
                >
                  Comission "Large"
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  defaultValue="1.5%"
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

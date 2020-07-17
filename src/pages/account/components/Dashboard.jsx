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
import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import DashInfo from './Dashboard/DashInfo'

import { DataGrid, ToolbarOptions } from 'tubular-react';
import {
  AggregateFunctions,
  ColumnDataType,
  ColumnSortDirection,
  createColumn,
} from 'tubular-common';

const drawerWidth = 240;

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

const rows_withdrawl_new = [
  {
    user: 'User 1',
    amount: '0.1 BTC',
    decision: 'Accept',
  },
  {
    user: 'User 2',
    amount: '0.2 BTC',
    decision: 'Accept',
  },
];
// DOCUMENTATION IS HERE: https://unosquare.github.io/tubular/tubular-react
const toolbarOptions = new ToolbarOptions({
  advancePagination: true,
  bottomPager: true,
  exportButton: true,
  printButton: false,
  searchText: true,
  topPager: true,
});

const columns = [
  createColumn('user', {
    dataType: ColumnDataType.Text,
    filterable: true,
    isKey: true,
    label: 'User',
    sortDirection: ColumnSortDirection.Ascending,
    sortOrder: 1,
    sortable: true,
  }),
  createColumn('amount', {
    dataType: ColumnDataType.Text,
    filterable: true,
    isKey: true,
    label: 'Amount',
    sortDirection: ColumnSortDirection.Ascending,
    sortOrder: 1,
    sortable: true,
  }),
  createColumn('decision', {
    dataType: ColumnDataType.Text,
    filterable: true,
    isKey: true,
    label: 'Decision',
    sortDirection: ColumnSortDirection.Ascending,
    sortOrder: 1,
    sortable: true,
  }),
];

const SampleGrid = () => (
  <DataGrid
    columns={columns}
    dataSource={rows_withdrawl_new}
    gridName="Grid"
    toolbarOptions={toolbarOptions}
  />
);

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
  const { openStatus, classes, theme } = props;
  const [age, setPeriod] = React.useState('');

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: openStatus,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid container spacing={3}>
        <DashInfo />

        <Grid item xs={3}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Period</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value="Last Week"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Last Week</MenuItem>
              <MenuItem value={20}>Last Month</MenuItem>
              <MenuItem value={30}>Last 3 Month</MenuItem>
              <MenuItem value={40}>Last 6 Month</MenuItem>
              <MenuItem value={50}>Last Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Box my={2} component={Grid}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          
          <Box my={2} component={Grid} container item xs={3}>
            <Typography
              className={classes.title}
              variant="h5"
              component="p"
              gutterBottom
            >
              Withdraw requests
            </Typography>
          </Box>
          <Box my={2} component={Grid} container item xs={3}>
            <Button variant="contained" color="secondary">
              Bulk accept
            </Button>
          </Box>
          <Box my={2} component={Grid} container item xs={12}>
            <SampleGrid />
          </Box>
        </Box>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
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
                  {rows_KYC.map((rows_KYC, id) => (
                    <TableRow key={id}>
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

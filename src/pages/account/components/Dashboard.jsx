import React, { useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import MenuItem from "@material-ui/core/MenuItem";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import DashInfo from "./Dashboard/DashInfo";
import KYC from "./Dashboard/KYC";
import Withdraw from "./Dashboard/Withdraw";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabPanel(props) {
  const { period, index, ...other } = props;

  return (
    <Fragment>
      {period === index && (
        <DashInfo
          period={period}
          role="tabpanel"
          hidden={period !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        />
      )}
    </Fragment>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashboard(props) {
  const { openStatus, classes, theme } = props;
  const [period, setPeriod] = useState(0);

  const handleChange = (event, newValue) => {
    setPeriod(newValue);
  };

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: openStatus,
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid container spacing={3}>
        <Grid item container xs={12}>
          <Tabs
            value={period}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Last Week" {...a11yProps(1)} />
            <Tab label="Last Month" {...a11yProps(2)} />
            <Tab label="Last 3 Month" {...a11yProps(3)} />
            <Tab label="Last 6 Months" {...a11yProps(4)} />
            <Tab label="Last Year" {...a11yProps(5)} />
          </Tabs>
        </Grid>
        <Grid item container spacing={3} xs={12}>
          <TabPanel period={period} index={0} />
          <TabPanel period={period} index={1} />
          <TabPanel period={period} index={2} />
          <TabPanel period={period} index={3} />
          <TabPanel period={period} index={4} />
          <TabPanel period={period} index={5} />
        </Grid>
        <KYC />
        <Withdraw />
      </Grid>
    </main>
  );
}

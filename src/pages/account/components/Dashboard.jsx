import React from "react";
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

export default function Dashboard(props) {
  const { openStatus, classes, theme } = props;
  const [age, setPeriod] = React.useState("");

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
        <KYC />
        <Withdraw />
      </Grid>
    </main>
  );
}

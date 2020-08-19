import React, { Component, useEffect } from "react";
import { Helmet } from "react-helmet";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "react-redux";
import { getHistoryTable } from "../../actions/historyTable";
import CsvDownload from "react-json-to-csv";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HistoryTable from "./Table";
import { getBalance, getBTCRate, getDETRate } from "../../actions/getBalance";

import Container from "@material-ui/core/Container";
import CustomTable from "../Table";

const Plot = createPlotlyComponent(Plotly);

class HistoryStatisticsPlot extends Component {
  render() {
    console.log("this.props.data", this.props.data);
    return (
      <Plot
        data={this.props.data}
        layout={this.props.layout}
        config={{ displayModeBar: false, useResizeHandler: true }}
        useResizeHandler={true}
        style={{ width: "100%", height: "300px" }}
      />
    );
  }
}

const darkBlue = "#123273";

const lightBlue = "#16428d";

const useStyles = makeStyles((theme) => ({
  whitebox: {
    padding: "2rem",
    boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.06)",
    border: "1px solid #efefef",
    backgroundColor: "#ffffff",
    borderRadius: "2vw",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "1rem",
    },
  },
  header: {
    color: darkBlue,
    fontWeight: "500",
    whiteSpace: "nowrap",
    height: "3rem",
  },
  activeBalance: {
    color: lightBlue,
    fontWeight: "500",
  },
  button: {
    padding: "10px",
    color: "#123273",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.06)",
    backgroundColor: "#ffffff",
    border: "1px solid #efefef",
    marginTop: "20px",
  },
}));

function HistoryContent(props) {
  useEffect(() => {
    props.getHistoryTableAction();
    props.getBalanceAction();
    props.getAllRateAction();
  }, []);

  const { table, balance } = props;

  const historyData = {
    x: table.records
      .reverse()
      .map((record, i) => moment(record.time).format("YYYY-MM-DD")),
    y: table.records.reverse().map((record, i) => record.balance),
  };
  const data = [
    {
      x: historyData.x,
      y: historyData.y,
      type: "scatter",
      line: {
        shape: "spline",
        color: "#005C9F",
      },
      mode: "lines",
    },
  ];

  const layout = {
    margin: {
      l: 10,
      r: 10,
      b: 10,
      t: 10,
    },

    plot_bgcolor: "#EFEFEF",
    yaxis: {
      title: "SUM",
      titlefont: {
        family: "IBM Plex Sans, sans-serif",
        size: 1.5 + "rem",
        color: "#838383",
      },
      side: "right",
    },
    xaxis: {
      automargin: true,
      title: "Time",
      titlefont: {
        family: "IBM Plex Sans, sans-serif",
        size: 1.5 + "rem",
        color: "#838383",
      },
      ticks: "inside",
    },
    font: {
      family: "IBM Plex Sans",
      size: 1 + "rem",
      color: "#838383",
    },
  };
  const headers = ["Time", "Type", "Amount (USD)", "Balance (USD)"];
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>History</title>
      </Helmet>
      <Grid container xs={12}>
        <Grid
          item
          align="center"
          variant="h5"
          className={classes.header}
          component={Typography}
          xs={12}
        >
          My Statistics
        </Grid>
        <Grid item container xs={12} className={classes.whitebox}>
          <Grid
            component={Typography}
            className={classes.activeBalance}
            variant="body1"
            align="center"
            item
            xs={12}
            md={3}
          >
            Active Balance:
            <br />
            {"USD " +
              (
                Number(balance.balance.usd) +
                Number(balance.balance.btc) * Number(balance.rate.b2u) +
                Number(balance.balance.det) * Number(balance.rate.d2u)
              ).toFixed(2)}
          </Grid>
          <Grid item xs={12} md={9}>
            <HistoryStatisticsPlot data={data} layout={layout} />
          </Grid>
        </Grid>
      </Grid>
      <CustomTable headers={headers} content={table.records} />
      <HistoryTable content={table.records} />
      <Grid item container xs={12} spacing={2} justify="flex-end">
        <CsvDownload
          className={classes.button}
          filename="investment.csv"
          data={table.records}
        >
          Download Statement CSV
        </CsvDownload>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (store) => ({
  balance: store.Balance,
  table: store.historyTable,
});

const mapDispatchToProps = (dispatch) => ({
  getHistoryTableAction: () => dispatch(getHistoryTable()),
  getBalanceAction: () => dispatch(getBalance()),
  getAllRateAction: () => {
    dispatch(getBTCRate());
    dispatch(getDETRate());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContent);

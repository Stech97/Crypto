import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import { connect } from 'react-redux';
import { getHistoryTable } from '../../actions/historyTable';
import CsvDownload from 'react-json-to-csv';

const Plot = createPlotlyComponent(Plotly);

export const HistoryRecord = ({ record: { time, type, amount, balance } }) => {
  return (
    <div className="history-balance-content-row">
      <h5 className="history-balance-content-row-column">{time}</h5>
      <h5 className="history-balance-content-row-column">{type}</h5>
      <h5 className="history-balance-content-row-column">
        {'$ ' + amount.toFixed(2)}
      </h5>
      <h5 className="history-balance-content-row-column">
        {'$ ' + balance.toFixed(2)}
      </h5>
    </div>
  );
};

class HistoryStatisticsPlot extends Component {
  render() {
    return (
      <Plot
        data={this.props.data}
        layout={this.props.layout}
        config={{ displayModeBar: false, useResizeHandler: true }}
        className="history-statistics-content-plot"
      />
    );
  }
}

class HistoryContent extends Component {
  componentDidMount = () => {
    this.props.getHistoryTableAction();
  };

  render() {
    const { table } = this.props;

    const data = [
      {
        x: [
          '01-05-2019 22:23:00',
          '01-06-2019 22:23:00',
          '01-07-2019 22:23:00',
          '01-08-2019 22:23:00',
        ],
        y: [10, 15, 16, 19],
        type: 'scatter',
        line: {
          shape: 'spline',
          color: '#005C9F',
        },
        mode: 'lines',
      },
    ];

    const layout = {
      autoresize: true,
      margin: {
        l: 5 + '%',
        r: 5 + '%',
        b: 25 + '%',
        t: 5 + '%',
      },

      plot_bgcolor: '#EFEFEF',
      yaxis: {
        title: 'SUM',
        titlefont: {
          family: 'IBM Plex Sans, sans-serif',
          size: 1.5 + 'rem',
          color: '#838383',
        },
        side: 'right',
      },
      xaxis: {
        automargin: true,
        title: 'Time',
        titlefont: {
          family: 'IBM Plex Sans, sans-serif',
          size: 1.5 + 'rem',
          color: '#838383',
        },
        ticks: 'inside',
      },
      font: {
        family: 'IBM Plex Sans',
        size: 1 + 'rem',
        color: '#838383',
      },
    };

    return (
      <div className="history-box">
        <Helmet>
          <title>History</title>
        </Helmet>
        <div className="history-statistics">
          <h3 className="history-statistics-header">My Statistics</h3>
          <div className="history-statistics-content">
            <h4 className="history-statistics-content-balance">
              Active Balance:
              <br />
              USD 2.201
            </h4>
            <HistoryStatisticsPlot data={data} layout={layout} />
          </div>
        </div>
        <div className="history-balance">
          <h3 className="history-balance-header">
            Your balance events over time
          </h3>
          <div className="history-balance-content">
            <div className="history-balance-content-header">
              <h5 className="history-balance-content-row-column">Time</h5>
              <h5 className="history-balance-content-row-column">Type</h5>
              <h5 className="history-balance-content-row-column">
                Amount (USD)
              </h5>
              <h5 className="history-balance-content-row-column">
                Balance (USD)
              </h5>
            </div>
            <div className="history-balance-content-box">
              {this.props.table.records.map((record, i) => (
                <HistoryRecord key={i} record={record} />
              ))}
            </div>
          </div>
          <CsvDownload
            className="history-balance-download"
            filename="balance.csv"
            data={this.props.table.records}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  table: store.historyTable,
});

const mapDispatchToProps = (dispatch) => ({
  getHistoryTableAction: () => dispatch(getHistoryTable()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContent);

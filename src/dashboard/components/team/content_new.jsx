import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMembersAmount } from "../../actions/getTeam";
import { getTeamEarnings } from "../../actions/getTeamEarnings";
import { RateRequest } from "../../actions/getRate";
import TeamTable from "./TeamTable";
import Container from "@material-ui/core/Container";
import Whitebox from "../Whitebox";
import Links from "../Links";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  invested: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function TeamContent(props) {
  const [rate, setRate] = useState(0);
  const { earnings, team, getTotalMemAction, getTeamEarningsAction } = props;

  useEffect(() => {
    getTotalMemAction();
    getTeamEarningsAction();
    getRate();
  }, []);

  const getRate = () => {
    RateRequest("USD", "DET").then((res) => {
      if (res.ok) {
        setRate(res.data.rate);
      } else if (res.error.status === 400) {
        setRate(0);
      } else {
        setRate(0);
      }
    });
  };

  const totalInvestedSum = () => {
    var sum = 0;
    for (let i = 0; i < team.levels.length; i++) {
      sum += team.levels[i].totalInvested;
    }
    let data = {
      usd: sum,
      det: sum * rate,
    };
    return data;
  };

  const totalInvested = totalInvestedSum();

  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid
        item
        container
        justify="space-between"
        spacing={2}
        xs={12}
        className={classes.balance}
      >
        <Whitebox
          align
          xs={12}
          sm={6}
          md={3}
          item
          header="TOTAL Team Members"
          contentBlue={
            earnings.totalMembers.data.totalMember
              ? earnings.totalMembers.data.totalMember
              : "0"
          }
        />
        <Whitebox
          xs={12}
          sm={6}
          md={3}
          item
          className={classes.invested}
          header="TOTAL Team Invested"
          contentBlue={"$" + totalInvested.usd.toFixed(2)}
          contentGray={["DET " + totalInvested.det.toFixed(2)]}
        />
        <Whitebox
          xs={12}
          sm={6}
          md={6}
          item
          header="TOTAL Team Earnings"
          contentBlue={"DET " + earnings.teamEarnings.data.det.toFixed(2)}
          contentGray={["$" + earnings.teamEarnings.data.usd.toFixed(2)]}
        />
      </Grid>
      <Links />
      <Grid item container justify="space-between" spacing={2} xs={12}>
        <TeamTable />
      </Grid>
    </Container>
  );
}

const mapStateToProps = (store) => ({
  earnings: store.Earnings,
  team: store.TeamTable,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTotalMemAction: () => dispatch(getMembersAmount()),
    getTeamEarningsAction: () => dispatch(getTeamEarnings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamContent);

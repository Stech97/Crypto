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

const useStyles = makeStyles((theme) => ({
  invested: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function TeamContent(props) {
  const [rate, setRate] = useState(0);

  getRate = () => {
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

  useEffect(() => {
    return () => {
      props.getTotalMemAction();
      props.getTeamEarningsAction();
      getRate();
    };
  }, []);

  const { earnings, team } = props;

  const totalInvestedSum = () => {
    var sum = 0;
    for (let i = 0; i < team.levels.length; i++) {
      sum += team.levels[i].totalInvested;
    }
    let data = {
      usd: sum,
      det: sum * state.rate,
    };
    return data;
  };

  const totalInvested = totalInvestedSum();

  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Whitebox
        xs={6}
        md={3}
        header="TOTAL Team Members"
        contentBlue={earnings.totalMembers.data.totalMember}
      />
      <Whitebox
        xs={6}
        md={3}
        className={classes.invested}
        header="TOTAL Team Invested"
        contentBlue={"$" + totalInvested.usd.toFixed(2)}
        contentGray={"DET " + totalInvested.det.toFixed(2)}
      />
      <Whitebox
        xs={6}
        md={6}
        header="TOTAL Team Earnings"
        contentBlue={"DET " + earnings.teamEarnings.data.det.toFixed(2)}
        contentGray={"$" + earnings.teamEarnings.data.usd.toFixed(2)}
      />
      <Links />
      <TeamTable />
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

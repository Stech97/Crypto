import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getMembersAmount } from "../../actions/getTeam";
import { getTeamEarnings } from "../../actions/getTeamEarnings";
import { getTeamTable } from "../../actions/getTeamTable";
import TeamPopupPlus from "./teamPopup";
import { RateRequest } from "../../actions/getRate";

const MemberLevelRow = ({
  obj: {
    boxclass,
    level,
    members,
    totalInvested,
    profitsPaid,
    commission,
    totalEarning,
  },
}) => {
  return (
    <div className="team-table-content-row">
      <h5 className="team-table-content-row-l gray-text">{"Level " + level}</h5>
      <h5 className="team-table-content-row-m gray-text">{members}</h5>
      <h5 className="team-table-content-row-i gray-text">
        {(totalInvested / 1000).toFixed(3) + "k $"}
      </h5>
      <h5 className="team-table-content-row-p gray-text">
        {(profitsPaid / 1000).toFixed(3) + "k"}
      </h5>
      <h5 className="team-table-content-row-c gray-text">
        {commission * 100 + "%"}
      </h5>
      <h5 className="team-table-content-row-e gray-text">
        {(totalEarning / 1000).toFixed(3) + "k USD"}
      </h5>
    </div>
  );
};

class TeamContent extends Component {
  state = {
    rate: 0,
  };

  getRate = () => {
    RateRequest("USD", "DET").then((res) => {
      if (res.ok) {
        this.setState({
          ...this.state,
          rate: res.data.rate,
        });
      } else if (res.error.status === 400) {
        this.setState({
          ...this.state,
          rate: 0,
        });
      } else {
        this.setState({
          ...this.state,
          rate: 0,
        });
      }
    });
  };

  componentDidMount = () => {
    this.props.getTotalMemAction();
    this.props.getTeamEarningsAction();
    this.props.teamTableAction();
    this.getRate();
  };

  render() {
    const levels = [
      [
        {
          level: 1,
          members: 10,
          totalInvested: 46,
          profits_paid: 12,
          commission: 50,
          total_earned: 1.78,
          boxclass: "middle",
        },
        {
          level: 2,
          members: 10,
          totalInvested: 46,
          profits_paid: 12,
          commission: 50,
          total_earned: 1.78,
          boxclass: "end",
        },
      ],
      [
        {
          level: 3,
          members: 10,
          totalInvested: 46,
          profits_paid: 12,
          commission: 50,
          total_earned: 1.78,
          boxclass: "start",
        },
        {
          level: 4,
          members: 10,
          totalInvested: 46,
          profits_paid: 12,
          commission: 50,
          total_earned: 1.78,
          boxclass: "middle",
        },
        {
          level: 5,
          members: 10,
          totalInvested: 46,
          profits_paid: 12,
          commission: 50,
          total_earned: 1.78,
          boxclass: "end",
        },
      ],
      [
        {
          level: 6,
          members: 10,
          totalInvested: 46,
          profits_paid: 12,
          commission: 50,
          total_earned: 1.78,
          boxclass: "start",
        },
        {
          level: 7,
          members: 10,
          totalInvested: 46,
          profits_paid: 12,
          commission: 50,
          total_earned: 1.78,
          boxclass: "end",
        },
      ],
    ];

    const { earnings, team } = this.props;

    const totalInvestedSum = () => {
      var sum = 0;
      for (let i = 0; i < team.levels.length; i++) {
        sum += team.levels[i].totalInvested;
      }
      let data = {
        usd: sum,
        det: sum * this.state.rate,
      };
      return data;
    };

    const totalInvested = totalInvestedSum();

    const parseTeam = (levels) => {
      var array = [];
      var result = [];
      if (levels.length < 2) {
        for (let i = 0; i < Math.min(levels.length, 2); i++) {
          array.push(levels[i]);
        }
        result.push(array);
      } else if (levels.length < 5) {
        for (let i = 0; i < Math.min(levels.length, 2); i++) {
          array.push(levels[i]);
        }
        result.push(array);
        for (let i = 2; i < Math.min(levels.length, 5); i++) {
          array.push(levels[i]);
        }
        result.push(array);
      } else {
        for (let i = 0; i < Math.min(levels.length, 2); i++) {
          array.push(levels[i]);
        }
        result.push(array);
        for (let i = 2; i < Math.min(levels.length, 5); i++) {
          array.push(levels[i]);
        }
        result.push(array);
        for (let i = 5; i < levels.length; i++) {
          array.push(levels[i]);
        }
        result.push(array);
      }
      return result;
    };

    return (
      <div className="team-box">
        <div className="team-total">
          <div className="team-total-members team-total-box">
            <h5 className="team-total-box-header">TOTAL Team Members</h5>
            <div className="team-total-box-content team-whitebox">
              <h3 className="team-total-box-content-centered">
                {earnings.totalMembers.data.TotalMember}
              </h3>
            </div>
          </div>
          <div className="team-total-invested team-total-box">
            <h5 className="team-total-box-header">TOTAL Team Invested</h5>
            <div className="team-total-box-content team-whitebox">
              <h3>{"$" + totalInvested.usd}</h3>
              <h5>{"DET " + totalInvested.det}</h5>
            </div>
          </div>
          <div className="team-total-earnings team-total-box">
            <h5 className="team-total-box-header">TOTAL Team Earnings</h5>
            <div className="team-total-box-content team-whitebox">
              <h3>{"DET " + earnings.teamEarnings.data.det}</h3>
              <h5>{"$" + earnings.teamEarnings.data.usd}</h5>
            </div>
          </div>
        </div>
        <div className="team-ref team-whitebox">
          <div className="team-ref-id">
            <h6>
              <b>REF LINK</b> www.defima.io/12390124
            </h6>
          </div>
          <div className="team-ref-username">
            <h6>
              <b>REF LINK</b> www.defima.io/username
            </h6>
          </div>
        </div>
        <div className="team-table">
          <div className="team-table-header">
            <h5 className="team-table-header-l">Level</h5>
            <h5 className="team-table-header-m">Members</h5>
            <h5 className="team-table-header-i">Total Invested</h5>
            <h5 className="team-table-header-p">Profits paid</h5>
            <h5 className="team-table-header-c">Commission</h5>
            <h5 className="team-table-header-e">Total earned</h5>
          </div>
          {parseTeam(team.levels).map((block, j) => (
            <div key={j + 1} className="team-table-content">
              {block.map((level, i) => (
                <Fragment key={level.level}>
                  <TeamPopupPlus obj={level} />
                  <MemberLevelRow obj={level} />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  earnings: store.Earnings,
  team: store.TeamTable,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTotalMemAction: () => dispatch(getMembersAmount()),
    getTeamEarningsAction: () => dispatch(getTeamEarnings()),
    teamTableAction: () => dispatch(getTeamTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamContent);

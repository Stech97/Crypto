import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getMembersAmount } from '../../actions/getTeam';
import { getTeamEarnings } from '../../actions/getTeamEarnings';
import { RateRequest } from '../../actions/getRate';
import TeamTable from './TeamTable';
import TeamLinks from './TeamLinks';
import { Container } from '@material-ui/core';

class TeamContent extends Component {
  state = {
    rate: 0,
  };

  getRate = () => {
    RateRequest('USD', 'DET').then((res) => {
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
    this.getRate();
  };

  render() {
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

    return (
      <Container maxWidth="lg">
        <div className="team-box">
          <div className="team-total">
            <div className="team-total-members team-total-box">
              <h5 className="team-total-box-header">TOTAL Team Members</h5>
              <div className="team-total-box-content team-whitebox">
                <h3 className="team-total-box-content-centered">
                  {earnings.totalMembers.data.totalMember}
                </h3>
              </div>
            </div>
            <div className="team-total-invested team-total-box">
              <h5 className="team-total-box-header">TOTAL Team Invested</h5>
              <div className="team-total-box-content team-whitebox">
                <h3>{'$' + totalInvested.usd.toFixed(2)}</h3>
                <h5>{'DET ' + totalInvested.det.toFixed(2)}</h5>
              </div>
            </div>
            <div className="team-total-earnings team-total-box">
              <h5 className="team-total-box-header">TOTAL Team Earnings</h5>
              <div className="team-total-box-content team-whitebox">
                <h3>{'DET ' + earnings.teamEarnings.data.det.toFixed(2)}</h3>
                <h5>{'$' + earnings.teamEarnings.data.usd.toFixed(2)}</h5>
              </div>
            </div>
          </div>
          <TeamLinks />
          <TeamTable />
        </div>
      </Container>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamContent);

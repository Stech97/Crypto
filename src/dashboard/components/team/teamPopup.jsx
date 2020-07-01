import React, { Component } from "react";
import { getTeamPopup } from "../../actions/teamPopup";
import { connect } from "react-redux";

class TeamPopupTable extends Component {
  componentDidMount = () => {
    //this.props.getTeamPopupAction()
  };

  render() {
    const teammates = [
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
      {
        username: "Username",
        email: "seb@hotmail.com",
        invested: "12,4k DET",
        earnings: "1,5k DET",
      },
    ];

    return (
      <div className="popup-team">
        <div className="popup-team-header">
          <h5>Username</h5>
          <h5>Email</h5>
          <h5>Invested</h5>
          <h5>Your earnings</h5>
        </div>
        <div className="popup-team-box">
          {teammates.map((teammate, id) => (
            <div className="popup-team-row">
              <h5>{teammate.username}</h5>
              <h5>{teammate.email}</h5>
              <h5>{teammate.invested}</h5>
              <h5>{teammate.earnings}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  table: store.teamPopupTable,
});

const mapDispatchToProps = (dispatch) => ({
  getTeamPopupAction: () => dispatch(getTeamPopup()),
});

TeamPopupTable = connect(mapStateToProps, mapDispatchToProps)(TeamPopupTable);

const TeamPopup = (props) => {
  return (
    <div className={props.isOpened ? "popup" : "none"}>
      <div onClick={() => props.closeModal()} className="popup-layer"></div>
      <div className="popup-wrapper-team">
        <div className="popup-wrapper-team-header">
          <h1>{"Team Overview Level " + props.level}</h1>
        </div>
        <div className="popup-wrapper-team-cross">
          <img onClick={() => props.closeModal()} src="/img/close-icon.png" />
        </div>
        <div className="popup-wrapper-team-content">
          <TeamPopupTable />
        </div>
      </div>
    </div>
  );
};

export default class TeamPopupPlus extends Component {
  state = {
    isOpened: false,
  };

  toggleModal = () => {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  };

  render() {
    const { obj } = this.props;
    return (
      <div className="team-table-content-plus">
        <svg
          onClick={() => this.toggleModal()}
          preserveAspectRatio="xMinYMid slice"
          viewBox="0 0 47 44"
        >
          <use href="#plus" />
        </svg>
        <TeamPopup
          level={obj.level}
          isOpened={this.state.isOpened}
          closeModal={() => this.toggleModal()}
        />
      </div>
    );
  }
}

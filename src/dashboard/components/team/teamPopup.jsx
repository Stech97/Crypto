import React, { Component } from "react";

class TeamPopupTable extends Component {
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
    ];

    return (
      <div className="popup-team">
        <div className="popup-team-header">
          <h5>Username</h5>
          <h5>Email</h5>
          <h5>Invested</h5>
          <h5>Your earnings</h5>
        </div>
        {teammates.map((teammate, id) => (
          <div className="popup-team-row">
            <h5>{teammate.username}</h5>
            <h5>{teammate.email}</h5>
            <h5>{teammate.invested}</h5>
            <h5>{teammate.earnings}</h5>
          </div>
        ))}
      </div>
    );
  }
}

const TeamPopup = (props) => {
  return (
    <div className={props.isOpened ? "popup" : "none"}>
      <div onClick={() => props.closeModal()} className="popup-layer"></div>
      <div className="popup-wrapper">
        <div className="popup-wrapper-header">
          <h1>{"Team Overview Level " + props.level}</h1>
        </div>
        <div className="popup-wrapper-cross">
          <img onClick={() => props.closeModal()} src="/img/close-icon.png" />
        </div>
        <div className="popup-wrapper-content">
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

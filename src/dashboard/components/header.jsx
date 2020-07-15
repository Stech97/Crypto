import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions/header';
import { userLogoutGet } from '../actions/logout';
import { Link, useHistory } from 'react-router-dom';

function DashHeaderMenu(props) {
  let history = useHistory();
  const clickLogout = () => {
    props.getUserLogoutAction();
    history.push('/login');
  };

  return (
    <div
      className={
        'dash-header-user-menu' + (props.isClosed ? '-closed' : '-opened')
      }
    >
      <Link to="/account/settings" className="dash-header-user-menu-settings">
        <svg
          className="dash-header-user-menu-settings-icon"
          preserveAspectRatio="xMinYMid slice"
          viewBox="0 0 37 37"
        >
          <use href="#settings" />
        </svg>
        <div className="dash-header-user-menu-settings-text">
          <p>Settings</p>
        </div>
      </Link>
      <div className="dash-header-user-menu-logout" onClick={clickLogout}>
        <svg
          className="dash-header-user-menu-logout-icon"
          preserveAspectRatio="xMinYMid slice"
          viewBox="0 0 37 37"
        >
          <use href="#dashboards-icon-white" />
        </svg>
        <div className="dash-header-user-menu-logout-text">
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

class DashHeader extends Component {
  state = {
    isClosed: true,
  };

  toggle = (value) => {
    this.setState({ isClosed: !this.state.isClosed });
  };

  componentDidMount() {
    if (this.props.user.user.username === '') {
      this.props.setUserAction();
    }
  }

  render() {
    const { user, getUserLogoutAction } = this.props;

    return (
      <div className="dash-header">
        <div className="dash-header-logo">
          <Link to="/main">
            <img src="/img/logo.png" />
          </Link>
        </div>
        <div className="dash-header-user" onClick={() => this.toggle()}>
          <div className="dash-header-user-icon">
            <svg preserveAspectRatio="xMinYMid slice" viewBox="-1 0 35 37">
              <use href="#dashboards-icon-white" />
            </svg>
          </div>
          <div className="dash-header-user-name">
            <h2>{user.isFetching ? 'Loading...' : user.user.username}</h2>
          </div>
          <div
            className={
              'dash-header-user-arrow' + (this.state.isClosed ? '-closed' : '')
            }
          >
            <svg
              role="img"
              preserveAspectRatio="xMinYMin slice"
              viewBox="0 0 25 15"
            >
              <use href="#arrow-down" />
            </svg>
          </div>
        </div>
        <DashHeaderMenu
          isClosed={this.state.isClosed}
          getUserLogoutAction={() => getUserLogoutAction()}
        />
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserAction: (username) => dispatch(setUser(username)),
    getUserLogoutAction: () => dispatch(userLogoutGet()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashHeader);

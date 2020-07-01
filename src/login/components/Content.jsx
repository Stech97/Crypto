import React, { Component } from "react";
import "../../styles/login.scss";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="login-header">
      <h1>Login to defima</h1>
    </div>
  );
};

const LoginForgot = () => {
  return (
    <div className="login-forgot">
      <p>
        Forgot your password? <Link to="/forgot">Restore it</Link>
      </p>
    </div>
  );
};

const LoginFooter = () => {
  return (
    <div className="login-footer">
      <Link to="/terms&conditions">Terms of use</Link>
      <Link to="/privacy">Privacy policy</Link>
    </div>
  );
};

class Content extends Component {
  render() {
    return (
      <section className="login">
        <div className="login-wrapper wrapper">
          <LoginHeader />
          <LoginForm />
          <LoginForgot />
          <LoginFooter />
        </div>
      </section>
    );
  }
}

export default Content;

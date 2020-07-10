import React, { Component, Fragment } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { userPostFetch } from '../actions/signin';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {
  required,
  validateUsername,
  validatePassword,
} from '../../signup/components/SignupForm';

const renderField = ({
  input,
  placeholder,
  className,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div className={className}>
      <input {...input} type={type} placeholder={placeholder} />
      {touched &&
        ((error && (
          <p className="error">
            <i class="fas fa-exclamation-circle"></i>
            {' ' + error}
          </p>
        )) ||
          (warning && (
            <p className="error">
              <i class="fas fa-exclamation-circle"></i>
              {' ' + warning}
            </p>
          )))}
    </div>
  );
};

class LoginForm extends Component {
  render() {
    const {
      handleSubmit,
      reset,
      pristine,
      dirty,
      submitting,
      user,
      error,
      hasErrors,
      invalid,
    } = this.props;

    const submit = (values) => {
      if (values.username.length < 6) {
        throw new SubmissionError({
          username: 'Too short username!',
        });
      } else if (values.username.length >= 15) {
        throw new SubmissionError({
          username: 'Too long username!',
        });
      } else if (values.password.length <= 6) {
        throw new SubmissionError({
          password: 'Too short password!',
        });
      } else if (values.password.length >= 15) {
        throw new SubmissionError({
          password: 'Too long password!',
        });
      } else {
        this.props.userPostFetch({
          username: values.username,
          password: values.password,
        });
      }
    };

    return (
      <form className="login-form" onSubmit={handleSubmit(submit)}>
        <Field
          component={renderField}
          name="username"
          className="login-form-user"
          type="text"
          placeholder="Username"
          validate={[required, validateUsername]}
        />
        <Field
          component={renderField}
          name="password"
          className="login-form-password"
          type="password"
          placeholder="Password"
          validate={[required, validatePassword]}
        />
        <div className="login-form-button">
          <button
            type="submit"
            disabled={invalid || hasErrors || pristine || submitting}
          >
            {user.isFetching || submitting ? 'Loading...' : 'Login'}
          </button>
          {user.error.type && (
            <p className="error">
              <i className="fas fa-exclamation-circle"></i>
              {' ' + user.error.message}
            </p>
          )}
          {error && (
            <p className="error">
              <i className="fas fa-exclamation-circle"></i>
              {' ' + error}
            </p>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userPostFetch: (userInfo) => dispatch(userPostFetch(userInfo)),
});

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
})(LoginForm);

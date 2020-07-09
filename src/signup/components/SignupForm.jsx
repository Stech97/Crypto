import React, { Component } from 'react';
import { SubmissionError, reduxForm, Field } from 'redux-form';
import { API } from '../../config';
import { Link } from 'react-router-dom';
import { createUserPostFetch } from '../actions/signup';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

const SignupHeader = () => {
  return (
    <div className="signup-box-header">
      <h1>Create an Account</h1>
    </div>
  );
};

export const required = (value) =>
  value || typeof value === 'number' ? undefined : 'Required';

const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength10 = maxLength(10);

const maxLength15 = maxLength(15);

export const maxLength25 = maxLength(25);

export const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);

export const minLength3 = minLength(3);

export const minLength6 = minLength(6);

const number = (value) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const minValue = (min) => (value) =>
  value && value < min ? `Must be at least ${min}` : undefined;

const minValue13 = minValue(13);

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const aol = (value) =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined;

const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

export const phoneNumber = (value) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const validateUsername = (value) =>
  value && !/^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/.test(value)
    ? 'Invalid username'
    : undefined;

export const validatePassword = (value) =>
  value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
    ? 'At least one number and one letter'
    : undefined;

const checkUserGetFetch = async (user) => {
  let response = await API('/Identity/CheckInfo', 'post', user);
  return response;
};

const asyncValidate = (values /*, dispatch*/) => {
  return checkUserGetFetch({
    Username: values.username,
    Email: values.email,
  }).then((res) => {
    if (res.status === 200) {
      return undefined;
    } else if (res.error.status === 400) {
      console.log('##### :', res);
      if (res.data.username || res.data.email) {
        if (res.data.username && res.data.email)
          throw {
            username: 'Username exists',
            email: 'Email exists',
            error: 'Signup failed',
          };
        if (res.data.username)
          throw {
            username: 'Username exists',
            error: 'Signup failed',
          };
        if (res.data.email)
          throw {
            email: 'Email exists',
            error: 'Signup failed',
          };
      }
    } else {
      return undefined;
    }
  });
};

const textField = ({
  input,
  placeholder,
  className,
  type,
  meta: { asyncValidating, touched, error, warning },
}) => {
  return (
    <div className={'signup-box-error signup-box-' + className}>
      <input
        {...input}
        className={'signup-form signup-form-' + className}
        type={type}
        placeholder={placeholder}
      />
      {asyncValidating ? (
        <Loader type="Rings" color="#ffffff" height={50} width={50} />
      ) : (
        touched &&
        ((error && <p className="error">{error}</p>) ||
          (warning && <p className="error">{warning}</p>))
      )}
    </div>
  );
};

const checkField = ({
  input,
  className,
  type,
  id,
  link,
  linktext,
  text,
  meta: { touched, error },
}) => {
  return (
    <div className={'signup-box-' + className}>
      <label className={'signup-form-' + className} htmlFor={id}>
        <input {...input} type={type} id={id} />
        <span
          className={
            touched && error
              ? 'checkmark-' + className + '-error'
              : 'checkmark-' + className
          }
        >
          <i class="fas fa-check"></i>
        </span>
        <span>
          {text}
          {link && <Link to="/terms&conditions">{linktext}</Link>}
        </span>
      </label>
    </div>
  );
};

class SignupForm extends Component {
  render() {
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
      createUser,
      error,
      hasErrors,
      invalid,
    } = this.props;

    const submit = (values) => {
      if (values.password !== values.password2) {
        throw new SubmissionError({
          password2: 'Passwords must match',
          _error: 'Signup failed',
        });
      }
      if (!values.termsagree) {
        throw new SubmissionError({
          termsagree: 'Field reuired!',
          _error: 'Signup failed',
        });
      }
      if (!values.countrycheck) {
        throw new SubmissionError({
          countrycheck: 'Field required!',
          _error: 'Signup failed',
        });
      }
      if (values.password === values.username) {
        throw new SubmissionError({
          password: 'Username and password should mismatch!',
          _error: 'Signup failed',
        });
      }
      this.props.createUserAction(values);
    };

    if (createUser.error.type === 'done') {
      return (
        <section className="signup-wrapper">
          <form className="signup-box">
            <div className="signup-box-header">
              <h2>
                Thanks for creating your defima account, please go to your email
                inbox and confirm your registration
              </h2>
            </div>
          </form>
        </section>
      );
    } else {
      return (
        <section className="signup-wrapper">
          {(createUser.isFetching || submitting) && (
            <Loader type="Rings" color="#ffffff" height={100} width={100} />
          )}
          <form
            className={
              createUser.isFetching || submitting ? 'none' : 'signup-box'
            }
            onSubmit={handleSubmit(submit)}
          >
            <SignupHeader />
            {error && <p className="error">{error}</p>}
            {createUser.error.type && (
              <p className="error">{createUser.error.message}</p>
            )}
            <Field
              component={textField}
              name="firstname"
              placeholder="First Name"
              className="firstname"
              type="text"
              validate={[required, maxLength10, minLength2]}
              warn={alphaNumeric}
            />
            <Field
              component={textField}
              name="lastname"
              placeholder="Last Name"
              className="lastname"
              type="text"
              validate={[required, maxLength25, minLength3]}
              warn={alphaNumeric}
            />
            <Field
              component={textField}
              name="email"
              placeholder="E-Mail"
              className="email"
              type="text"
              validate={[required, email]}
              warn={aol}
            />
            <Field
              component={textField}
              name="username"
              placeholder="Username"
              className="username"
              type="text"
              validate={[required, maxLength25, minLength3, validateUsername]}
            />
            <Field
              component={textField}
              name="password"
              placeholder="Password"
              className="password"
              type="password"
              validate={[required, maxLength25, minLength6, validatePassword]}
            />
            <Field
              component={textField}
              name="password2"
              placeholder="Repeat Password"
              className="repeatpassword"
              type="password"
              validate={[required, maxLength25, minLength6, validatePassword]}
            />
            <Field
              component={checkField}
              name="termsagree"
              className="termsagree"
              id="termsAgree"
              type="checkbox"
              text="I agree with "
              link={true}
              linktext="Terms and conditions"
            />
            <Field
              component={checkField}
              name="countrycheck"
              className="countrycheck"
              id="countryCheck"
              type="checkbox"
              text="I am NOT the US or CANADA Citizen"
              link={false}
              linktext="linktext"
            />
            <div className="signup-box-bottomcontainer">
              <div className="signup-box-bottomcontainer-button">
                <button
                  className="signup-form-button"
                  type="submit"
                  disabled={invalid || hasErrors || pristine || submitting}
                >
                  {createUser.isFetching ? 'Loading...' : 'Create an account'}
                </button>
              </div>
              <div className="signup-box-bottomcontainer-signin">
                <p>
                  Already have an account? <Link to={'/Login'}>Sign in</Link>
                </p>
              </div>
              <div className="signup-box-bottomcontainer-footer">
                <Link to="/terms&conditions">Terms of use</Link>
                &nbsp;<Link to="/privacy">Privacy policy</Link>
              </div>
            </div>
          </form>
        </section>
      );
    }
  }
}

const mapStateToProps = (store) => {
  return {
    createUser: store.createUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createUserAction: (userInfo) => dispatch(createUserPostFetch(userInfo)),
});

SignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm);

export default reduxForm({
  form: 'SignupForm', // a unique identifier for this form
  asyncValidate,
  asyncBlurFields: ['username', 'email'],
})(SignupForm);

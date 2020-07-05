import React, { Component, Fragment } from "react";
import { getFormValues, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  getUserInfo,
  updateUserInfo,
  updateShowInfo,
} from "../../actions/UserInfo";

const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";

const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const validatePhone = (value) =>
  value && !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(value)
    ? "Invalid phone"
    : undefined;

const maxLength10 = maxLength(10);

const maxLength15 = maxLength(15);

const maxLength25 = maxLength(25);

const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

const minLength2 = minLength(2);

const minLength3 = minLength(3);

const minLength6 = minLength(6);

const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;

const minValue = (min) => (value) =>
  value && value < min ? `Must be at least ${min}` : undefined;

const minValue13 = minValue(13);

const emailValidate = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const aol = (value) =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

const phoneNumber = (value) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

class AccountInfo extends Component {
  componentDidMount = () => {
    this.props.getUserInfoAction();
  };

  render() {
    const infoField = ({
      input,
      info: { id, label, type, placeholder },
      meta: { touched, error, warning },
    }) => {
      return (
        <Fragment>
          <label htmlFor={id}>{label}</label>
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            id={id}
            disabled={id === "username"}
          />
          {touched &&
            ((error && <p className="error">{error}</p>) ||
              (warning && <p className="error">{warning}</p>))}
        </Fragment>
      );
    };

    const CheckField = ({ checked }) => {
      return (
        <label className="settings-info-form-check-box" htmlFor="showInfo">
          <input
            id="showInfo"
            type="checkbox"
            checked={userInfo.isShowInfo === "true" || userInfo.isShowInfo}
            onChange={(e) => this.props.updateShowInfoAction(e.target.checked)}
          />
          <span className="slider round"></span>
          <span className="settings-info-form-check-box-span">
            Show my Information to my Sponsor
          </span>
        </label>
      );
    };

    const {
      userInfo,
      user,
      handleSubmit,
      reset,
      pristine,
      submitting,
      error,
      hasErrors,
      invalid,
    } = this.props;

    const info = [
      {
        id: "email",
        label: "E-Mail",
        type: "email",
        placeholder: userInfo.email,
        validate: [required, emailValidate],
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: userInfo.phone,
        validate: [required],
      },
      {
        id: "username",
        label: "Username",
        type: "text",
        placeholder: user.username,
        validate: [],
      },
      {
        id: "firstName",
        label: "First Name",
        type: "text",
        placeholder: userInfo.firstName,
        validate: [required, maxLength10, minLength2],
        warn: alphaNumeric,
      },
      {
        id: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: userInfo.lastName,
        validate: [required, maxLength25, minLength3],
        warn: alphaNumeric,
      },
      {
        id: "bDay",
        label: "Date of Birth",
        type: "date",
        placeholder: userInfo.bDay,
        validate: [required],
      },
      {
        id: "adress",
        label: "Address",
        type: "text",
        placeholder: userInfo.adress,
        validate: [required, maxLength(30)],
      },
      {
        id: "zip",
        label: "ZIP Code",
        type: "text",
        placeholder: userInfo.zip,
        validate: [required, minLength(6), maxLength(10)],
        warn: alphaNumeric,
      },
      {
        id: "country",
        label: "Country",
        type: "text",
        placeholder: userInfo.country,
        validate: [required],
        warn: alphaNumeric,
      },
    ];

    const submit = (values) => {
      let data = {
        Email: values.email,
        Phone: values.phone,
        FirstName: values.firstName,
        LastName: values.lastName,
        BDay: values.bDay,
        Adress: values.adress,
        Zip: values.zip,
      };
      this.props.updateUserInfoAction(data);
      this.props.updateShowInfoAction(values.showInfo);
      reset();
    };

    return (
      <div className="settings-info">
        <h3 className="settings-info-header">Account Information</h3>
        <form
          onSubmit={handleSubmit(submit)}
          className="settings-info-form settings-whitebox"
        >
          <div className="settings-info-form-text">
            {info.map((field, i) => (
              <Field
                key={i}
                component={infoField}
                info={field}
                name={field.id}
                validate={field.validate}
                warn={field.warn}
              />
            ))}
          </div>
          <div className="settings-info-form-check">
            <CheckField checked={userInfo.IsShowinfo} />
          </div>
          <div className="settings-info-form-button">
            <button
              type="submit"
              disabled={invalid || hasErrors || pristine || submitting}
            >
              {userInfo.isFetching || submitting
                ? "Wait..."
                : userInfo.error.type === "showinfo updated"
                ? "Done"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  user: store.user.user,
  userInfo: store.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfoAction: () => dispatch(getUserInfo()),
  updateUserInfoAction: (values) => dispatch(updateUserInfo(values)),
  updateShowInfoAction: (value) => dispatch(updateShowInfo(value)),
});

AccountInfo = connect(mapStateToProps, mapDispatchToProps)(AccountInfo);

AccountInfo = connect(
  (state) => ({
    initialValues: state.userInfo, // pull initial values from account reducer
  }),
  (dispatch) => ({
    getUserInfoAction: () => dispatch(getUserInfo()),
  }) // bind account loading action creator
)(AccountInfo);

export default reduxForm({
  form: "AccountInfo",
})(AccountInfo);

import React, { useEffect, useState } from "react";
import { getFormValues, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  getUserInfo,
  updateUserInfo,
  updateShowInfo,
} from "../../actions/UserInfo";
import { CountryDropdown } from "react-country-region-selector";
import SettingsBox from "../SettingsBox";
import CustomField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import Switch from "@material-ui/core/Switch";
import Button from "../Buttons";

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

const zipValidate = (value) =>
  value && !/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/.test(value)
    ? "Invalid ZIP"
    : undefined;

const orange = "#ed7102";
const grayText = "#838383";

const TextField = withStyles({
  root: {
    "& .MuiInput-underline": {
      color: grayText,
      "&:before": {
        borderBottom: "1px solid " + grayText,
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottomColor: orange,
      },
      "&>input:-webkit-autofill": {
        WebkitTextFillColor: grayText,
      },
    },
  },
})(CustomField);

function infoField(props) {
  const {
    input,
    classes,
    info: { id, label, type, placeholder },
    meta: { touched, error, warning },
  } = props;
  return (
    <ListItem alignItems="center">
      <ListItemText className={classes.label}>
        <Typography align="left" variant="subtitle1">
          {label}
        </Typography>
      </ListItemText>
      <ListItemText className={classes.input}>
        <TextField
          fullWidth
          inputProps={input}
          error={touched && error}
          type={type}
          placeholder={placeholder ? placeholder : "Please, fulfill this field"}
          id={id}
          disabled={id === "username"}
          helperText={error}
        />
      </ListItemText>
    </ListItem>
  );
}

function CountryField({
  input,
  info: { id, label, type, placeholder },
  meta: { touched, error, warning },
  classes,
  ...rest
}) {
  return (
    <ListItem alignItems="center" className={classes.select}>
      <ListItemText className={classes.label}>
        <Typography align="left" variant="subtitle1">
          {label}
        </Typography>
      </ListItemText>
      <CountryDropdown
        className={classes.select}
        defaultOptionLabel={placeholder ? placeholder : "Select Country"}
        blacklist={["CA", "US"]}
        {...rest}
        {...input}
      />
      {touched &&
        ((error && <p className="error">{error}</p>) ||
          (warning && <p className="error">{warning}</p>))}
    </ListItem>
  );
}

const useStyles = makeStyles((theme) => ({
  label: {
    color: "#123273",
    width: "30%",
  },
  input: {
    width: "70%",
  },
  form: {
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
      "& h6": {
        fontSize: "10px",
      },
      "& input": {
        fontSize: "10px",
      },
    },
  },
  select: {
    "& select": {
      width: "70%",
    },
  },
}));

function AccountInfo(props) {
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
  } = props;

  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    props.updateShowInfoAction(event.target.checked);
    props.getUserInfoAction();
    setShow(event.target.checked);
  };

  useEffect(() => {
    async function fetchData() {
      props.getUserInfoAction();
      setShow(userInfo.isShowInfo);
    }
    fetchData();
  }, [userInfo.isShowInfo]);

  const classes = useStyles();

  const info = [
    {
      component: infoField,
      id: "email",
      label: "E-Mail",
      type: "email",
      placeholder: userInfo.email,
      validate: [emailValidate],
    },
    {
      component: infoField,
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: userInfo.phone,
    },
    {
      component: infoField,
      id: "username",
      label: "Username",
      type: "text",
      placeholder: user.username,
    },
    {
      component: infoField,
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: userInfo.firstName,
      validate: [maxLength10, minLength2, alphaNumeric],
    },
    {
      component: infoField,
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: userInfo.lastName,
      validate: [maxLength25, minLength3, alphaNumeric],
    },
    {
      component: infoField,
      id: "bDay",
      label: "Date of Birth",
      type: "date",
      placeholder: userInfo.bDay,
    },
    {
      component: infoField,
      id: "adress",
      label: "Address",
      type: "text",
      placeholder: userInfo.adress,
      validate: [maxLength(30)],
    },
    {
      component: infoField,
      id: "zip",
      label: "ZIP Code",
      type: "text",
      placeholder: userInfo.zip.toString(),
      validate: [zipValidate, alphaNumeric],
    },
    {
      component: CountryField,
      id: "country",
      label: "Country",
      type: "text",
      placeholder: userInfo.country,
    },
  ];

  const submit = (values) => {
    let data = {
      Email: values.email
        ? values.email
        : info.find((element) => element.id === "email").placeholder,
      Phone: values.phone
        ? values.phone
        : info.find((element) => element.id === "phone").placeholder,
      FirstName: values.firstName
        ? values.firstName
        : info.find((element) => element.id === "firstName").placeholder,
      LastName: values.lastName
        ? values.lastName
        : info.find((element) => element.id === "lastName").placeholder,
      BDay: values.bDay
        ? values.bDay
        : info.find((element) => element.id === "bDay").placeholder,
      Adress: values.adress
        ? values.adress
        : info.find((element) => element.id === "adress").placeholder,
      Zip: values.zip
        ? values.zip
        : info.find((element) => element.id === "zip").placeholder.toString(),
      Country: values.country
        ? values.country
        : info.find((element) => element.id === "country").placeholder,
    };
    props.updateUserInfoAction(data);
    reset();
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

  return (
    <SettingsBox header="Account Information">
      <form onSubmit={handleSubmit(submit)} className={classes.form}>
        <List>
          {info.map((field, i) => (
            <Field
              key={i}
              component={field.component}
              info={field}
              name={field.id}
              validate={field.validate}
              classes={classes}
            />
          ))}
          <ListItem>
            <ListItemSecondaryAction>
              <Switch
                id="ShowInfo"
                checked={show}
                checked={show}
                onChange={handleChange}
              />
            </ListItemSecondaryAction>
            <ListItemText>
              <Typography
                className={classes.label_check}
                align="left"
                variant="subtitle1"
              >
                Show my information to Sponsor
              </Typography>
            </ListItemText>
          </ListItem>
          <Button
            type="submit"
            disabled={invalid || hasErrors || pristine || submitting}
          >
            {userInfo.isFetching || submitting
              ? "Wait..."
              : userInfo.error.type === "info updated"
              ? "Success"
              : "Save"}
          </Button>
        </List>
      </form>
    </SettingsBox>
  );
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

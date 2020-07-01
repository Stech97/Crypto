import React, { Component, Fragment } from "react";
import { getFormValues, reduxForm, Field } from "redux-form";

class AccountInfo extends Component {
  render() {
    const infoField = ({ input, info: { id, label, type, placeholder } }) => {
      return (
        <Fragment>
          <label htmlFor={id}>{label}</label>
          <input {...input} type={type} placeholder={placeholder} id={id} />
        </Fragment>
      );
    };

    const userinfo = [
      {
        id: "email",
        label: "E-Mail",
        type: "email",
        placeholder: "johnprice@hotmail.com",
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+41 6492 19319",
      },
      {
        id: "username",
        label: "Username",
        type: "text",
        placeholder: "Xayide",
      },
      {
        id: "firstname",
        label: "First Name",
        type: "text",
        placeholder: "John",
      },
      {
        id: "lastname",
        label: "Last Name",
        type: "text",
        placeholder: "Price",
      },
      {
        id: "birthdate",
        label: "Date of Birth",
        type: "date",
        placeholder: "16.12.1996",
      },
      {
        id: "address",
        label: "Address",
        type: "text",
        placeholder: "Hayu Road 12",
      },
      {
        id: "username",
        label: "ZIP Code",
        type: "text",
        placeholder: "80641",
      },
      {
        id: "country",
        label: "Country",
        type: "text",
        placeholder: "United Kingdom",
      },
    ];

    return (
      <div className="settings-info">
        <h3 className="settings-info-header">Account Information</h3>
        <form action="" className="settings-info-form settings-whitebox">
          <div className="settings-info-form-text">
            {userinfo.map((field, i) => (
              <Field
                key={i}
                component={infoField}
                info={field}
                name={field.id}
              />
            ))}
          </div>
          <div className="settings-info-form-checkbox">
            <label htmlFor="sponsor">
              <input id="sponsor" type="checkbox" />
              <span className="checkmark-sponsor">
                <i className="fas fa-check"></i>
              </span>
              <span>Show my Information to my Sponsor</span>
            </label>
          </div>
          <div className="settings-info-form-button">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "AccountInfo",
})(AccountInfo);

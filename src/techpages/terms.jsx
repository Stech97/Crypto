import React, { Component } from "react";

export default class TermsAndConditionsContent extends Component {
  render() {
    return (
      <div className="terms">
        {/* <div className="logo">
          <img
            className="stelth-logo"
            src="img/stelth-logo.png"
            alt="stelth-logo"
          />
        </div> */}

        <div className="wrapper">
          <div className="terms-box">
            <h2>Terms & Conditions</h2>
          </div>
          <div className="terms-box">
            <h5>Risk Notice</h5>
            <p>
              Bitcoin is a not backed or value guaranteed by any financial
              institution; when purchasing bitcoins the customer assumes all
              risk the bitcoins may become worthless in value. Customers should
              research and consider the risks before purchasing any bitcoins.
              The company makes absolutely no guarantee about the future value
              of the bitcoins purchased.
            </p>
          </div>
          <div className="terms-box">
            <h5>Sever ability</h5>
            <p>
              In the event any court shall declare any section or sections of
              this Agreement invalid or void, such declaration shall not
              invalidate the entire Agreement and all other paragraphs of the
              Agreement shall remain in full force and effect.
            </p>
          </div>
          <div className="terms-box">
            <h5>Customer input errors</h5>
            <p>
              It is the sole responsibility of the customer to check the
              accuracy of information entered and saved on the website. Account
              details displayed on the order summary web page will be the final
              transfer destination. In the case that this information is
              incorrect, and funds are transferred to an unintended destination,
              the company shall not reimburse the customer and shall not
              transfer additional funds. As such customers must ensure the
              Bitcoin address and bank information they enter is completely
              correct.
            </p>
          </div>
          <div className="terms-box">
            <h5>Binding Agreement</h5>
            <p>
              The terms and provisions of this Agreement are binding upon Your
              heirs, successors, assigns, and other representatives. This
              Agreement may be executed in counterparts, each of which shall be
              considered to be an original, but both of which constitute the
              same Agreement.
            </p>
          </div>
          <div className="terms-box">
            <h5>Choice of Law</h5>
            <p>
              This Agreement, and its application and interpretation, shall be
              governed exclusively by the laws of the Seychelles, without regard
              to its conflict of law rules. You consent to the exclusive
              jurisdiction of the federal and state courts located in or near
              Mahe, Seyshells for any dispute arising under this Agreement.
            </p>
          </div>
          <div className="terms-box">
            <h5>Security</h5>
            <p>
              We have implemented security measures designed to secure your
              information from accidental loss and from unauthorized access,
              use, alteration or disclosure. However, we cannot guarantee that
              unauthorized persons will never gain access to your information,
              and you acknowledge that you provide your information at your own
              risk, except as otherwise provided by applicable law.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

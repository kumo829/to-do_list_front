import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AccountVerified extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/login");
    }, 5000);
  }

  render() {
    return (
      <div>
        <h1>Account Verified</h1>
        <p>
          Your account has been verified. You'll be redirected to the login page
          in 5 seconds, or you can go now by clicking{" "}
          <Link to="/login">this link</Link>.
        </p>
      </div>
    );
  }
}

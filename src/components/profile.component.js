import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.access_token.substring(0, 20)} ...{" "}
          {currentUser.access_token.substr(currentUser.access_token.length - 20)}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
      </div>
    );
  }
}

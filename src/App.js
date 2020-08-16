import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";

import AuthService from "./services/auth.service";

import QuickView from "./components/todo_list/quickview.component";
import TODOListForm from "./components/todo_list/newlistform.component";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Verify from "./components/accountVerification.component.js";
import AccountVerified from "./components/accountVerified.component.js";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: false,
        showAdminBoard: false
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              TO-DO Lists
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>




          <div className="container mt-3">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/verify" component={Verify} />
              <Route exact path="/verified" component={AccountVerified} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/quickview" component={QuickView} />
              <Route exact path="/newlist" component={TODOListForm} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

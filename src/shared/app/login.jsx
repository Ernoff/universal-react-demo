import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./loginform.jsx";
import RedirectWithStatus from './redirect-w-status.jsx';
import { withAuth } from "@okta/okta-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./redux/actions/login-action";

class Login extends Component {
  static fetchData({ store }) {
    return store.getState(); //default
  }
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {

try {
  const authenticated = await this.props.auth.isAuthenticated();
  if (authenticated !== this.state.authenticated) {
    this.setState({ authenticated });
    }
} catch (e) {
  console.log(e)
  }
}

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ? (
      <RedirectWithStatus
        key={Math.random() + "REDIRECT_"}
        from={"/login"}
        to={"/user"}
        status={301}
      />
    ) : (
      <LoginForm />
    );
  }
};


function mapStateToProps(state) {
  return {
    ...state
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Login));

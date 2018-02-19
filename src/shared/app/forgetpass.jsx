import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./redux/actions/login-action";

class ForgetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: "",
      password: "",
      sessionToken: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleConfirmChange(e) {
    this.setState({ confirm: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { confirm, password } = this.state;
    let url = this.props.auth._config.baseUrl;
    if (confirm === password) {
      // this.props.register(firstName, lastName, email, password, url);
    }
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-element">
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="form-element">
          <label>Confirm Password:</label>
          <input
            type="password"
            id="password"
            value={this.state.confirm}
            onChange={this.handleConfirmChange}
          />
        </div>
        <input type="submit" id="submit" value="Register" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withAuth(ForgetPass)
);

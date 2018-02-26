import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./redux/actions/forgotpass-action";

class ForgetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm: "",
      error: null,
      sessionToken: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handleConfirmChange(e) {
    this.setState({ confirm: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password, confirm } = this.state;
    let url = this.props.auth._config.baseUrl;
    if (password === confirm) {
       this.props.forgot(email, url, password);
      console.log(true);
    }else{
      console.log('error: Password do not match')
    }
  }

  render() {
    // if (this.state.sessionToken) {
    //   this.props.auth.redirect({ sessionToken: this.state.sessionToken });
    //   return null;
    // }

    return (
      <div className="container">
        <div className="row">
          <div className="col align-self-center">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={this.state.confirm}
                  onChange={this.handleConfirmChange}
                />
              </div>
              <input
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                id="submit"
                value="Forgot Password"
              />
            </form>
          </div>
        </div>
      </div>
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

import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./redux/actions/login-action";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  static fetchData({ store }) {
    return store.getState(); //default
  }
  constructor(props) {
    super(props);

    this.state = {
      sessionToken: null,
      error: null,
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state;
    let url = this.props.auth._config.baseUrl;

    if (username && password) {
      this.props.login(username, password, url);
    }
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if(this.props.userAuth.sessionToken){
      try {
        this.props.auth.redirect({sessionToken: this.props.userAuth.sessionToken})
        return null
      } catch (e) {
      console.log(e)
      }
    }

    const errorMessage = this.state.error ? (
      <span className="error-message">{this.state.error}</span>
    ) : null;

    return (
      <div className="container">
      <div className="row">
        <div className="col align-self-center">
      <form onSubmit={this.handleSubmit}>
        {errorMessage}
        <div className="form-group">
          <label htmlFor='username'>Username:</label>
          <input
            className='form-control'
            id="username"
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor='password'>Password:</label>
          <input
          className='form-control'
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <input id="submit" type="submit" value="Submit" className='btn btn-primary'  />
      </form>
      <hr/>
      <p>If you have no account click below to register</p>
     <Link to="/regis"> <button type='button' className='btn btn-secondary btn-lg btn-block'>SignUp</button> </Link>                
      
      </div></div></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withAuth(LoginForm));

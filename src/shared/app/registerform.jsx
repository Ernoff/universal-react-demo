import React from 'react'; 
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RedirectWithStatus from "./redirect-w-status.jsx";
import * as actions from "./redux/actions/login-action";
import { Link } from "react-router-dom";

class RegisterForm extends React.Component {
  // static fetchData({ store }) {
  //   return store.getState(); //default
  // }
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      question: "",
      answer: "",
      sessionToken: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleQuestionChange(e) {
    this.setState({ question: e.target.value });
    // console.log(e.target.value)
  }
  handleAnswerChange(e) {
    this.setState({ answer: e.target.value });
    // console.log(e.target.value);
       
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, password, question, answer } = this.state;
    let url = this.props.auth._config.baseUrl;
    if (email && password) {
     await this.props.register(firstName, lastName, email, password, url, question, answer);
    // return <RedirectWithStatus key={Math.random() + "REDIRECT_"} from={"/regis"} to={"/login"} status={301} />;
      alert('registration successful')
  }
  }

  render() {
    if (this.props.userAuth.sessionToken) {
      try {
        this.props.auth.redirect({
          sessionToken: this.props.userAuth.sessionToken
        });
        console.log("yeah");
        return null;
      } catch (e) {
        console.log(e);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col align-self-center">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  className="form-control"
                  type="text"
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  className="form-control"
                  type="text"
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  className="form-control"
                  aria-describedby="passswordHelp"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
                <small id="passwordHelp">
                  **Password must contain an Uppercase, a lowercase and a
                  number. It should be up to 6 characters
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="question">Security Question:</label>
                <input
                  className="form-control"
                  type="text"
                  id="question"
                  value={this.state.question}
                  onChange={this.handleQuestionChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="answer">Security Answer:</label>
                <input
                  className="form-control"
                  type="text"
                  id="answer"
                  value={this.state.answer}
                  onChange={this.handleAnswerChange}
                />
              </div>
              <input
                type="submit"
                id="submit"
                value="Register"
                className="btn btn-primary"
              />
            </form>
            <hr />
            <hr />
            <p>If you have an account, click here to login</p>
            <Link to="/login">
              <button
                type="button"
                className="btn btn-secondary btn-lg btn-block"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(
  withAuth(RegisterForm)
);

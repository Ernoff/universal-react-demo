import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import * as actions from './redux/actions/user-actions'
import { withAuth } from "@okta/okta-react";

class User extends Component {
    static fetchData({ store }) {
        return store.dispatch(actions.getName());
    }
    constructor(props){
    super(props);
    this.state = { user: null };
     this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async getCurrentUser(){
      
    this.props.auth.getUser()
      .then(user => this.props.getName(user))
      .then(user => console.log(user))
    .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getCurrentUser();
  }
    render() {
        console.log(this.props)
        return <div>
            <Helmet>
              <meta charSet="utf-8" />
              <title>User</title>
            </Helmet>
            <div className="container">
              <div className="row">
                <div className="col align-self-center">
                  <strong>User page </strong>
                  <div>
                    Login in as
                    <p> name: {this.props.user.name} </p>
                    <p> email: {this.props.user.email}</p>
                  </div>
                  <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => this.props.auth.logout()}>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>;
    }
}
function mapStateToProps(state) {
    return {
        ...state,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuth(User));
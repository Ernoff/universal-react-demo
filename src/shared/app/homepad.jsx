import React, { Component } from "react";
import RedirectWithStatus from "./redirect-w-status.jsx";
import {withAuth} from '@okta/okta-react';
import LoginForm from './loginform.jsx';

class ImplicitCallback extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      authenticated: null,
      error: null
    };      
     this.handleAuth()
  }
  
  async handleAuth(){
     try {
       let tokens = await this.props.auth._oktaAuth.token.parseFromUrl();
       tokens = Array.isArray(tokens) ? tokens : [tokens];
       for (let token of tokens) {
         if (token.idToken) {
           this.props.auth._oktaAuth.tokenManager.add("idToken", token);
         } else if (token.accessToken) {
           this.props.auth._oktaAuth.tokenManager.add("accessToken", token);
         }
       }
       this.props.auth._history.push('/')
       console.log(this.props);
     } catch (e) {
       this.props.auth._history.push("/login");
     }
  }
  render() {
    console.log(this.props);
    if (this.state.authenticated === null) {
      return null;
    }

    const referrerKey = "secureRouterReferrerPath";
    const pathname = localStorage.getItem(referrerKey) || "/";
    localStorage.removeItem(referrerKey);

    return (
      <div>Hello from /ImplicitCallback</div>
    )
  }
};

export default (withAuth(ImplicitCallback));
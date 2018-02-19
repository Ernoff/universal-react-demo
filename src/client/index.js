import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../shared/app/redux/store';
import App from '../shared/app/app.jsx';


import { withAuth, Security } from "@okta/okta-react";

const config = {
  url: "https://dev-282338.oktapreview.com",
  issuer: "https://dev-282338.oktapreview.com/oauth2/default",
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: "0oae1wqpp7IB5pP7d0h7"
};


function onAuthRequired({history}){

    history.push('/login')
}
hydrate(
  <Provider store={store}>
    <Router>
      <Security
        issuer={config.issuer}
        client_id={config.client_id}
        redirect_uri={config.redirect_uri}
        baseUrl={config.url}
        onAuthRequired={onAuthRequired}
      >
        <App />
      </Security>
    </Router>
  </Provider>, document.getElementById("root"));

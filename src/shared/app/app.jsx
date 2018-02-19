import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RedirectWithStatus from './redirect-w-status.jsx';
import Navbar from './navbar.jsx';
import routeOptions from '../routes/routes';
import LoginForm from "./loginform.jsx";
import FourOFour from './404.jsx';
import { SecureRoute } from "@okta/okta-react";
import isAuthenticated from './redux/actions/login-action.js';


class App extends Component {
    render() {
       let proutes = routeOptions.proutes.map(({ path, component, exact }, i) =>
            <SecureRoute key={Math.random() + 'ROUTE_'} exact={exact} path={path} component={component}  />
        );
        
        let routes = routeOptions.routes.map(({ path, component, exact }, i) =>
            <Route key={Math.random() + 'ROUTE_'} exact={exact} path={path} component={component} />
        );
        let redirects = routeOptions.redirects.map(({ from, to, status }, i) =>
            <RedirectWithStatus key={Math.random() + 'REDIRECT_'} from={from} to={to} status={status} />
        );
        return <div>
        <Navbar />
        
        <Switch>
            {proutes}
            {routes}
            {redirects}
            </Switch>  
            
          </div>;
    }

}

    export default App
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Home</title>
                </Helmet>
                <div className="container">
                <div className="row">
                    <div className="col align-self-center">
                  <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => this.props.auth.logout()}> logout </button>               
           </div></div></div>
                </div>
        );
    }
}
export default Home;
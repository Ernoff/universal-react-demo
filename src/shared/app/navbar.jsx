import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from "@okta/okta-react";

class Home extends Component {
    render() {
        return (
            <nav className='nav nav-pills flex-column flex-sm-row'>
                    <span className='flex-sm-fill text-sm-center nav-link'><Link to='/'>Home</Link></span>
                    <span className='flex-sm-fill text-sm-center nav-link'><Link to='/user'>User</Link></span>
            </nav>
        );
    }
}
export default withAuth(Home);
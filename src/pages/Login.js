import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom';
import {Button} from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
            {/* <NavbarComponent /> */}

                <Button  variant="primary" onClick={this.props.handleLogin}>
                    Login With Github
                </Button >
            
            </div>
        );
    }
}
export default withRouter(Login);
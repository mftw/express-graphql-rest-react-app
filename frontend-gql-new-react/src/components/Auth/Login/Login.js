import React, { Component } from "react";
import AuthService from '../AuthService/AuthHelperMethods';
// import { withRouter } from 'react-router-dom';
import ShopContext from '../../context/shop-context';
import { Route } from 'react-router-dom';
/* We want to import our 'AuthHelperMethods' component in order to send a login request */

import { Link } from 'react-router-dom';
import './login.css'


class Login extends Component {

    /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginFailed: false,
        }
        this.AuthService = new AuthService();
    }

    static contextType = ShopContext;

    /* Fired off every time the use enters something into the input fields */
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = async (e) => {
        // const { username }
        e.preventDefault();

        try {
            // const login = await this.AuthService.login(this.state.email, this.state.password);
            const login = await this.context.logInUser(this.state.email, this.state.password);
            if(login && this.AuthService.loggedIn()){
                // this.context.updateGlobalUserInfo();
                this.props.history.replace('/products')
            } else {
                // console.log('røøøv')
                this.setState({
                    loginFailed: true,
                })
            }
        } catch (error) {
            console.log(error);
            this.setState({
                loginFailed: true,
            })
        }

        /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
    }

    componentWillMount() {
        if(this.AuthService.loggedIn()) {
            console.log('already logged in')
            this.props.history.replace('/products')
            // this.props.history.go('/products')
        }
        /* Here is a great place to redirect someone who is already logged in to the protected route */
    }

    render() {
        // console.log(this.props);
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Login</h1>
                        </div>
                        {this.state.loginFailed && <strong style={{color: 'red'}}>FAILED ATTEMPT</strong>}
                        <form className="box-form">
                            <input
                                className="form-item"
                                placeholder="Username"
                                name="email"
                                type="text"
                                onChange={this._handleChange}
                                autoFocus={true}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                            />
                            <button className="form-submit" onClick={this.handleFormSubmit}>Login</button>
                        </form>
                        <Link className="link" to="/signup">Don't have an account? <span className="link-signup">Signup</span></Link>
                    </div>
                    {/* <div className="signiture">
                        <h1>Template Built & Designed by Roman Chvalbo</h1>
                    </div> */}
                </div>
                
            </React.Fragment>
        );
    }

}
export const loginPortal = (args) => {
    
    console.log(args)
    
    const match = args.history.location.pathname || '';


    let prefix = 'login';
    if('/' + prefix === match) {
        console.log('/' + prefix === match)
        prefix = false;
    }
    if(!match.isExact) {
        prefix = false;
    }
    prefix = '/' + prefix;
    // let pathUrl = 
    return (
        <Route path={!!prefix ?  prefix : ':' + prefix} component={Login} />
    )
}

export default Login;

// export default withRouter(Login);

// export default withRouter(loginPortal);

// export default loginPortal(Login);
import React, {Component} from "react";
import AuthService from '../AuthService/AuthHelperMethods';
import './login.css'
// import axios from "axios";
import { Link } from 'react-router-dom';
import shopContext from "../../context/shop-context";

export default class Signup extends Component {
    
    static contextType = shopContext

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }

        this.AuthService = new AuthService();
    }

    _handleChange = (e) => {
        const {name, value} = e.target;
        // const stateprop = this.state[e.target.name];
        let val = value;
        console.log(val)
        if(name === 'username') {
            // val = val.toLowerCase();
            val = val.replace(' ', '')
            // if(val.length > 10) {
            // }
            val = val.substring(0, 10);
        }
        
        if(name === 'email') {
            val = val.replace(' ', '')
            val = val.substring(0, 30);
        }
        
        this.setState(
            {
                // [e.target.name]: e.target.value
                [e.target.name]: val
            }
        )

        // console.log(this.state);
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { password, email, username } = this.state;

        // const postSignup = {
        //     method: 'POST',
        //     // remember to JSON.stringify or else the server responds with 400
        //     body: JSON.stringify(this.state), 
        // }
        
        // const signup = await this.AuthService.signup(email, username, password);
        try {
            // const signup = await this.AuthService.signup('http://localhost:3500/user/signup', postSignup);
            const signup = await this.AuthService.signup(email, password, username);
            console.log(signup)
            if(signup) {
                let login = await this.AuthService.login(email, password);
                if(login) {
                    this.context.updateGlobalUserInfo();
                    this.props.history.replace('/products')
                }
            } else {
                // console.log('røøøv')
            }
        } catch (error) {
            console.log(error);
        }
    }   

    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Signup!</h1>
                        </div>
                        <form className="box-form">
                            <input
                                className="form-item"
                                placeholder="Username"
                                name="username"
                                type="text"
                                onChange={this._handleChange}
                                value={this.state.username}
                            />
                            <input
                                className="form-item"
                                placeholder="Email"
                                name="email"
                                type="email"
                                onChange={this._handleChange}
                                value={this.state.email}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                            />
                            <button className="form-submit" onClick={this.handleFormSubmit}>Signup</button>
                        </form>
                        <Link className="link" to="/login">Already have an account? <span className="link-signup">Login</span></Link>
                    </div>
                    <div className="signiture">
                        <h1>Template Built & Designed by Roman Chvalbo</h1>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }

}
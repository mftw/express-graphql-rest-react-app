import React, {Component} from "react";
import { Link } from 'react-router-dom';
import AuthService from '../AuthService/AuthHelperMethods';
import './login.css'
// import axios from "axios";
import shopContext from "../../context/shop-context";

export default class Signup extends Component {
    
    static contextType = shopContext

    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            email: "",
            errors: {
                username: "",
                password: "",
                email: "",
            }
        }

        this.AuthService = new AuthService();
    }

    _handleChange = (e) => {
        const {name, value} = e.target;
        // const stateprop = this.state[e.target.name];
        // eslint-disable-next-line
        // const atReg = /(?<!a)a{2,}(?!a)/;
        // const atReg = /^[^@]+-[^@]*$/;
        // const atReg = /^(?:(@)(?!\1{2})|[^@])+$/;
        // const atReg = /^[^@]+[^@]*$/;
        // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        const emailReg = /^[a-zA-Z0-9_.-@]*$/;
        const usernameReg = /^[a-zA-Z0-9]+$/;

        let val = value;

        if(name === 'username') {
            // val = val.toLowerCase();
            if(/\s/.test(val) && val.length !== 0) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: 'No empty space in username',
                        email: errors.email,
                        password: errors.password
                    }
                }))
                return;
            }

            if(!usernameReg.test(val) && val.length !== 0) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: 'Only characters a-z and numbers 0-9',
                        email: errors.email,
                        password: errors.password
                    }
                }))
                return;
            }

            if(val.length >= 11) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: 'Max 10 characters',
                        email: errors.email,
                        password: errors.password
                    }
                }))
                return;
            }
            
            this.setState(({errors}) => ({     
                errors: {
                    username: '',
                    email: errors.email,
                    password: errors.password
                }
            }))
        }
        
        if(name === 'email') {

            if(/\s/.test(val) && val.length !== 0) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: errors.username,
                        email: 'No spaces in email',
                        password: errors.password
                    }
                }))
                return;
            }

            if(!emailReg.test(val) && val.length !== 0) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: errors.username,
                        email: 'Character not valid in email',
                        password: errors.password
                    }
                }))
                return;
            }
            
            if(val[0] === '@') {
            // if(/@@/.test(val) && val.length !== 0) {
            // if(atReg.test(val) && val.length !== 0) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: errors.username,
                        email: 'emails cannot start with @',
                        password: errors.password
                    }
                }))
                return;
            }
            
            // if(/@@/.test(val) && val.length !== 0) {
            if(val.split('@').length > 2) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: errors.username,
                        email: 'Only one @ in email',
                        password: errors.password
                    }
                }))
                return;
            }

            if(val.length >= 41) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: errors.username,
                        email: 'Max 40 characters',
                        password: errors.password
                    }
                }))
                return;
            }
            
            if(/(\.\.)/g.test(val)) {
                this.setState(({errors}) => ({     
                    errors: {
                        username: errors.username,
                        email: 'Must be something before and after dot',
                        password: errors.password
                    }
                }))
                return;
            }

            this.setState(({errors}) => ({     
                errors: {
                    username: errors.username,
                    email: '',
                    password: errors.password
                }
            }))
        }
        
        this.setState(
            {
                // [e.target.name]: e.target.value
                [name]: val
            }
        )

        // console.log(this.state);
    }

    _validateFinal = form => {
        const usernameReg = /^[a-zA-Z0-9]+$/;
        // eslint-disable-next-line 
        const emailReg = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        // const emailReg = RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);

        if(!usernameReg.test(String(form.username.value).toLowerCase())) {
            this.setState(({errors}) => ({     
                errors: {
                    username: 'Username fail',
                    email: errors.email,
                    password: errors.password
                }
            }))
            return false;
        }

        if(!emailReg.test(String(form.email.value).toLowerCase())) {
            this.setState(({errors}) => ({     
                errors: {
                    username: errors.username,
                    email: 'Email fail',
                    password: errors.password
                }
            }))
            return false;
        }

        if(form.password.value.length < 8) {
            this.setState(({errors}) => ({     
                errors: {
                    username: errors.username,
                    email: errors.email,
                    password: 'Password must be at least 8 characters long.'
                }
            }))
            return false;
        }
        
        if(form.password.value !== form.passwordConfirm.value) {
            this.setState(({errors}) => ({     
                errors: {
                    username: errors.username,
                    email: errors.email,
                    password: `Passwords doesn't match`
                }
            }))
            return false;
        }
        this.setState({
            errors: {
                username: '',
                email: '',
                password: ''
            }
        })
        return true;
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        // console.log(e.target.form)
        if(!this._validateFinal(e.target.form)) {
            return;
        }

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
            if(await signup) {
                let login = await this.AuthService.login(email, password);
                if(await login) {
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

        const { username, email, password, errors, passwordConfirm } = this.state;
        

        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Signup!</h1>
                        </div>
                        <form className="box-form" ref={el => this.form = el}>
                            <label htmlFor="username">{!!errors.username && errors.username}</label>
                            <input
                                className="form-item"
                                placeholder="Username"
                                name="username"
                                type="text"
                                onChange={this._handleChange}
                                value={username}
                            />
                            <label htmlFor="email">{!!errors.email && errors.email}</label>
                            <input
                                className="form-item"
                                placeholder="Email"
                                name="email"
                                type="email"
                                onChange={this._handleChange}
                                value={email}
                            />
                            <label htmlFor="email">{!!errors.password && errors.password}</label>
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                                value={password}
                            />
                            <input
                                className="form-item"
                                placeholder="Confirm password"
                                name="passwordConfirm"
                                type="password"
                                onChange={this._handleChange}
                                value={passwordConfirm}
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
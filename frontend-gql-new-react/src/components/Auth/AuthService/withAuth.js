import React, { Component } from 'react';
import AuthHelperMethods from './AuthHelperMethods';
import { Redirect } from 'react-router-dom'
// import shopContext from '../../context/shop-context';

/* A higher order component is frequently written as a function that returns a class. */
class withAuth extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthHelperMethods();
        this.state = {
            loggedIn: this.Auth.loggedIn(),
            countDownOut: 2,
            redirect: null
        }
        this.countDown = null;
    }
    

    // const [confirm, setConfirm] = useState(false);
    // // const [loaded, setLoaded] = useState(false);
    // const [countDownOut, setCountDownOut] = useState(3)
    // const context = useContext(shopContext)
    componentDidMount() {
        if(!this.state.loggedIn) {
            this.countDown = setInterval(() => {
            
                // countDownOut -= 1;
                if(this.state.countDownOut <= 0) {
                    // this.props.history.replace('/login')
                    // props.history.go('/login')
                    // props.history.goBack()
                    this.setState({redirect: <Redirect to={'/login'} />})

                } else {
                    this.setState({countDownOut: this.state.countDownOut - 1})
                }
            }, 1000)
        }
    }
    componentWillUnmount() {
        clearInterval(this.countDown)
    }


    render() {
        const { loggedIn, countDownOut } = this.state;
        const confirm = loggedIn;
        return (
            <>
                {confirm ? this.props.children :
                    <div>No access for you my friend! Redirecting in {countDownOut + 1} seconds. 
                        {this.state.redirect}
                    </div>
                }
            </>
        )
    }
}

// export default withRouter(withAuth)


export default withAuth
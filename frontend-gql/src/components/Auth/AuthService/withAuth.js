import React, { useState, useEffect, useContext } from 'react';
import AuthHelperMethods from './AuthHelperMethods';
import { withRouter } from 'react-router-dom'
import shopContext from '../../context/shop-context';

/* A higher order component is frequently written as a function that returns a class. */
function withAuth(props) {
    
    const Auth = new AuthHelperMethods();

    const [confirm, setConfirm] = useState(false);
    // const [loaded, setLoaded] = useState(false);
    const [countDownOut, setCountDownOut] = useState(3)
    // const context = useContext(shopContext)

    let countDown = null;

    useEffect(() => {
        if (!Auth.loggedIn()) {
            // timeout = setTimeout(() => {
            //     props.history.replace('/login')
            // }, 3000)
            countDown = setInterval(() => {
                // countDownOut -= 1;
                if(countDownOut <= 0) {
                    props.history.replace('/login')
                    // props.history.go('/login')
                    // props.history.goBack()
                } else {
                    setCountDownOut(countDownOut - 1)
                }
            }, 1000)
            // console.log(timeout)
            
        } else {
            setConfirm(true)
        }
        // else {
        //     /* Try to get confirmation message from the Auth helper. */
        //     try {
                
        //         const confirm = Auth.getConfirm()
        //         setConfirm(confirm)
        //         console.log("confirmation is:", confirm);
        //         setLoaded(true);
        //     }
        //     /* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
        //     catch (err) {
        //         console.log(err);
        //         Auth.logout()
        //         props.history.replace('/login');
        //     }
        // }

        return () => {clearInterval(countDown)}

    })




    return (
        <>
            {/* {this.state.loaded ? <AuthComponent history={this.props.history} confirm={this.state.confirm} /> :
                <div>No access for you my friend</div>
            } */}
            {confirm ? props.children :
                <div>No access for you my friend! Redirecting in {countDownOut} seconds. </div>
            }
        </>
    )
}

export default withRouter(withAuth)
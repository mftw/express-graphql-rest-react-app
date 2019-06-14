import React from 'react';
// import  ComponentWithExtras from './components/Helpers/Helpers'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Router, Route, Switch, withRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
// import Lists from './components/Lists/Lists';
import Nav from './components/Nav/Nav';
// import ProductPresenter from './components/ProductPresenter/ProductPresenter';
// import SideMenu from './components/SideMenu/SideMenu';
// import ProductListPresenter from './components/ProductListPresenter/ProductListPresenter';
import ProductPresenter from './components/ProductPresenter/ProductPresenter';
import GlobalState from './components/context/GlobalState';
// import styled from 'styled-components';
import ShopContext from './components/context/shop-context';

import Product from './components/ProductPresenter/Product';

import Cart from './components/Cart/Cart';

import Login from './components/Auth/Login/Login';

import Signup from './components/Auth/Signup/Signup';

import Payment from './components/Payment/Payment';
import App from './App';

import './App.scss';

const history = createBrowserHistory();

// const Section = styled.section`
//     display: grid;
//     /* grid-template-columns: minmax(200px auto) auto; */
//     grid-template-columns: auto auto;
// `


function router(props) {
    // const context = useContext(ShopContext);
    // const { currentShownGroup, products, isLoading } = context;
    // const { products } = context;
    
    return (
        <Router history={ history }>
            <Switch>
                <App path={'/'}>
                    <Switch>
                        <Route path={`/login`} component={Login} />
                        <Route render={() => <div>not found</div>}  />
                    </Switch>
                </App>
            </Switch>
        </Router>
    );

}

export default router;
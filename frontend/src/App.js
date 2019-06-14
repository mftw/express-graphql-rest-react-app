import React from 'react';
// import  ComponentWithExtras from './components/Helpers/Helpers'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";
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

import './App.scss';

const history = createBrowserHistory();

// const Section = styled.section`
//     display: grid;
//     /* grid-template-columns: minmax(200px auto) auto; */
//     grid-template-columns: auto auto;
// `


export default function App(props) {
    // const context = useContext(ShopContext);
    // const { currentShownGroup, products, isLoading } = context;
    // const { products } = context;
    
    return (
        <GlobalState>
            <ShopContext.Consumer>
                {({products}) => {
                    // console.log(products)
                    return(
                        <Router history={ history }>
                            <Nav/>
                            <main className='routes'>
                            {/* <React.Suspense fallback={<em>Loading...</em>}> */}
                                <Switch>
                                    <Route 
                                    path={'/'}
                                    exact
                                    render={()=> <div>home</div>}
                                    />

                                    <Route
                                    path={'/products'}
                                    component={ProductPresenter}
                                    />
                                    
                                    {!!products && products.map((product, i) => {
                                        const {brand, title} = product;
                                        const url = (brand + '-' + title).replace(/\s+/g, '-')
                                        // const img = (product.image) ? product.image : false;
                                        return (
                                            <Route 
                                            key={'route'+i}
                                            // exact
                                            path={`/product/${url}`} 
                                            render={() => 
                                                <Product 
                                                {...product}
                                                product={product}
                                                />
                                            } 
                                            />
                                        )
                                    })}

                                    <Route
                                    path={'/cart'}
                                    component={Cart}
                                    />
                                    
                                    <Route
                                    path={'/login'}
                                    component={Login}
                                    />
                                    
                                    <Route
                                    path={'/signup'}
                                    // exact
                                    component={Signup}
                                    />
                                    
                                    <Route
                                    path={'/betaling'}
                                    component={Payment}
                                    // render={() => <WithAuth></WithAuth>}
                                    />

                                    <Route 
                                    render={() => <div>not found</div>}
                                    />


                                </Switch>
                            {/* </React.Suspense> */}
                            </main>
                        </Router>
                    )
                }}
            </ShopContext.Consumer>
        </GlobalState>
    );

}
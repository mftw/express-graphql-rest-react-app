import React, { useContext } from 'react';
// import  ComponentWithExtras from './components/Helpers/Helpers'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
// import Lists from './components/Lists/Lists';
import Nav from './components/Nav/Nav';
import SideMenu from './components/SideMenu/SideMenu';
// import ProductPresenter from './components/ProductPresenter/ProductPresenter';
import ProductListPresenter from './components/ProductListPresenter/ProductListPresenter';
import GlobalState from './components/context/GlobalState';
// import styled from 'styled-components';
import ShopContext from './components/context/shop-context';

import Product from './components/ProductPresenter/Product';

import Cart from './components/Cart/Cart';

import './App.scss';

const history = createBrowserHistory();

// const Section = styled.section`
//     display: grid;
//     /* grid-template-columns: minmax(200px auto) auto; */
//     grid-template-columns: auto auto;
// `


export default function App() {
    // const context = useContext(ShopContext);
    // const { products, sortProducts } = context;


    return (
        <GlobalState>
            <ShopContext.Consumer>
                {({products, sortProducts, currentShownGroup, getAllProducts}) => {
                    return(
                        <Router history={ history }>
                            <Nav/>
                            <main className='routes'>
                                <Route
                                path={'/products'}
                                // exact
                                render={() => {
                                    // sortProducts
                                    return (
                                        <section className={'product-list-container'}>
                                            <SideMenu/>
                                            <ProductListPresenter/>
                                        </section>
                                    )
                                }}
                                />
                                
                                {/* <ProductListPresenter products={products} currentShownGroup={currentShownGroup} /> */}
                                {/* <ProductPresenter products={products} /> */}
                                {products.map((product, i) => {
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
                            </main>
                        </Router>
                    )
                }}
            {/* <Context.co */}
            </ShopContext.Consumer>
        </GlobalState>
    );

}
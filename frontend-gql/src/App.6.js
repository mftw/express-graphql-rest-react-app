import React, { useContext } from 'react';
// import  ComponentWithExtras from './components/Helpers/Helpers'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
// import Lists from './components/Lists/Lists';
import Nav from './components/Nav/Nav';
import SideMenu from './components/SideMenu/SideMenu';
import ProductPresenter from './components/ProductPresenter/ProductPresenter';
import ProductListPresenter from './components/ProductListPresenter/ProductListPresenter';
import GlobalState from './components/context/GlobalState';
// import styled from 'styled-components';
import ShopContext from './components/context/shop-context';

import Product from './components/ProductPresenter/Product';

import './App.scss';

const history = createBrowserHistory();

// const Section = styled.section`
//     display: grid;
//     /* grid-template-columns: minmax(200px auto) auto; */
//     grid-template-columns: auto auto;
// `


export default function App() {
    const context = useContext(ShopContext);
    const { products, sortProducts, currentShownGroup } = context;


    return (
        <GlobalState>
            <Router history={ history }>
                {/* <Nav init={this.init} /> */}
                <Nav/>
                <main className='routes'>
                    <Route
                    path={'/products'}
                    // exact
                    render={() => {
                        return (
                            <section className={'product-list-container'}>
                            {/* // <section> */}
                                <SideMenu sortProducts={sortProducts}/>
                                <ProductListPresenter 
                                products={products} 
                                currentShownGroup={currentShownGroup} 
                                // fetching={fetching} 
                                />
                            </section>
                        )
                    }}
                    />
                    
                    {/* <ProductListPresenter products={products} currentShownGroup={currentShownGroup} /> */}
                    {/* <ProductPresenter products={products} /> */}
                    {products.map((product, i) => {
                        const {brand, title} = product;
                        const url = (brand + '_' + title).replace(/\s+/g, '_')
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
                </main>
            </Router>
        </GlobalState>
    );

}
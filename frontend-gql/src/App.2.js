import React from 'react';
import  ComponentWithExtras from './components/Helpers/Helpers'
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

import Product from './components/ProductPresenter/Product';

import './App.scss';

const history = createBrowserHistory();

// const Section = styled.section`
//     display: grid;
//     /* grid-template-columns: minmax(200px auto) auto; */
//     grid-template-columns: auto auto;
// `


export default class App extends ComponentWithExtras {
    constructor(props) {
        super(props);
        // this.state = {
        //     products: [],
        //     productGroups: [],
        //     currentShownGroup: 'all',
        //     // fetching: false,
        // }
    }

    // init = () => {
    //     this.fetchgroups('http://localhost:3500/products/', 'products');
    //     this.fetchgroups('http://localhost:3500/product-groups/', 'productGroups');
    //     this.setState({
    //         currentShownGroup: 'all'
    //     })
    // }

    // componentDidMount() {
    //     this.init();
    // }

    // sortProducts = (group, title) => {
    //     this.setState({
    //         lastProducts: this.state.products, 
    //         currentShownGroup: title,
    //         // fetching: true,
    //     })
    //     // console.log(group)
    //     this.fetchgroups('http://localhost:3500/products/getbygroup/' + group, 'products')
    // }


    render() {
        const { products, currentShownGroup } = this.state;
        // const productGroups = this.state.productGroups;
        // console.log(productGroups);

        return (
            <GlobalState>
                <Router history={ history }>
                    <Nav init={this.init} />
                    <main className='routes'>
                        <Route
                        path={'/products'}
                        // exact
                        render={() => {
                            return (
                                <section className={'product-list-container'}>
                                {/* // <section> */}
                                    <SideMenu sortProducts={this.sortProducts}/>
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
                {/* <Context.co */}
            </GlobalState>
        );
    }
}
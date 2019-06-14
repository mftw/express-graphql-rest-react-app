import React, { useState, useContext, useEffect } from 'react';
// import { Route } from "react-router-dom";
import SideMenu from '../SideMenu/SideMenu';
// import ProductListPresenter from './components/ProductListPresenter/ProductListPresenter';
import ProductListPresenter from '../ProductListPresenter/ProductListPresenter';

import shopContext from '../context/shop-context';

function ProductPresenter(props) {

    const context = useContext(shopContext);
    const { currentShownGroup, products, isLoading } = context;
    const [shownGroup, setshownGroup] = useState(currentShownGroup || '')
    const [loading, setloading] = useState((products.length === 0 || isLoading) ? true : false)

    useEffect(() => {
        if(isLoading) {
            // console.log('loading')
            // loading = true
            setloading(true)
        } else {
            setloading(false)
            // loading = false
            // console.log('done loading')
        }
        if(shownGroup !== currentShownGroup){
            setshownGroup(currentShownGroup)
        }
        for(const product of products) {
            if(product === null) {
                products.pop()
            }
        }
    }, [isLoading, shownGroup, currentShownGroup, products])


    // for(const product of products) {
    //     if(product === null) {
    //         products.pop()
    //     }
    // }
    // console.log(products)

    return (
        <section className={'product-list-container'}>
            <SideMenu/>
            {/* <ProductListPresenter data={{currentShownGroup, products, isLoading}}/> */}
            {/* {!loading &&
            } */}
            <ProductListPresenter data={{currentShownGroup, shownGroup, products, isLoading, loading}}/>
            
        </section>
    )
}

// export default withRouter(ProductPresenter);
export default ProductPresenter;
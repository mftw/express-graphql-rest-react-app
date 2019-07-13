import React, { Component, useContext, useEffect, useState } from 'react'
// import { Link } from "react-router-dom";
import { sortByKey } from '../Helpers/Helpers';
import ProductCard from '../ProductCard/ProductCard';
import TimeLineMax from 'gsap/TimelineMax';
import {TweenMax} from 'gsap';


import ShopContext from '../context/shop-context';

import './ProductListPresenter.scss';

export default function ProductListPresenter(props) {
    const { shownGroup, products, loading } = props.data;
    
    // const context = useContext(ShopContext)
    let productCards = [];
    const tl = new TimeLineMax({onComplete: console.log('sdf')});

    const [shownProducts, setShownProducts] = useState(products || [])
    console.log(shownProducts)

    // if(productCards.length > 0) {
    //     tl.staggerTo(productCards, 0.5, {
    //         // delay: 1,
    //         opacity: 1,
    //         y: 0,
    //     }, 0.1)
    // }

    const RenderProducts = () => {

        if(shownProducts) {
            return (                     
                shownProducts.map((product, i) => {
                    
                    return (
                        <div className="productcard-container" 
                        key={'product' + i + shownGroup}
                        ref={div => productCards[i] = div}
                        >
                            <ProductCard {...product} product={product} />
                        </div>
                    )
                })
            )
        } else return <div key={'nothing-div'}> Nothing here..11.</div>
    }

    TweenMax.staggerTo(productCards, 0.5, {
        // delay: 1,
        opacity: 1,
        y: 0,
        onComplete: console.log('sdf')
    }, 0.1)

    // useEffect(() => {
    //     let productCards = []
    //     setShownProducts(props.data.products);
    //     for(const product of shownProducts) {
    //         if(product === null)
    //         shownProducts.pop();
    //     }
    //     if(productCards.length > 0) {
        
    //         TweenMax.staggerTo(productCards, 0.5, {
    //             // delay: 1,
    //             opacity: 1,
    //             y: 0,
    //             onComplete: console.log('sdf')
    //         }, 0.1)
    //     }

    // }, [props.data.products])
    
    // const sortedProducts = shownProducts;

    // console.log(sortedProducts)
    
    

    console.log(productCards)
        
    return (
        <div>
            <h2>{shownGroup}</h2>
            <RenderProducts />
                {/* <div key={'pose-bitch' + shownGroup} className="productcard-presenter" >

                        {loading ? <div key={'nothing-div'}> Nothing here..11.</div> :
                     
                            sortedProducts.map((product, i) => {
                                
                                return (
                                    <div className="productcard-container" 
                                    key={'product' + i + shownGroup}
                                    ref={div => productCards[i] = div}
                                    >
                                        <ProductCard {...product} product={product} />
                                    </div>
                                )
                            })
                        }
                        
                    
                </div> */}
                        {/* <ProductToShow key={'pose-fuck'}/> */}
            {/* } */}
        </div>
    )
    
}
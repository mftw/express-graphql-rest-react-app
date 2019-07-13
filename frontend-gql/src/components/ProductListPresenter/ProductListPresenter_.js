import React, { Component, useContext } from 'react'
// import { Link } from "react-router-dom";
import { sortByKey } from '../Helpers/Helpers';
import ProductCard from '../ProductCard/ProductCard';
import TimeLineMax from 'gsap/TimelineMax';
import {TweenMax} from 'gsap';


import ShopContext from '../context/shop-context';

import './ProductListPresenter.scss';

export default function ProductListPresenter(props) {
    const { shownGroup, products, loading  } = props.data;
    
    const context = useContext(ShopContext)
    const productCards = products;
    const tl = new TimeLineMax();

    if(productCards.length > 0) {
        tl.staggerTo(productCards, 0.5, {
            // delay: 1,
            opacity: 1,
            y: 0,
        }, 0.1)
    }


    const sortedProducts = products;
 
        
    return (
        <div>
            <h2>{shownGroup}</h2>
                <div key={'pose-bitch' + shownGroup} className="productcard-presenter" >

                        {loading ? <div key={'nothing-div'}> Nothing here...</div> :
                     
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
                        
                    
                        {/* <ProductToShow key={'pose-fuck'}/> */}
                </div>
            {/* } */}
        </div>
    )
    
}
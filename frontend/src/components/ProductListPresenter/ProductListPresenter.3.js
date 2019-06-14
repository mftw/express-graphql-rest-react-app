import React, { Component } from 'react'
// import { Link } from "react-router-dom";
import { sortByKey } from '../Helpers/Helpers';
import ProductCard from '../ProductCard/ProductCard';
import TimeLineMax from 'gsap/TimelineMax';
import {TweenMax} from 'gsap';


import ShopContext from '../context/shop-context';

import './ProductListPresenter.scss';

export default class ProductListPresenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // products: [],
            // products: this.props.products || [],
            // fetching: false,
        }
        this.productCards = [];
        this.tl = new TimeLineMax();
    }

    static contextType = ShopContext;

    // componentWillReceiveProps(props) {
    //     this.setState({
    //         ...props,
    //     })
    // }
    componentWillReceiveProps(newProps) {
        // console.log(obj)
        this.setState({
            // products: newProps.products
            ...newProps
        })
    }

    fireAnimation = () => {
        // TweenMax.to('.h2', 2, {x: 1000} );
        
        // if(this.productCards.length > 0) {
        //     console.log('we made it')
        // }
        // this.tl.staggerTo([this.productCards[0], this.productCards[1], this.productCards[2]], 0.5, {
        // this.tl.staggerTo(this.productCards, 0.5, {
        //     delay: 1,
        //     opacity: 1,
        //     y: 0,
        // }, 0.1)
        this.tl.play();
    }

    componentDidMount() {
        // this.tl = new TimeLineMax({
        //     onComplete: console.log('123')
        // });
        // console.log('we made it')
        // this.tl.staggerTo([this.productCards[0], this.productCards[1], this.productCards[2]], 0.5, {
        //     delay: 1,
        //     opacity: 1,
        //     y: 0,
        // }, 0.1)
        // if(this.productCards.length > 0) {
        // }
        this.tl.staggerTo(this.productCards, 0.5, {
            // delay: 1,
            opacity: 1,
            y: 0,
        }, 0.1)
        // setTimeout(() => {
        // }, 1000)
    }

    render() {
        // const { products } = this.state;
        // const { isLoading } = this.context;
        const { shownGroup, products, loading  } = this.props.data;
        // const sortedProducts = sortByKey(products, 'brand');
        // const sortedProducts = [...products];
        const sortedProducts = products;
        // const ProductToShow = this.getProducts();
        // console.log(this.productCards)
        
        return (
            <div style={{minHeight: '95vh', }}>
                {/* <button onClick={() => this.fireAnimation()} >play</button> */}
                <h2>{shownGroup}</h2>
                {/* {isLoading ? <div> loading </div> :  */}
                    <div key={'pose-bitch' + shownGroup} className="productcard-presenter" >

                            {/* {(loading || sortedProducts.length === 0) ? <div key={'nothing-div'}> Nothing here...</div> : */}
                            {loading ? <div key={'nothing-div'}> Nothing here...</div> :
                                // sortedProducts.map((product, i) => {
                                    //     // return <Product {...product} product={product} key={'product' + i} />
                                //     return <Product {...product} product={product} key={'product' + i} />
                                    
                                // })
                                sortedProducts.map((product, i) => {
                                    // return <Product {...product} product={product} key={'product' + i} />
                                    // return <ProductCard {...product} product={product} key={'product' + i} />
                                    return (
                                        <div className="productcard-container" 
                                        key={'product' + i + shownGroup}
                                        ref={div => this.productCards[i] = div}
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
}
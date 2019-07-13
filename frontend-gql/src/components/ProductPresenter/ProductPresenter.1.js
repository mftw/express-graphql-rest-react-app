import React, { Component, useContext } from 'react';
import { Route } from "react-router-dom";
// import ProductListPresenter from '../ProductListPresenter/ProductListPresenter';

import shopContext from '../context/shop-context';



function Product({brand, title, description_long, image, product}) {
    const context = useContext(shopContext);
    const rootImgUrl = context.rootProductImgUrl;

    return ( 
        <div>
            <h3>{brand + ' ' + title}</h3>
            <article dangerouslySetInnerHTML={{ __html: description_long }}/>
            {(image) ? <img src={rootImgUrl + image} alt={title} /> : null}
            {/* <button onClick={context.addProductToCart.bind(this, product)}>KØB!!!</button> */}
            <button onClick={() => context.addProductToCart(product)}>KØB!!!</button>
        </div>
    )
}

class ProductPresenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // products: [],
            products: this.props.products,
        }
        // console.log(this.props.products)
    }

    static contextType = shopContext;

    componentWillReceiveProps(newProps) {
        // console.log(obj)
        this.setState({
            // products: newProps.products
            ...newProps
        })
    }

    render() {
        const { products } = this.state;

        return (
            <div>
                {/* {this.context.test} */}
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
            </div>
        )
    }
}

// export default withRouter(ProductPresenter);
export default ProductPresenter;
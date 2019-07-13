import React, { useContext } from 'react'
import shopContext from '../context/shop-context';


function Product({brand, title, description_long, image, product}) {
    const context = useContext(shopContext);
    const rootImgUrl = context.rootProductImgUrl;
    return ( 
        <div>
            <h3>{brand + ' ' + title}</h3>
            <article dangerouslySetInnerHTML={{ __html: description_long }}/>
            {image ? <img src={rootImgUrl + image} alt={title} /> : null}
            {/* <button onClick={context.addProductToCart.bind(this, product)}>KØB!!!</button> */}
            <button onClick={() => context.addProductToCart(product)}>KØB!!!</button>
        </div>
    )
}

export default Product;
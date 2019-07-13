import React, { useContext, useState, useEffect } from 'react'
import shopContext from '../context/shop-context';



function Product({brand, title, description_long, image, product, productId}) {
    const context = useContext(shopContext);
    const rootImgUrl = context.rootProductImgUrl;
    const [remoteData, setRemoteData] = useState({init: true});

    const apiQuery = {
        query: `
            query {
                singleProduct(productId: "${''+productId}") {
                    description_long
                }
            }
        `
    }
    
    useEffect(() => {
        async function getStuffAsync() {
            // console.log("TCL: description", description)
            // setRemoteData(apiCall)
            // return apiCall;
            
            if(remoteData.init) {
                const apiCall = await context.fetchFromApi(apiQuery)
                // const apiCall = getStuffAsync();
                setRemoteData(apiCall.singleProduct)
            }
            console.log(remoteData)
        }
        getStuffAsync()
    }, [apiQuery ,setRemoteData, context, remoteData])

    // getStuffAsync();
    
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
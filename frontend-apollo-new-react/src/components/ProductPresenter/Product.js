import React, { useContext, useState, useEffect } from 'react'
import shopContext from '../context/shop-context';
import { danishCurrency } from '../Helpers/Helpers';



function Product({brand, title, image, product, productId, price}) {
	console.log("TCL: Product -> product", product)
    
    const context = useContext(shopContext);
    const rootImgUrl = context.rootProductImgUrl;
    const [remoteData, setRemoteData] = useState({init: true});

    const apiQuery = {
        query: `
            query {
                singleProduct(productId: "${''+product.id}") {
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
                try {
                    const apiCall = await context.fetchFromApi(apiQuery)
					console.log("TCL: getStuffAsync -> apiCall", apiCall)
                    // const apiCall = getStuffAsync();
                    setRemoteData(apiCall.singleProduct)

                } catch(error) {
                    console.log(error)
                }
            }
            // console.log(remoteData)
        }
        getStuffAsync()
    }, [apiQuery ,setRemoteData, context, remoteData])
    
    return ( 
        <div>
            <h3>{brand + ' ' + title}</h3>
            {!!remoteData.description_long && <article dangerouslySetInnerHTML={{ __html: remoteData.description_long }}/>}
            {image ? <img src={rootImgUrl + image} alt={title} /> : null}
            {/* <button onClick={context.addProductToCart.bind(this, product)}>KØB!!!</button> */}
            <span>{ danishCurrency(price) }</span>
            <button onClick={() => context.addProductToCart(product)}>KØB!!!</button>
        </div>
    )
}

export default Product;
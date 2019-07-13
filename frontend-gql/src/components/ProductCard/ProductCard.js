import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import ShopContext from '../context/shop-context'; 
import posed from 'react-pose';
// import './ProductCard.scss';

const bgColor = '#eef2f2';

const Figure = styled.figure`
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    /* padding: 0; */
    margin: 0;
    /* margin: 1rem; */

    img {
        position: absolute;
        object-fit: cover;
        object-position: 0% 50%;
        top: 0;
        left: 0;
        width: 100%;
        min-width: 100%;
        min-height: 100%;
        padding: 0;
        display: block;
    }
`
// const PosedDiv = posed.div(
//     {
//     enter: { 
//         // type: 'spring',
        
//         x: '0%',
//         opacity: 1,
//         transition: {
//             x: {
//                 type: 'spring',
//                 stiffness: 500,
//                 damping: 35
//             },
//         }
//     },
//     exit: { 
//         // type: 'spring',
//         x: '100%',
//         opacity: 0 
//     }
// }
// )

// const Div = styled(PosedDiv)`
//     width: 100%;
//     overflow: hidden;
//     background: ${bgColor};
//     /* border-radius: 0.5rem; */
//     padding: 1rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
// `

const Div = styled.div`
    width: 100%;
    overflow: hidden;
    background: ${bgColor};
    /* border-radius: 0.5rem; */
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
// const Div = PosedDiv;
// const Div = styled.div`
//     width: 100%;
//     overflow: hidden;
//     background: ${bgColor};
//     /* border-radius: 0.5rem; */
//     padding: 1rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
// `


const posedP = posed.p({
    open: {
        height: 'auto'
    },

    closed: {
        height: '2rem',
    }
})

const P = styled(posedP)`
    overflow: hidden;
    position: relative;
    z-index: 10;
    font-size: 0.9rem;
    /* justify-self: flex-end; */


    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1rem;
        left: 0;
        bottom: 0;
        z-index: 11;
        /* background: rgba(0,0,0,0.5); */
        /* background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgb(242,242,242)) */
        background-image: ${({open}) => 
            !open ? `linear-gradient(to right, transparent, ${bgColor})` : 'inherit'
        }
    } 

`

export default function ProductCard(props) {
    const { brand, title, product, price, image } = props;
    const context = useContext(ShopContext);
    const [open, setOpen] = useState(false);
    const url = (brand + '-' + title).replace(/\s+/g, '-')
    const rootImgUrl = context.rootProductImgUrl;

    const img = props.image || '';
    const imgUrl = rootImgUrl + image;

    const description = props.description_short;
    
    // const formattedPrice = new Intl.NumberFormat('da-DK').format(price / 100);
    const formattedPrice = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKR' }).format(price / 100);
    
    // const formattedPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
    function openDesc() {
        setOpen(!open)
    }

    function addProductToCart() {
        context.addProductToCart(product)
    }


    return (
        <Div className={'product-card'}>
            <div>
                <Link to={`/product/${url}`}>
                    <Figure>
                        <img src={imgUrl} alt={brand + ' ' + title} />
                    </Figure>
                </Link>
                <Link to={`/product/${url}`}>{brand + ' ' + title}</Link>
            </div>
            {/* <div className={'price-buy'}> */}
            <div>
                <P 
                onClick={openDesc}
                pose={ open ? 'open' : 'closed'}
                open={open}
                >
                    {description}
                </P>
                <span>{'Pris: ' + formattedPrice}</span> <br/>
                <button onClick={addProductToCart}>Køb</button>
            </div>
        </Div>
    )
}


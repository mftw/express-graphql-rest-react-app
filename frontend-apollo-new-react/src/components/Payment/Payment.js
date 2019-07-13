import React, { useContext, useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import WithAuth from '../Auth/AuthService/withAuth';
import ShopContext from '../context/shop-context';
import { danishCurrency, quantityText } from '../Helpers/Helpers';

function isPathEndLogin(history) {
    const path = history.location.pathname
    const pathArr = path.split('/')
    console.log(pathArr)
    if(pathArr[pathArr.length - 1] === pathArr[pathArr.length -2]) {
        return false
    }
    
    return (pathArr[pathArr.length - 1] === 'login') ? true : false;
}

export default function Payment(props) {
    const context = useContext(ShopContext);
    let totalPrice = 0;
    let totalQuantity = 0;
    const [completeOrder, setCompleteOrder] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [cart, setCart] = useState([]);
    // console.log(props.match);

    // const Auth = new AuthService();

    useEffect(() => {
      return () => {
        if(!!context.userInfo.userId) {
            setAuthStatus(context.userInfo)
        }
        if(!context.userInfo.userId) {
            // console.log(context)
            setShouldRedirect(true)
        }
        setCart(context.cart)
      };
    }, [context, authStatus, shouldRedirect])

    if(cart !== context.cart) {
        setCart(context.cart)
    }

    const sendOrder = async () => {
        // console.log(Auth.getConfirm().userId)
        // const userId = Auth.getConfirm().userId
        // const userId = context.getUserInfo().userId
        const userId = context.userInfo.userId;
        if(!userId) {
            console.log('not logged in')
            return;
        }
        const { fetchFromApi, cart } = context;

        const moddedCart = [...cart].map(({title, brand, quantity, id}) => {
            return {
                id,
                // title,
                // brand,
                quantity
            }
        })

        const request = {
            query: `
                mutation CreateOrder($userId: ID!, $products: [OrderProductInput!]!) {
                    createOrder(orderInput: {userId: $userId, products: $products }) {
                        id
                        quantity
                        date
                        products {
                            id
                            quantity
                            product {
                                id
                                title
                                brand
                            }
                        }
                    }
                }
            `,
            variables: {
                userId,
                products: [...moddedCart]
            }
        }
        try {
            const orderRequest = await fetchFromApi(request)
            console.log(orderRequest)
            setCompleteOrder(orderRequest.createOrder);
        } catch (error) {
            setCompleteOrder(error);
            // this.setState({completeOrder: error})
            console.log(error)
        }
    }
    // console.log(shouldRedirect);

    return (
        <WithAuth>
            <section className="cart">
                {((context.userInfo === false) && (isPathEndLogin(props.history) === false)) ? <Redirect to={props.history.location.pathname + '/login'}/> : <></>}
                {/* <RedirectIfExp authData={authStatus} /> */}
                <h2>Betal</h2>
                {context.cart.length <= 0 && <p>No Item in the Cart!</p>}
                <ul>
                {context.cart && [...context.cart].map(({ brand, title, quantity, id, price }) => {
                    const url = (brand + '-' + title).replace(/\s+/g, '-')
                    totalPrice += price * quantity;
                    totalQuantity += quantity;
                    

                    return (
                        <li key={id}>
                            <div>
                            <Link to={'/product/' + url}><strong>{brand + ' ' + title}</strong></Link>  - { danishCurrency(price) } (
                            {quantityText(quantity)})
                            </div>
                            <div>
                            <button
                            onClick={context.removeProductFromCart.bind(this, id)}
                            >
                                Remove from Cart
                            </button>
                            </div>
                        </li>
                    )
                })}
                    {!!totalQuantity && 
                        <li>
                            <div>
                            <strong>I alt </strong> - {danishCurrency(totalPrice)} (
                            {/* {totalQuantity + (totalQuantity > 1 ? ' stks' : ' stk')}) */}

                            {quantityText(totalQuantity)})
                            </div>
                            <div>
                                <button onClick={sendOrder}>
                                    Betal
                                </button>
                            </div>
                        </li>
                    }
                </ul>
                {!!completeOrder && <div>YAY!!! order added: {Date(completeOrder.date).toString()}</div>}
                {!completeOrder && <div>NAY!!!</div>}
            </section>
        </WithAuth>
    )
    
}
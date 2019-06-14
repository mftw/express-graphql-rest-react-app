import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import WithAuth from '../Auth/AuthService/withAuth';
import ShopContext from '../context/shop-context';
import { danishCurrency } from '../Helpers/Helpers';
import AuthService from '../Auth/AuthService/AuthHelperMethods';


export default function Payment() {
    const context = useContext(ShopContext);
    const [completeOrder, setCompleteOrder] = useState(null);
    let totalPrice = 0;
    let totalQuantity = 0;
    const Auth = new AuthService();

    function quantityText(quantity) {
        return quantity + (quantity > 1 ? ' stks' : ' stk')
    }

    const sendOrder = async () => {
        // console.log(Auth.getConfirm().userId)
        const userId = Auth.getConfirm().userId
        if(!userId) {
            console.log('not logged in')
            return;
        }
        const { fetchFromApi, cart } = context;

        const moddedCart = [...cart].map(({title, brand, quantity, id}) => {
            return {
                id,
                title,
                brand,
                quantity
            }
        })

        const request = {
            query: `
                mutation CreateOrder($userId: ID!, $products: [OrderProductInput!]!) {
                    createOrder(orderInput: {userId: $userId, products: $products }) {
                        id
                        quantity
                        products {
                            title
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
            setCompleteOrder(orderRequest.createOrder)
        } catch (error) {
            console.log(error)
        }
        console.log(completeOrder);
    }
    // console.log(context.cart)
    return (
        <WithAuth>
        <section className="cart">
            {context.cart.length <= 0 && <p>No Item in the Cart!</p>}
            <ul>
            {context.cart.map(({ brand, title, quantity, id, price }) => {
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
                            onClick={context.removeProductFromCart.bind(
                            this,
                            id
                            )}
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
            {completeOrder && <div></div>}
        </section>
        </WithAuth>
    )
}
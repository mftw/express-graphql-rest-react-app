import React, { useContext } from 'react';

import ShopContext from '../context/shop-context';
import { danishCurrency } from '../Helpers/Helpers';
import './Cart.scss';
import { Link } from 'react-router-dom';

function CartPage(props) {
    const context = useContext(ShopContext);
    let totalPrice = 0;
    let totalQuantity = 0;

    function quantityText(quantity) {
        return quantity + (quantity > 1 ? ' stks' : ' stk')
    }

    

    return (
        // <React.Fragment>
        <section className="cart">
            <h2>Betal</h2>
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
                            <button>
                                Betal
                            </button>
                        </div>
                    </li>
                }
            </ul>
        </section>
        // </React.Fragment>
    );
}

export default CartPage;

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import WithAuth from '../Auth/AuthService/withAuth';
import ShopContext from '../context/shop-context';
import { danishCurrency } from '../Helpers/Helpers';
import AuthService from '../Auth/AuthService/AuthHelperMethods';



export default class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            completeOrder: false,
            totalPrice: 0,
            totalQuantity: 0,
            renderedList: [],
        }
    }

    static contextType = ShopContext;

    Auth = new AuthService();

    quantityText = (quantity) => {
        return quantity + (quantity > 1 ? ' stks' : ' stk')
    }

    sendOrder = async () => {
        // console.log(Auth.getConfirm().userId)
        const userId = this.Auth.getConfirm().userId
        if(!userId) {
            console.log('not logged in')
            return;
        }
        const { fetchFromApi, cart } = this.context;

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
                        date
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
            // console.log(orderRequest)
            this.setState({completeOrder: orderRequest.createOrder})
        } catch (error) {
            this.setState({completeOrder: error})
            console.log(error)
        }
        // console.log(this.state.completeOrder);
    }

    renderList = () => {
        const cart = [...this.context.cart]
        // const cart = [...data]
        let totalPrice = 0;
        let totalQuantity = 0

        const returnArr = cart.map(({ brand, title, quantity, id, price }) => {
            totalQuantity += quantity
            totalPrice += price * quantity
            const url = (brand + '-' + title).replace(/\s+/g, '-')

            return (
                <li key={id}>
                    <div>
                    <Link to={'/product/' + url}><strong>{brand + ' ' + title}</strong></Link>  - { danishCurrency(price) } (
                    {this.quantityText(quantity)})
                    </div>
                    <div>
                    <button
                        onClick={this.context.removeProductFromCart.bind(
                        this,
                        id
                        )}
                    >
                        Remove from Cart
                    </button>
                    </div>
                </li>
            )
        })
        if(this.state.totalQuantity !== totalQuantity || this.state.totalPrice !== totalPrice) {
            this.setState({
                totalPrice: totalPrice,
                totalQuantity: totalQuantity,
                renderedList: returnArr
            })
        }
        return returnArr
    }

    componentDidMount() {
        this.setState({
            totalPrice: 0,
            totalQuantity: 0,
        })
        // this.RenderList()
    }


    render() {
        const cart = [...this.context.cart];
        this.renderList()
        return (
            <WithAuth>
            <section className="cart">
                {cart.length <= 0 && <p>No Item in the Cart!</p>}
                <ul>

                    {this.state.renderedList}
                    {/* <this.RenderList data={cart} /> */}
                    {!!this.state.totalQuantity && 
                        <li>
                            <div>
                            <strong>I alt </strong> - {danishCurrency(this.state.totalPrice)} (

                            {this.quantityText(this.state.totalQuantity)})
                            </div>
                            <div>
                                <button onClick={this.sendOrder}>
                                    Betal
                                </button>
                            </div>
                        </li>
                    }
                </ul>
                {!!this.state.completeOrder && <div>YAY!!! order added: {Date(this.state.completeOrder.date).toString()}</div>}
                {!this.state.completeOrder && <div>NAY!!!</div>}
            </section>
            </WithAuth>
        )
    }
}
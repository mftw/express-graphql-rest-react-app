import React, { Component } from 'react';
// import { connect } from 'react-redux';

import ShopContext from '../context/shop-context';
// import MainNavigation from '../components/MainNavigation';
// import { removeProductFromCart } from '../store/actions';
import { danishCurrency } from '../Helpers/Helpers';
import './Cart.css';
import { Link } from 'react-router-dom';

class CartPage extends Component {
  static contextType = ShopContext;

  constructor(props) {
      super(props);
      this.state = {
        totalPrice: 0,
        totalQuantity: 0,
      }
      this.totalPrice = 0;
      this.totalQuantity = 0;
  }

  componentDidMount() {
    // console.log(this.context);
  }

  render() {
    return (
      <React.Fragment>
        {/* <MainNavigation
          cartItemNumber={this.context.cart.reduce((count, curItem) => {
            return count + curItem.quantity;
          }, 0)}
        /> */}
        <main className="cart">
          {this.context.cart.length <= 0 && <p>No Item in the Cart!</p>}
          <ul>
            {this.context.cart.map(cartItem => {
                const {brand, title, quantity, id, price} = cartItem;
                const url = (brand + '-' + title).replace(/\s+/g, '-')
                this.totalPrice += price * quantity;
                this.totalQuantity += quantity;
                

                return (

                    <li key={cartItem.id}>
                        <div>
                        <Link to={'/product/' + url}><strong>{brand + ' ' + title}</strong></Link>  - { danishCurrency(price) } (
                        {quantity})
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
            })}
                {!!this.totalQuantity && 
                    <li>
                        <div>
                        <strong>I alt </strong> - {danishCurrency(this.totalPrice)} (
                        {this.totalQuantity})
                        </div>
                        <div>
                        
                        </div>
                    </li>
                }
          </ul>
        </main>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     cartItems: state.cart,
//     cartItemCount: state.cart.reduce((count, curItem) => {
//       return count + curItem.quantity;
//     }, 0)
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     removeProductFromCart: id => dispatch(removeProductFromCart(id))
//   };
// };

export default CartPage;

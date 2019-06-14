import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import ShopContext from '../context/shop-context';
import { danishCurrency } from '../Helpers/Helpers';

const NavStyled = styled.nav`
    z-index: 900;
    position: fixed;
    display: flex;
    flex-direction: row;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    background: black;
    color: white;
    height: calc(1rem + 1vh);

    ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            margin: 0 1rem;
        }
    }
    .active {
        color: red;
    }
`



export default function Nav(props) {
    const context = useContext(ShopContext);
    // const [userInfo, setUserInfo] = useState('')
    // const userInfo = context.getUserInfo();
    let price = 0;
    let count = 0;

    // useEffect(() => {
    //     setUserInfo(context.userInfo)
    // }, [])

    context.cart.map(product => {
        // price += ( product.price / 100 ) * product.quantity;
        price += product.price * product.quantity;
        count += product.quantity;
        return product;
    })

    const username = context.userInfo.username;
    
    return (
        <NavStyled>
            <ul>
                <li>
                    <NavLink to='/' exact >Home</NavLink>
                </li>
                <li>
                    <NavLink to='/products'>Products</NavLink>
                </li>
                <li>
                    <NavLink to='/cart'>Cart</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink to='/signup'>Signup</NavLink>
                </li>
                <li>
                    <NavLink to='/betaling'>Payment</NavLink>
                </li>
                <li>
                    {/* {context.cart.length} */}
                    {count}
                </li>
                {/* <li>
                    <button onClick={context.logOutUser}>userinfo</button>
                </li> */}
                
                {!!username && 
                <li>
                    <div>
                        {'Hello ' + username + '! nice to see you'} <button onClick={context.logOutUser}>Log out</button>
                    </div>
                </li>
                }
            
                {!!price && 
                <li>
                    {danishCurrency(price)}
                </li>
                }
            </ul>
        </NavStyled>
    )
}
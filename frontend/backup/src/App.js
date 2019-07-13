import React, { useState, useEffect } from 'react';
import './App.scss';

// class App extends Component {
//   render() {
//     return (
//       'my app'
//     );
//   }
// }

function App(props) {
    const [products, setProducts] = useState([]);

    async function fetchUsers() {
        let returnArray = [];
        try {
            const res = await fetch('http://localhost:3500/products', {
                // credentials: 'include',
                // method: 'POST',
                // mode: 'cors'
            });
            // console.log(res);
            if(!res.ok) throw Error(res.statusText);
            const users = await res.json();
            returnArray = await users;
        } catch(err) {
            console.log(err)
        }
        setProducts(returnArray)
    }   

    useEffect(() => {
        fetchUsers()
    }, [])


    // const array = users.slice();
    const array = [...products];
    array.sort(function() { return 0.5 - Math.random() });
    console.log(array);
    // setUsers(array);

    // useEffect(fetchUsers(), [])


    return (
        <div>
            <form method="POST" action="http://localhost:4500/login">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/>

                {/* <button type="submit">log on</button> */}
                <input type="submit" value="submit"/>
            </form>
            <ul>
                {products.map((user, i) => {
                    return <li key={'liki' + i}>{user.title}</li>
                })}
            </ul>
        </div>
    );
}

export default App;

import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Lists from './components/Lists/Lists';
import Nav from './components/Nav/Nav';
import SideMenu from './components/SideMenu/SideMenu';

const history = createBrowserHistory();


function Product({brand, title, description_long, image}) {
    const rootImgUrl = 'https:localhost:3500/uploads/products/';
    return ( 
        <div>
            <h3>{brand + ' ' + title}</h3>
            <div dangerouslySetInnerHTML={{ __html: description_long }}/>
            {(image) ? <img src={rootImgUrl + image} alt={title} /> : null}
        </div>
    )
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }



    fetchgroups = async (apiUrl, putIt, extra = '', cb) => {

        fetch(apiUrl + extra)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {

            this.setState({
                [''+putIt]: data,
            })

            if(typeof cb === 'function') {
                cb(data)
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    componentDidMount() {
        this.fetchgroups('http://localhost:3500/products/', 'products');
    }


    render() {
        const { products } = this.state;

        return (
            <Router history={ history }>
                <main>
                    <Nav/>
                    <SideMenu />
                    <Route path={'/lists'} component={Lists} />
                    {products.map((product, i) => {
                        const {brand, title} = product;
                        const url = (brand + '_' + title).replace(/\s+/g, '_')
                        // const img = (product.image) ? product.image : false;
                        return <Route 
                        key={'route'+i}
                        path={`/product/${url}`} 
                        render={() => <Product 
                            {...product}
                            />
                        } />
                    })}
                    <br/>
                    <ul>
                        <li><Link to={'/lists'} >lists</Link></li>
                        {products.map(({brand, title}, i) => {
                            let url = (brand + '_' + title).replace(/\s+/g, '_')
                            return <li key={'link'+i}><Link to={`/product/${url}`}>{brand + ' ' + title}</Link></li>
                        })}
                    </ul>
                </main>
            </Router>
        );
    }
}

export default App;
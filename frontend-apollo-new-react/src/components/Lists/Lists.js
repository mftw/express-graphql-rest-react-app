import React, {
    Component
} from 'react';

import posed, { 
    PoseGroup 
} from 'react-pose';
// import './App.css';

const LiPosed = posed.li();


class App extends Component {

    state = {

        brands:             [],
        productGroups:      [],
        products:           [],

        productUrl:         'http://localhost:3500/products/',
        productBrandsUrl:   'http://localhost:3500/brands/',
        productGroupUrl:    'http://localhost:3500/product-groups/',
    }

    // static getDerivedStateFromProps(props, state) {
    //     // console.log(props);
    //     console.log(state);
    //     return null;
    // }

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

    buildBrandProductTree = (brands, products) => {
        return(
            <ul key={'pose-ffs'}>
                <PoseGroup>
                    {brands.map( (brand, i) => (
                    <LiPosed key={'list' + i}>
                        <div key={'f...pose'}>
                        {brand.title}
                            <ul>
                                {products.map( (product, i) => {
                                    if(product.brand === brand.title) {
                                        return <LiPosed key={'product' + i }>{product.title}</LiPosed>
                                    } else {
                                        return false;
                                    }
                                })}
                                {/* <PoseGroup>
                                </PoseGroup> */}
                            </ul>
                        </div>
                    </LiPosed>
                    ))}
                </PoseGroup>
            </ul>
        )
    }

    buildGroupTree = arr => {
        const sortedArr = arr.sort((a,b) => a.parent_id - b.parent_id)
        return (
            <ul>
                {/* <li><h2>{title}</h2></li> */}
                {sortedArr.map((group, i) => {
                    if(group.parent_id === 0) {
                        return (
                            <li key={'liki' + i}>
                                <div>
                                    {group.title}
                                </div>
                                <ul>
                                    {sortedArr.map((nestedGroup, i) => {
                                        // if(nestedGroup.parent_id === group.parent_id + 1) {
                                        if(nestedGroup.parent_id === group.id) {
                                            return (
                                                <li key={'kili' + i}>
                                                    {nestedGroup.title}
                                                </li>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })}
                                </ul>
                            </li>
                        )
                    } else {
                        return null;
                    }
                })}
            </ul>
        )
    }


    componentDidMount() {
        const { productUrl, productGroupUrl, productBrandsUrl } = this.state;

        this.fetchgroups(productBrandsUrl, 'brands');
        this.fetchgroups(productUrl, 'products');
        this.fetchgroups(productGroupUrl, 'productGroups');
    }

    sortBrands = () => {
        let { brands } = this.state;
        brands.reverse();
        this.setState({
            brands
        })
    }

    sortProducts = () => {
        let { products } = this.state;
        products.reverse();
        this.setState({
            products
        })
    }

    render() {
        const { brands, products, productGroups } = this.state;
        const groupTree = this.buildGroupTree(productGroups);
        const brandProductTree = this.buildBrandProductTree(brands, products);

        return (
            <div>
                <button onClick={this.sortBrands}>Sort Brands</button>
                <button onClick={this.sortProducts}>sort Products</button>
                {/* {brandProductTree} */}
                {groupTree} 
            </div>
        );
    }
}

export default App;
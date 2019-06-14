import React from 'react';
import ComponentWithExtras from '../Helpers/Helpers';
import AuthService from '../Auth/AuthService/AuthHelperMethods';
import ShopContext from './shop-context'; 

class GlobalState extends ComponentWithExtras {
    constructor(props) {
        super(props);

        this.initShownProductsGroup = 'Alle produkter'
        this.AuthService = new AuthService();

        this.state = {
            brands:             [],
            productGroups:      [],
            products:           [],
    
            productUrl:         'http://localhost:3500/products/',
            productBrandsUrl:   'http://localhost:3500/brands/',
            productGroupUrl:    'http://localhost:3500/product-groups/',
    
            // currentShownGroup: 'all',
            currentShownGroup: this.initShownProductsGroup,
    
            // rootProductImgUrl: 'http://localhost:3500/uploads/products/',
    
            rootProductImgUrl: 'http://localhost:3500/',
            userInfo: false,
            cart: [],
            isLoading: true,
        };
    }

    getFromGlobalState = object => {
        return this.state[''+object]
    }

    setGlobalState = object => {
        this.setState(prevState => {
            return {
                ...prevState,
                ...object
            }
        })
    }

    getUserInfo = () => {
        const login = this.AuthService.getConfirm();
        this.setState({
            userInfo: login
        })
        // console.log(login)
        return login 
    }

    logOutUser = () => {
        this.AuthService.logout();
        this.updateGlobalUserInfo();
        // this.setState({
        //     userInfo: false,
        // })
    }

    logInUser = (email, password) => {
        this.AuthService.login(email, password)
    }

    addProductToCart = product => {
        // console.log('Adding product', product);
        const updatedCart = [...this.state.cart];
        const updatedItemIndex = updatedCart.findIndex(
            item => item.id === product.id
        );

        if (updatedItemIndex < 0) {
            updatedCart.push({ ...product, quantity: 1 });
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]
            };
            updatedItem.quantity++;
            updatedCart[updatedItemIndex] = updatedItem;
        }
        // setTimeout(() => {
        // }, 700);
        this.setState({ cart: updatedCart });
        // console.log(updatedCart)
    };

    removeProductFromCart = productId => {
        // console.log('Removing product with id: ' + productId);
        const updatedCart = [...this.state.cart];
        const updatedItemIndex = updatedCart.findIndex(
            item => item.id === productId
        );

        const updatedItem = {
        ...updatedCart[updatedItemIndex]
        };

        updatedItem.quantity--;
        if (updatedItem.quantity <= 0) {
            updatedCart.splice(updatedItemIndex, 1);
        } else {
            updatedCart[updatedItemIndex] = updatedItem;
        }
        this.setState({ cart: updatedCart });
        // setTimeout(() => {
        //     this.setState({ cart: updatedCart });
        // }, 700);
    };

    // sortProducts = group => {
    sortProducts = (group, title ) => {
        this.setState({
            lastProducts: this.state.products, 
            currentShownGroup: title,
            isLoading: true,
        })
        console.log('fetching')
        // console.log(group)
        // this.setState({

        // })

        this.fetchgroups(this.state.productGroupUrl + 'products/' + group, '', '', ({products}) => {
            this.setState({
                products,
                isLoading: true,
            })
            
            console.log('done fetching')
            // this.setState({isLoading: false});
        })
    }

    fetchFromApi = (requestBody) => {
        let headers = {
            'Content-Type': 'application/json'
        }
    
        if(this.AuthService.loggedIn()) {
            headers.Authorization = this.AuthService.getToken();
        }
    
        return fetch("http://localhost:3500/graphql", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(res.json());
              throw new Error('Failed!');
            }
            const data = res.json()
            return data;
        })
        .then(data => {
            return data.data
        })
    }

    getAllProducts = () => {
        const requestProducts = {
            query: `
                query {
                    products {
                        id
                        title
                        description_short
                        brand
                        price
                        image
                        stock
                    }
                }
            `
        }
        // this.fetchFromApi(requestBody).then(data => console.log('data', data))
        this.fetchFromApi(requestProducts).then(data =>
          this.setState({ products: data.products })
        ).catch(error => console.log(error));
    }

    updateGlobalUserInfo = () => {
        const loggedIn = this.AuthService.loggedIn();
        let userInfo = false;
        if(loggedIn) {
            const expired = this.AuthService.isTokenExpired(this.AuthService.getToken());
            if(expired) {
                userInfo = 'expired'
                // console.log(userInfo)
                this.setState({
                    userInfo: userInfo
                })
            } else {
                userInfo = this.AuthService.getConfirm()
                // console.log(userInfo)
                this.setState({
                    userInfo: userInfo
                })
            }
        } else {
            userInfo = false;
            // console.log(userInfo)
            this.setState({
                userInfo: userInfo,
            })
        }
        return userInfo;
    }

    componentDidMount() {
        this.updateGlobalUserInfo();

        this.getAllProducts();

        const requestProductGroups = {
            query: `
                query {
                    productGroups {
                        id
                        parent_id
                        title
                    }
                }
            `
        }

        this.fetchFromApi(requestProductGroups)
            .then(data => {
              // console.log(data.productGroups)
                this.setState({ productGroups: data.productGroups })
            }
        )
        .catch(error => console.log(error));
    }

    render() {
        return (
            <ShopContext.Provider
                value={
                    {
                        ...this.state,
                        fetchgroups: this.fetchgroups,
                        sortProducts: this.sortProducts,
                        getAllProducts: this.getAllProducts,
                        addProductToCart: this.addProductToCart,
                        removeProductFromCart: this.removeProductFromCart,
                        getUserInfo: this.getUserInfo,
                        getFromGlobalState: this.getFromGlobalState,
                        setGlobalState: this.setGlobalState,
                        updateGlobalUserInfo: this.updateGlobalUserInfo,
                        logOutUser: this.logOutUser,
                        fetchFromApi: this.fetchFromApi,
                    }
                }
            >
                {this.props.children}
            </ShopContext.Provider>
        );
    }
}

export default GlobalState;

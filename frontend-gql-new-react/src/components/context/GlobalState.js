import React from 'react';
import ComponentWithExtras from '../Helpers/Helpers';
import AuthService from '../Auth/AuthService/AuthHelperMethods';
import ShopContext from './shop-context'; 

class GlobalState extends ComponentWithExtras {
    constructor(props) {
        super(props);

        this.initShownProductsGroup = {
            title: 'Alle produkter',
            description: 'Hele udvalget du!',
            productCount: 0
        }
        this.AuthService = new AuthService();
        this.authTimer = null;

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

    startAuthExpireTimer = () => {
        clearTimeout(this.authTimer);
        const token = this.AuthService.getConfirm();
        if(!token) {
            return false
        }
        if(this.AuthService.isTokenExpired()) {
            return false
        }
        if(!token.exp) {
            console.log('ohh no');
            return false
        }

        // console.log(token)
        // const timeDiff =  Date.now() / 1000 - token.iat
		// console.log("TCL: GlobalState -> startAuthExpireTimer -> timeDiff", timeDiff)
        const tokenTime = parseInt(token.exp - Date.now() / 1000);
        // const tokenTime = parseInt(token.exp - Date.now() / 1000 - timeDiff);
        // token.tokenTime = tokenTime;    
        // const tokenTime = parseInt(token.exp - (token.exp - token.iat ) - Date.now() / 1000);
		// console.log("TCL: GlobalState -> startAuthExpireTimer -> tokenTime", tokenTime)
        if(tokenTime <= 0) {
            this.AuthService.logout()
            return token
        }
        
        this.authTimer = setTimeout(() => {
            this.updateGlobalUserInfo();
            // this.startAuthExpireTimer();
        }, tokenTime * 1000 + 500)


        return token
    }

    getFromGlobalState = () => {
        return this.state
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
        // const login = this.AuthService.getConfirm();
        // this.setState({
        //     userInfo: login
        // })
        // // console.log(login)
        return this.state.userInfo;
    }

    logOutUser = () => {
        this.AuthService.logout();
        return this.updateGlobalUserInfo();
        // this.setState({
        //     userInfo: false,
        // })
    }

    logInUser = async (email, password) => {
        const request = await this.AuthService.login(email, password)
        this.updateGlobalUserInfo();
        return request
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
            // currentShownGroup: title,
            isLoading: true,
        })
        console.log('fetching')
        // console.log(group)
        // this.setState({

        // })
        const request = {
            query: `
                query {
                    singleProductGroup(productGroupId: "${+group}") {
                        description
                        title
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
                }
            `
        }

        this.fetchFromApi(request)
          .then(data => {
            return data.singleProductGroup;
          })
          .then(data => {
              console.log("TCL: GlobalState -> data", data.products.length)
            this.setState({
              currentShownGroup: {
                title: data.title,
                description: data.description
              },
              products: data.products,
              isLoading: false
            });
          });
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
            // let failed = false;
            // if (res.status !== 200 && res.status !== 201) {
            //     console.log(res.json());
            //     failed = true;
            //       throw new Error('Failed!');
            // }
            const data = res.json()
            // if(failed) {
            //     data.data.error = data
            // }

            return data;
        })
        .then(data => {
            // console.log(data)
            if(data.data) {

                return data.data
            } else {
                return data
            }
        })
    }

    getAllProducts = () => {
        const initShownProductsGroup = this.initShownProductsGroup;
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
        this.setState({
            lastProducts: this.state.products, 
            // currentShownGroup: {
            //     this.initShownProductsGroup
            // },
            isLoading: true,
        })
        // this.fetchFromApi(requestBody).then(data => console.log('data', data))
        this.fetchFromApi(requestProducts)
        .then(data =>
          this.setState({ 
              products: data.products,
              currentShownGroup: {
                ...initShownProductsGroup,
                productCount: data.products.length || 0
            }, 
            isLoading: false,

            })
        ).catch(error => console.log(error));
    }

    updateGlobalUserInfo = () => {
        const loggedIn = this.AuthService.loggedIn();
        let userInfo = false;
        this.startAuthExpireTimer();
        if(loggedIn) {
            const expired = this.AuthService.isTokenExpired(this.AuthService.getToken());
            if(expired) {
                // userInfo = f
                // console.log(userInfo)
                clearTimeout(this.authTimer);
                this.AuthService.logout();
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
            clearTimeout(this.authTimer);

            this.setState({
                userInfo: userInfo,
            })
        }
        return userInfo;
    }

    componentDidMount() {
        this.updateGlobalUserInfo();

        this.getAllProducts();
        // this.startAuthExpireTimer()
        const requestProductGroups = {
            query: `
                query {
                    productGroups {
                        id
                        parent_id
                        title
                        productCount
                    }
                }
            `
        }

        this.fetchFromApi(requestProductGroups)
        .then(data => this.setState({ productGroups: data.productGroups }))
        .catch(error => console.log(error));
    }

    componentWillUnmount() {
        clearTimeout(this.authTimer);
    }

    render() {
        return (
            <ShopContext.Provider
                value={
                    {
                        ...this.state,
                        // fetchgroups: this.fetchgroups,
                        sortProducts: this.sortProducts,
                        getAllProducts: this.getAllProducts,
                        addProductToCart: this.addProductToCart,
                        removeProductFromCart: this.removeProductFromCart,
                        getUserInfo: this.getUserInfo,
                        getFromGlobalState: this.getFromGlobalState,
                        setGlobalState: this.setGlobalState,
                        updateGlobalUserInfo: this.updateGlobalUserInfo,
                        logInUser: this.logInUser,
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

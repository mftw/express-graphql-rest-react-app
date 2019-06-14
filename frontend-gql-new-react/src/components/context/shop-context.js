import React from 'react';
// import helpers from '../Helpers/Helpers';


export default React.createContext({
    // Default data / dummmy data
    brands:             [],
    productGroups:      [],
    products:           [],

    productUrl:         'http://localhost:3500/products/',
    productBrandsUrl:   'http://localhost:3500/brands/',
    productGroupUrl:    'http://localhost:3500/product-groups/',

    currentShownGroup: 'Alle produkter',

    // rootProductImgUrl: 'http://localhost:3500/uploads/products/',

    rootProductImgUrl: 'http://localhost:3500/',

    userInfo: false,
    cart: [],
    addProductToCart: product => {},
    removeProductFromCart: productId => {},
    sortProducts: groups => {}
});
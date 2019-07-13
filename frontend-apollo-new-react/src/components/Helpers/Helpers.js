import { Component } from 'react'

/**
 *  Class that extends component with added functionality
 */
export default class ComponentWithExtras extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    fetchgroups = fetchgroups

    sortByKey = sortByKey

    danishCurrency = danishCurrency;

    // fetchFromApi = fetchFromApi;
    quantityText = quantityText;
}

/**
 *  Function to sort an array by number or string
 * @param {array} array 
 * @param {strin} key 
 */
export function sortByKey(array, key) {
    array.sort(function(a, b) {
        let x = a[key];
        let y = b[key];

        if (typeof x === "string")
        {
            x = (""+x).toLowerCase(); 
        }
        if (typeof y === "string")
        {
            y = (""+y).toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


/**
 *  Function to fetch stuff asynchronously
 * @param {string} apiUrl The url from which to fetch
 * @param {string} putIt The place to putit in state
 * @param {string} extra Add extra to the url
 * @param {function} cb Callback function to parse the fetched data to
 */
export async function fetchgroups(apiUrl, putIt, extra = '', cb) {
    // console.log('vi fetcher')
    try {
        if (putIt && putIt.length !== 0) {
            this.setState({
                ['' + putIt]: [],
                isLoading: true,
            })
        }
        const response = await fetch(apiUrl + extra);
        const data = await response.json();

        if (!response.ok) {
            throw Error(response.statusText);
        }

        if (cb && typeof cb === 'function') {
            cb(data)
            return true;
        } else if (putIt && putIt.length !== 0) {
            this.setState({
                ['' + putIt]: data,
                isLoading: false,
            })
            return data;
        } else {
            return data;
        }

    } catch (error) {
        console.log(error);

        return false;
    }
}

/**
 *  Function to convert a number in "øre" to a danish number format in "kroner" (e.g 1.000,00 DKK)
 * @param {int} price 
 */
export function danishCurrency(price) {
    return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKR' }).format(price / 100)
}

/**
 * 
 * @param {object} requestBody 
 */
export function fetchFromApi(requestBody) {
    let headers = {
        'Content-Type': 'application/json'
    }

    // if(this.AuthService.loggedIn()) {
    //     headers.Authorization = this.AuthService.getToken();
    // }

    return fetch("http://localhost:3500/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {

          throw new Error('Failed!');
        }
        const data = res.json()
        return data;
    })
    .then(data => {
        return data.data
    })
}


export function quantityText(quantity) {
    return quantity + (quantity > 1 ? ' stks' : ' stk')
}
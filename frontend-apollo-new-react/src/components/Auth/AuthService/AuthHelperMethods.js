import decode from 'jwt-decode';

export default class AuthHelperMethods {
    // Initializing important variables

    login = (email, password) => {
        const request = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        token
                    }
                }
            `
        }

        return fetch("http://localhost:3500/graphql", {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            'Content-Type': 'application/json'

          }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
    
                throw new Error('Login Failed!');
            }
            const data = res.json()
            return data;
        })
        .then(res => {
            if(res.data.login) {
                this.setToken(res.data.login.token) // Setting the token in localStorage
            }
            return res.data
        })
    }
    
    signup = (email, password, username) => {
        const request = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}", username: "${username}"}) {
                        id
                    }
                }
            `
        }
        // Get a token from api server using the fetch api
        return fetch("http://localhost:3500/graphql", {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            'Content-Type': 'application/json'

          }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
    
                // throw new Error('Failed!');
                return false
            }
            return true;
        })
    }

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localstorage

        //The double exclamation is a way to cast the variable to a boolean, allowing you to easily check if the token exusts. 
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }

        catch (err) {
            // console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    }

    setToken = (idToken) => {
        if(idToken) {
            // Saves user token to localStorage
            localStorage.setItem('id_token', idToken)
        }
    }

    getToken = () => {
        // Retrieves the user token from localStorage
        // const token 
        return localStorage.getItem('id_token')
    }

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getConfirm = () => {
        // Using jwt-decode npm package to decode the token
        const token = this.getToken()
        if(!token) {
            return false;
        }
        const answer = decode(token);
		// console.log("TCL: getConfirm -> answer", answer)
        // console.log("Recieved answer!");
        return answer;
    }

    fetch = (url, options) => {
        // performs api calls sending the required authentication headers
        // console.log(options)
        const headers = {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
        }
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            // headers['Authorization'] = 'Bearer ' + this.getToken()
            headers['Authorization'] = this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
    }

    _checkStatus = (response) => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
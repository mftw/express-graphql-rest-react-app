import ApolloClient, { InMemoryCache, gql, HttpLink } from "apollo-boost";
// import {  } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';

import { persistCache } from 'apollo-cache-persist';
import React from 'react'
import { ApolloProvider, Query } from 'react-apollo';
// import gql from 'graphql-tag';




// Set up your cache.
const cache = new InMemoryCache();

// Set up cache persistence.
persistCache({
    cache,
    storage: window.localStorage,
});


export const client = new ApolloClient({
  uri: "http://localhost:3500/graphql",
  cache: cache,
  headers: {
    authorization: localStorage.getItem('token'),
  }
});

const GET_PRODUCTGROUPS = gql`
    query {
        productGroups {
            id 
            title
            productCount
        }
    }

`;
  const ApiContext = (props) => {

      return (
          <ApolloProvider client={client}  >
            {/* <Query query={GET_PRODUCTGROUPS} fetchPolicy={'cache-first'} >
                {({ loading, error, data, refetch, networkStatus }) => {
                    // if (loading) return "Loading...";
                    if (loading) return <div>Loading... networkStatus: {networkStatus} <button onClick={() => refetch() }>Refetch!</button></div> ;
                    if (error) {
                        console.log(error)
                        return `Error! ${error.message}`
                    };

                    return (
                        
                        <div>hello111 {data && data.productGroups && data.productGroups[0].title} <button onClick={() => refetch()}>Refetch!</button> </div>
                    );
                }}
            </Query> */}

            {props.children}

          </ApolloProvider>
      )
    }
export default ApiContext;

const { buildSchema } = require('graphql');

/* const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
`; */

module.exports = buildSchema(`

    type RootQuery { 
        products: [Product!]! 
        singleProduct(productId: String): Product!
        getProductRange(from: Int! to: Int!): [Product]!
        brands: [Brand!]! 
        productGroups: [ProductGroup!]!
        singleProductGroup(productGroupId: String): ProductGroup!
        login(email: String!, password: String!): AuthData
        orders: [Order!]!
        validateCreds: AuthValidate!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type AuthValidate {
        authentication: Boolean!
    }

    type User {
        id: ID!
        email: String!
        username: String!
        password: String
        # createdEvents: [Event!]
    }

    input UserInput {
        email: String!
        username: String!
        password: String!
    }

    type OrderProduct {
        id: ID!
        quantity: Int!
        product: Product!
        # brand: String
        # title: String
    }

    input OrderProductInput {
        id: ID!
        quantity: Int!
    }

    type Order {
        id: ID!
        userId: ID!
        quantity: Int!
        date: String!
        products: [OrderProduct!]!
    }

    input OrderInput {
        userId: ID!
        products: [OrderProductInput!]!
    }

    # type Product { 
    #     id: ID!,
    #     title: String!,
    #     item_number: String!, 
    #     brand: String!,
    #     description_short: String!,
    #     description_long: String!,
    #     image: String!,
    #     stock: Int!,
    #     productGroup: Int!,
    #     price: Float!
    # }

    type Product { 
        id: ID!
        title: String!
        item_number: String!
        brand: String!
        # brand: Brand
        description_short: String!
        description_long: String!
        image: String!
        stock: Int!
        productGroup: ProductGroup
        price: Float!
    }

    input ProductInput {
        title: String!
        item_number: String!
        brand: String!
        description_short: String!
        description_long: String!
        stock: Int!
        productGroup: Int!
        price: Float!
    }

    type ProductGroup {
        id: ID!
        parent_id: String
        title: String!
        description: String!
        sortnumber: Int!
        productCount: Int!
        products: [Product]
    }

    input ProductGroupInput {
        parent_id: String
        title: String!
        description: String!
        sortnumber: Int!
    }
    
    type Brand { 
        id: ID!,
        title: String!,
        description: String!
    }


    type RootMutation {
        createUser(userInput: UserInput): User!
        createProduct(productInput: ProductInput): Product!
        createOrder(orderInput: OrderInput): Order!
        # createOrder(orderInput: OrderInput): OrderProduct
        # createEvent(eventInput: EventInput): Event
        # bookEvent(eventId: ID!): Booking!
        # cancelBooking(bookingId: ID!): Event!
    }

    schema {
        query: RootQuery
        # mutation: RootMutation
        mutation: RootMutation
    }
`);


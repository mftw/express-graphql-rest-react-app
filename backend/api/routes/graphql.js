const express = require("express");
const router = express.Router();
// const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const isAuth = require("../middleware/is-auth-req");
// const { graphqlExpress } = require("apollo-server-express");
// const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("../graphql/resolvers");
const typeDefs = require("../graphql/typedefs/typedefs");
// const db = require('../lib/db');
// const db = require('dataloader');

// The GraphQL schema in string form
// const typeDefs = productDef;

// The resolvers
// const resolvers = productRes;
// Put together a schema
// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers
// });

// The GraphQL endpoint
// router.use(bodyParser.json(), graphqlExpress({ schema }));
// router.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//       return res.sendStatus(200);
//     }
//     next();
//   });
// router.use((req, res, next) => {
//     console.log(req.headers)
//     next()
// })

router.use(isAuth);

router.use(
  graphqlHttp({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true
  })
  // bodyParser.json(),
);
// router.use((req, res, next) => {
//   try {
//     graphqlHttp({
//       schema: typeDefs,
//       rootValue: resolvers,
//       graphiql: true
//     })(req, res, next)
//   } catch (error) {
//     console.log("TCL: error", error)
    
//     next(error);
//   }
// }
//   // bodyParser.json(),
// );

// Spit any error out in the api reponses
// router.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });

// router.use(

//   graphqlHttp({
//     schema: typeDefs,
//     rootValue: resolvers,
//     graphiql: true
//   })

//   // bodyParser.json(),
// );


// router.use(
//   // bodyParser.json(),
//   graphqlHttp()
// );

// Make 404 response when dead endpoint
// router.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// Spit any error out in the api reponses
// router.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });

// GraphiQL, a visual editor for queries
// router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

module.exports = router;

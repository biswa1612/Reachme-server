const { ApolloServer, PubSub } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');


const pubsub = new PubSub();
const PORT = process.env.PORT || 5000;


const server = new ApolloServer({                                    //typedefs and resolvers are passed to the apollo server
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDb Connected!!');
        return server.listen({ port: PORT });                           //apollo server opens up at this port
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err)
    })
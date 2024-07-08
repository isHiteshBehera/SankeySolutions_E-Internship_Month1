const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('../GraphQL/Schema/graphqlschema');
const postgres = require('../GraphQL/Schema/postgre');
const initializeWebSocket = require('../websocket');
const sequelize1 = require('../Models/user').sequelize;
const sequelize2 = require('../Models/hotel').sequelize;
const sequelize3 = require('../Models/room').sequelize;
const sequelize4 = require('../Models/booking').sequelize;
const usersRouter = require('../Routes/userRoutes');
const hotelsRouter = require('../Routes/hotelRoutes');
const roomsRouter = require('../Routes/roomRoutes');
const bookingsRouter = require('../Routes/bookingRoutes');
const swagger = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');

const sequelize = Object.assign({}, sequelize1, sequelize2, sequelize3, sequelize4);

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

app.use('/userroutes', usersRouter);
app.use('/hotelroutes', hotelsRouter);
app.use('/roomroutes', roomsRouter);
app.use('/bookingroutes', bookingsRouter);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Hotel API",
      description: 'RESTful API documentation.',
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./routes/*.js",
    "./controllers/*.js",
    "./Resolvers/*.js"],
};

const docs = swaggerjsdoc(options);
app.use(
  "/api-docs",
  swagger.serve,
  swagger.setup(docs)
);

const httpServer = http.createServer(app);

initializeWebSocket(httpServer);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.sync();
    console.log('All models synced successfully');
  } catch (error) {
    console.error('Error syncing models with the database:', error);
  }
});

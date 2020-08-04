const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

const DB_URL = 'mongodb://localhost:27017/testdb';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({
  app,
  path: '/',
});

const PORT = process.env.PORT || 5000;

mongoose.connection.once('open', () => {
  console.log('Successfully connected to database');

  app.listen(PORT, () => {
    console.log(`server started at http://localhost://${PORT}`);
  });
});

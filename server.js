const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
// const { validateTokensMiddleware } = require('./modules/authHelpers/authMiddleware')

// #6 Initialize an Express application
const app = express();

// Allow cross-origin
app.use(cors());

// app.use(validateTokensMiddleware); 


// DB Config
const db = config.get('mongoURI');

const ACCESS_TOKEN_SECRET = config.get('ACCESS_TOKEN_SECRET');

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./modules/graphqlschemas/index');
const resolvers = require('./modules/resolvers/index');

// #5 Initialize an Apollo server
const server = new ApolloServer({ 
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req, res }) => ({ req, res }) 
});

app.use(cookieParser());

app.use((req, _, next) => {
  const accessToken = req.cookies["access-token"];
  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET);
    (req).userId = data.userId;
  } catch {}
  next();
});

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

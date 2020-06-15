# apollo-react-page
Apollo React project with multiple data objects, mongo database and jwt authentification.
Page deployed on heroku https://apollo-page.herokuapp.com/.

## Quick Start
Add your MONGO_URI, email and other data to the default.json file. Make sure you set an env var for that and the jwtSecret on deployment

## Install dependencies for server
`npm install`

## Install dependencies for client
`cd client && npm install`

## Run the client & server with concurrently
`npm run dev`

## Run the Express server only
`npm run server`

## Run the React client only
`npm run client`

## Server runs on http://localhost:5000 and client on http://localhost:3000

## Create build folder for deployment
`cd client && npm run build`



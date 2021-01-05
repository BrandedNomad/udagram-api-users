/**
 * @overview This file represents the server which listens on port 8080. This file contains the following functions and routes
 *
 * Middleware:
 *
 * CORS: Middleware that handles CORS policy
 * Bodyparser: parser json body content
 * IndexRouter: Connects routes with base url /api/v0/
 *
 * Function
 *
 * Database: An async function that initializes the connection to the database
 * Listen: Function that starts the server
 *
 */

import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_FEED_MODELS, V0_USER_MODELS} from './controllers/v0/model.index';


(async () => {
  try{
    await sequelize.addModels(V0_FEED_MODELS);
    await sequelize.addModels(V0_USER_MODELS);
    await sequelize.sync();
  }catch (e) {
    console.log("Cannot connect to database: ",e)
  }


  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "*",//config.url,
  }));

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' );
  } );


  // Start the Server
  app.listen( port, () => {
    console.log( `server running ${config.url}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();

import express from 'express';
import mongoose, { connect } from 'mongoose';
import redis from 'redis';
import { createClient } from "redis";
// init app 
const PORT = 4000;
const app = express();

const REDIS_PORT = '6379'; // Use default Redis port
const REDIS_HOST = 'redis';

const DB_PORT = '27017';
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`


// create a redis client
const redisClient = await createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.connect();

mongoose
    .connect(URI)
    .then(() => console.log('Connected'))
    .catch((err) => console.log('Failed to connect with error: ', err));

app.get('/', (req, res) => res.send('<h1>Hello Mahmoud samir</h1>'));

app.listen(PORT,'0.0.0.0' , () => console.log(`app is up and running on: ${PORT}`));
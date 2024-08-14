const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const routes = require('./routers/api');
const cors = require('cors');
require('dotenv').config();

const app = express(); //set up express

app.use(cors());

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/ninjago');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

app.use('/api', require('./routers/api'));

//error handelling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 3000, () => {
  console.log('now listnning for the request');
});

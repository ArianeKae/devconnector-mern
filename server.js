require ('dotenv').config();
const express = require("express");
const connectDB = require ('./config/db');

const bodyParser = require("body-parser");

const request = require("request");

const app = express ();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(bodyParser.urlencoded({extended: true}));

// app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function () {
  console.log("Server has started successfully at port 5000");
});
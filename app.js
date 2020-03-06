require('dotenv').config();

// import express
let express = require('express');
var multer  = require('multer');
// var path = require('path');
let app=express();
let bodyParser = require('body-parser');

var cors = require('cors');  
var whitelist = ['http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  } 

app.use(cors(corsOptions))
app.use('/uploads', express.static('./uploads'));
// setup server port
var port = process.env.SERVER_PORT || 8080;
// configurasi bodyParser
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json()); 
// initialize first API request
app.get('/',(req,res)=>res.send('Hello world with express and nodemon'));
// import 
// let apiRoutes = require('./src/routers/api-routes');
let apiRoutes = require('./src/routers/index');

app.use('/api',apiRoutes);
// launch app to listed spesified PORT
app.listen(port, function(){
  console.log('running resthub on port '+ port);
})

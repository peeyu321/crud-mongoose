// app.js

const express = require('express');
const bodyParser = require('body-parser');

const urlinfo = require('./routes/urlinfo.route'); // Imports routes for the products
// initialize our express app
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://sampleuser:elpmas761@ds123584.mlab.com:23584/urlinfos';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB)//, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',(err)=>{
   console.log(err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', urlinfo);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

const express = require('express');
const routes = require('./routes/userRoutes'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const app = express(); 
app.use(bodyParser.json()); 
app.use(cors());

app.use('/api', routes); 
module.exports = app; 
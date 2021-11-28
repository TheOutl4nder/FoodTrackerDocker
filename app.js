const express = require('express');
const http = require('http');
const path=require('path');
const dotenv=require('dotenv').config();
const cors=require('cors');

const {restaurantsRoutes}=require('./routes/index');

const router = express.Router();
const app = express();

const port = process.env.PORT || 8080
const host = process.env.HOST || "0.0.0.0"

app.use('/restaurants',restaurantsRoutes);
app.use(cors());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const server = app.listen(port, host, ()=>{
    console.log('server running');
});

module.exports = router;
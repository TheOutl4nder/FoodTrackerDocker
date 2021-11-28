const express = require('express');
const http = require('http');
const path=require('path');
const axios = require('axios');
const dotenv = require("dotenv");
const { restaurantsRoutes } = require('.');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({region:'us-east-1'});

dotenv.config();

const router = express.Router();

router.get("", async (req, res)=>{
    let restaurantQuery = req.query.restaurantQuery;

    console.log(restaurantQuery);
    
    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(restaurantQuery)}%20in%20Guadalajara&type=restaurant&key=${process.env.APIKEY}`,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };
    let reply ={};
    
    await axios(config)
    .then(function (response) {
        reply = {
            statusCode: 200,
            headers: { 
                "Access-Control-Allow-Headers" : "Content-Type", 
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET" 
            },
            body: response.data,
        };
    })
    .catch(function (error) {
        console.log("Valió");
        reply = {
            statusCode: 400,
            headers: { 
                "Access-Control-Allow-Headers" : "Content-Type", 
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET" 
            },
        };
    });
    res.status(200).header("Access-Control-Allow-Origin","*").send(reply);
});

router.get("/photos",async (req, res)=>{
    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.restaurantId}&fields=photos&key=${process.env.APIKEY}`
    };
    let reply ={};
    
    await axios(config)
    .then(function (response) {
        reply = {
            statusCode: 200,
            headers: { 
                "Access-Control-Allow-Headers" : "Content-Type", 
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET" 
            },
            body: response.data,
        };
    })
    .catch(function (error) {
        console.log("Valió");
        reply = {
            statusCode: 400,
            headers: { 
                "Access-Control-Allow-Headers" : "Content-Type", 
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET" 
            },
        };
    });
    res.status(200).header("Access-Control-Allow-Origin","*").send(reply);
});

module.exports = router;
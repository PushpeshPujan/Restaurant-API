const express = require('express');
const app2 = express();
const port = 8900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb://localhost:27017";
const cors = require('cors');
const bodyParser = require('body-parser');
let db;

app2.use(bodyParser.urlencoded({extended:true}));
app2.use(bodyParser.json());
app2.use(cors());

app2.get('/',(req,res) => {
    res.send("<div><a href='http://localhost:8900/location'>Location</a><br/><a href='http://localhost:8900/mealtype'>MealType</a><br/><a href='http://localhost:8900/cuisine'>Cuisine</a><br/><a href='http://localhost:8900/restaurant'>Restaurant</a></div>")
})

//City List
app2.get('/location',(req,res) => {
    db.collection('city').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Meal Type
app2.get('/mealtype',(req,res) => {
    db.collection('mealtype').find({}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//Cusine
app2.get('/cuisine',(req,res) => {
    db.collection('cuisine').find({}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//Restaurant
app2.get('/restaurantDetails',(req,res) => {
    var query = {};
    if(req.query.city && req.query.mealtype){
        query={city:req.query.city,"type.mealtype":req.query.mealtype}
    }
    else if(req.query.city){
        query={city:req.query.city}
    }
    else if(req.query.mealtype){
        query={"type.mealtype":req.query.mealtype}
    }
    db.collection('restaurantData').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app2.get('/restaurantDetails/:id',(req,res) => {
    console.log(req.params.id)
    var query = {_id:req.params.id}
    db.collection('restaurantData').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
});

//orders
app2.get('/orders',(req,res) => {
    db.collection('orders').find({}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
});

//placeorder
app2.post('/placeorder',(req,res) => {
    console.log(">>>><<<<<<<<<<<<<",req.body.name)
    db.collection('orders').insertOne(req.body,(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Added')
        }
    })
})


MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(err);
    db = client.db('restaurants');
    app2.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})
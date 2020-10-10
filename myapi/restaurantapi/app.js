const express=require('express');
const app= express();
const port=8900;
const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;
const mongoUrl="mongodb://localhost:27017";
const cors=require('cors');
let db;
app.use(cors());
/* default url */
app.get('/',(req,res)=>{
    res.send("<div><a href='http://localhost:8900/location'>Location</a><br/><a href='http://localhost:8900/mealtype'>Mealtype</a><br/><a href='http://localhost:8900/cuisine'>Cuisine</a><br/> <a href='http://localhost:8900/restaurantData'>RestaurantData</a><br/></div")
})

//citylist
app.get('/location',(req,res)=>{
    db.collection('city').find({}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})

//meatype
app.get('/mealtype',(req,res)=>{
    db.collection('mealtype').find({}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})

//cuisine

app.get('/cuisine',(req,res)=>{
    db.collection('cuisine').find({}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})

//restaurantData
app.get('/restaurantData',(req,res)=>{
    db.collection('restaurantData').find({}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log(err);
    db=client.db('restaurants');
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log(`App is running on portno ${port}`);
    })
})

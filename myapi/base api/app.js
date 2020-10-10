const express=require('express');
const app= express();
const port=8900;
const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;
const mongoUrl="mongodb://localhost:27017";
const cors=require('cors');
let db;
app.use(cors());

//restaurantData on the basis of city,mealtype,cuisine
app.get('/restaurantList',(req,res)=>{
    var query={};//by default no query
    if(req.query.city){
        query={"city":req.query.city}
    }
    else if(req.query.mealtype){
        query={"type.mealtype":req.query.mealtype}
    }
    else if(req.query.cuisine){
        query={"Cuisine.cuisine":req.query.cuisine}
    }
    db.collection('restaurantData').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})


//restaurantDetails on the basis of id
app.get('/restaurantDetails/:id',(req,res)=>{
    console.log(req.params.id)
     var query={"_id":req.params.id}
     db.collection('restaurantData').find(query).toArray((err,result)=>{
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
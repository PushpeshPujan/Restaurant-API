const express=require('express');
const app3= express();
const port=8900;
const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;
const mongoUrl="mongodb://localhost:27017";
const cors=require('cors');
let db;

app3.use(cors());
//restaurantlisting
app3.get('/restaurantlist/:mealtype',(req,res)=>{
    console.log(req.params.mealtype)
     var query={"type.mealtype":req.params.mealtype}
     var sort={cost:-1};
     let response;
     if(req.query.city && req.query.sort){
        query={"type.mealtype":req.params.mealtype,"city":req.query.city}
        var sort={cost:Number(req.query.sort)};
    }
    else if(req.query.cuisine && req.query.sort){
        query={"type.mealtype":req.params.mealtype,"Cuisine.cuisine":req.query.cuisine}
        var sort={cost:Number(req.query.sort)};
    }
    else if(req.query.lcost && req.query.hcost && req.query.sort){
        query={"type.mealtype":req.params.mealtype,"cost":{$lt:parseInt(req.query.hcost),$gt:parseInt(req.query.lcost)}}
        var sort={cost:Number(req.query.sort)};
    }
    else if(req.query.city ){
        query={"type.mealtype":req.params.mealtype,"city":req.query.city}
      
    }
    else if(req.query.cuisine ){
        query={"type.mealtype":req.params.mealtype,"Cuisine.cuisine":req.query.cuisine}
      
    }
    else if(req.query.lcost && req.query.hcost ){
        query={"type.mealtype":req.params.mealtype,"cost":{$lt:parseInt(req.query.hcost),$gt:parseInt(req.query.lcost)}}
    }

     db.collection('restaurantData').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})

MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log(err);
    db=client.db('restaurants');
    app3.listen(port,(err)=>{
        if(err) throw err;
        console.log(`App is running on portno ${port}`);
    })
})
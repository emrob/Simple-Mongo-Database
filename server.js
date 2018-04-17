const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));


const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

MongoClient.connect("mongodb://localhost:27017", function(err, client) {
  if (err) {
    console.log(err);
    return;
  }
  const db = client.db("emmas_db");

  console.log('Connected to database');

  server.post("/api/food", function(req,res){
    const foodCollection = db.collection("food");
    const foodToSave = req.body;

    foodCollection.save(foodToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log("Saved to DB!");
      res.status(201);
      res.json(foodToSave);
    })
  });

  server.get("/api/food", function(req,res){
    const foodCollection = db.collection("food");
    foodCollection.find().toArray(function(err, allFood){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allFood);
    });
  });

  server.delete("/api/food", function(req,res){
    const foodCollection  = db.collection("food");
    const filterObject = {};
    foodCollection.deleteMany(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

  server.put("/api/food/:id", function(req,res){
    const foodCollection = db.collection("food");
    const objectID = ObjectId(req.params.id);
    const filterObject = { _id: objectID };
    const updatedData = req.body;

    foodCollection.update(filterObject, updatedData, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });
})

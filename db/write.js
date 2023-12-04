const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("./conn");


const collectionName = "wikipedia";
const dbName = "title-link-score";

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb(dbName);
  db_connect
    .collection(collectionName)
    .find({})
    .toArray()
    .then((result) => {
      res.json(result);
    })
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb(dbName);
  let myquery = { _id: req.body.id };
  db_connect
    .collection(collectionName)
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb( dbName);
  let myobj = {
    id: req.body.id,
    title: req.body.title,
    link: req.body.link,
    score: req.body.score,
  };
  db_connect.collection(collectionName).insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb( dbName);
  let myquery = { _id: req.body.id };
  let newvalues = {
    $set: {
        id: req.body.id,
        title: req.body.title,
        link: req.body.link,
        score: req.body.score,
    },
  };
  db_connect
    .collection(collectionName)
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb( dbName);
  let myquery = { _id: req.body.id };
  db_connect.collection(collectionName).deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("chartiq");
        dbo.collection("fsbl").update({ key: req.body.key }, req.body, { upsert: true }, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
  res.sendStatus(200);
});

module.exports = router;

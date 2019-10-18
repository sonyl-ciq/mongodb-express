var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

var express = require('express');
var router = express.Router();

router.delete('/', function(req, res, next) {
    console.log('req.body', req.body)
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("finsemble");
        dbo.collection("finsemble").deleteMany(req.body, true);
        db.close();
    });
  res.sendStatus(200);
});

module.exports = router;

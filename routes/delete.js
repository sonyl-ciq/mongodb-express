var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

var express = require('express');
var router = express.Router();

router.delete('/', function(req, res, next) {
  console.log('DELETE', req.query.key);
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("chartiq");
      dbo.collection("fsbl").deleteOne( { key: req.query.key}, (err, obj) => {
        if (err) throw err;
        db.close();
      });
      
  });
  res.sendStatus(200);
});

module.exports = router;

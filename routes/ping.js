var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (!err) {
            res.json({status: 200});
        } else {
            res.send(err);
        }
    });
});

module.exports = router;

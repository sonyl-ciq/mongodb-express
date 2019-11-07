var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.query.param);
    var keyQuery = new RegExp("^" + req.query.param);
    
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        const dbo = db.db("chartiq");

        dbo.collection("fsbl").find({ key: keyQuery }).toArray((err, result) => {
            res.json(result)
            db.close()
        });
    });
});

module.exports = router;

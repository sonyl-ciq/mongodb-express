var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.query.key);
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        const dbo = db.db("chartiq");

        dbo.collection("fsbl").find({ key: req.query.key }).limit(1).sort({$natural:-1}).toArray((err, result) => {
            if (result.length === 1) {
                console.log(result[0])
                res.json(result[0])
                db.close()
            } else {
                res.json(result)
                db.close()
            }      
        })
    })
});

module.exports = router;

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'); // mongodb connection
var db = require('../model/db');

// READY to build our API

router.get('/', function(req, res) {
    mongoose.model('User').find({}, function (err, users) {
        if (err) {
            console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
        } else {
            res.format({
                json: function () {
                    res.json(users);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    mongoose.model('User').create({
        username: req.body.username,
        password: req.body.password,
        alumnusStatus: false,
        profPoints: 0,
        littles: [],
        initiationClass: 3,
        gradYear: req.body.gradYear
    }, function (err, post) {
        if (err) {
            res.send('Problem adding post to db');
        } else {
            res.redirect('/blog');
        }
    });
})

module.exports = router;
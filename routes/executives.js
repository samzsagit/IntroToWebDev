var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
  res.send({
    "Advisor": "Aaron Wilkin",
  	"President": "Adam Finer",
  	"Vice President": "Jaron Goodman",
  	"Secretary": "Jenna Wohlpart",
  	"Treasurer": "Alex P",
  	"Director of Social Engagement": "Natasha Tepley",
  	"Director of Professional Development": "Carl",
  	"Director of Technology": "Max Kelly",
  	"Director of Management": "Walter"
	});
});

module.exports = router;

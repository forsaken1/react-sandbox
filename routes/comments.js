var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  res.send('comment created');
});

module.exports = router;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json(GLOBAL.db.comments);
});

router.post('/', function(req, res) {
  var comment = req.body.comment;
  GLOBAL.db.comments.push(comment);
  res.json({ result: 'ok', comment: comment });
});

module.exports = router;
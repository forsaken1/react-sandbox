var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var search_text = req.query.search_text;
  var result_collection = [];

  if(search_text) {
    for(var i in GLOBAL.db.products) {
      var regex = new RegExp(search_text);
      var item = GLOBAL.db.products[i];
      
      if(regex.test(item.title)) {
        result_collection.push(item);
      }
    }
  } else {
    result_collection = GLOBAL.db.products;
  }
  res.json(result_collection);
});

module.exports = router;
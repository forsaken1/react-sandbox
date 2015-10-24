var express = require('express');
var router = express.Router();

router.get('/api/todos', function(req, res) {
  res.json(GLOBAL.db.todos);
});

router.get('/api/todos/:id', function(req, res) {
  res.json(GLOBAL.db.todos[req.params.id]);
});

router.delete('/api/todos/:id', function(req, res) {
  GLOBAL.db.todos.splice(req.params.id, 1);
  res.json({ 'result': true });
});

router.post('/api/todos', function(res, req) {
  GLOBAL.db.todos.push({ 
    'message': req.params.message,
    'checked': req.params.checked
  });
  res.json({ 'result': true });
});

router.put('/api/todos/:id', function() {
  GLOBAL.db.todos[req.params.id]['message'] = req.params.message;
  GLOBAL.db.todos[req.params.id]['checked'] = req.params.checked;
  res.json({ 'result': true });
});

router.get('*', function(req, res) {
  res.render('index');
});

module.exports = router;
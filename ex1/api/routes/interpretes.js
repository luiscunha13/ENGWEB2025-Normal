var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicao');

router.get('/', function(req, res, next) {
    Edicao.getInterpretes()
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
  });


module.exports = router;
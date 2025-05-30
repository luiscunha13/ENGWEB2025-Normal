var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicao');

router.get('/', function(req, res, next) {
    if(req.query.org) {
        Edicao.getEdicoesByOrganizador(req.query.org)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error));
    } else {
        Edicao.list()
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error));
    }
});

router.get('/:id', function(req, res, next) {
    Edicao.getEdicaoById(req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});


router.post('/', function(req, res, next) {
    Edicao.insert(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

router.put('/:id', function(req, res, next) {
    Edicao.update(req.body, req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

router.delete('/:id', function(req, res, next) {
    Edicao.delete(req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

module.exports = router;
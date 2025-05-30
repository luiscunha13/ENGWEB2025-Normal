var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicao');

router.get('/', function(req, res, next) {
  const papel = req.query.papel;
  if (!papel || !['org', 'venc'].includes(papel)) {
      return res.status(400).jsonp({error: "O parâmetro 'papel' é obrigatório e deve ser 'org' ou 'venc'"});
  }
  
  Edicao.getPaisesByPapel(papel)
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error));
});


module.exports = router;
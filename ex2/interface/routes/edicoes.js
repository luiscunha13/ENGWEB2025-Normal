const express = require('express');
const router = express.Router();
const axios = require('axios');

// Home page - list all editions
router.get('/', function(req, res, next) {
    axios.get('http://localhost:25000/edicoes')
    .then(resp => {
      res.status(200).render('edicoes', { title: 'Lista de Edições', edicoes: resp.data });
    })
  .catch (error => {
    console.error(error);
    res.status(500).render('error', { error: error });
  });
});

router.get('/paises/:pais', async (req, res, next) => {
  try {
    // Get all editions to filter by country
    const allEdicoes = await axios.get('http://localhost:25000/edicoes');
    
    const pais = req.params.pais;
    
    // Find editions organized by this country
    const edicoesOrganizadas = allEdicoes.data.filter(
      edicao => edicao.organizacao === pais
    );
    
    // Find participations (editions where country had songs)
    const participacoes = [];
    
    allEdicoes.data.forEach(edicao => {
      edicao.musicas.forEach(musica => {
        if (musica.país === pais) {
          participacoes.push({
            edicaoId: edicao.id,
            ano: edicao.anoEdição,
            musica: musica,
            vencedor: edicao.vencedor === pais
          });
        }
      });
    });
    
    res.status(200).render('pais', { 
      title: `País: ${pais}`,
      pais: pais,
      edicoesOrganizadas: edicoesOrganizadas,
      participacoes: participacoes
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: error });
  }
});

// Single edition page
router.get('/:id', function (req, res, next) {

  axios.get(`http://localhost:25000/edicoes/${req.params.id}`)
  .then(response => {
    res.render('edicao', { title: `Edição ${response.data.anoEdição}`,edicao: response.data });
  })
  .catch (error => {
    console.error(error);
    res.status(500).render('error', { error: error })
  });

});



module.exports = router;
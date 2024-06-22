var express = require('express');
var router = express.Router();
var periodoController = require('../controllers/periodos')
var compositorController = require('../controllers/compositores')

router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    periodoController.list()
        .then(resp => {
            res.status(200).render('periodosListPage', {lista: resp, data: d, title: 'Periodos'})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodos'})
        })
});

router.get('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render('registerPeriodoPage', {title: 'Register Periodo', data: d})
});

router.post('/registo', function(req, res, next) {
    periodoController.insert(req.body)
        .then(resp => {
            res.status(200).redirect('/periodos')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodos'})
        })
});

router.get('/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    periodoController.lookUp(req.params.id)
        .then(resp => {
                compositorController.listByPeriodo(req.params.id)
                .then(compositores => {
                    res.status(200).render('periodoPage', {periodo: req.params.id, compositores: compositores, data: d})
                })
                .catch(erro => {
                    res.status(501).render('error', {error: 'Error fetching compositores'})
                })
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodo'})
        })
});

router.get('/edit/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    periodoController.lookUp(req.params.id)
        .then(resp => {
            res.status(200).render('editPeriodoPage', {periodo: resp, data: d, title: 'Edit Periodo'})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodo'})
        })
});

router.post('/edit/:id', function(req, res, next) {
    periodoController.update(req.params.id, req.body)
        .then(resp => {
            res.status(200).redirect('/periodos')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodos'})
        })
});

router.get('/delete/:id', function(req, res, next) {
    periodoController.delete(req.params.id)
        .then(resp => {
            res.status(200).redirect('/periodos')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodos'})
        })
});

module.exports = router;

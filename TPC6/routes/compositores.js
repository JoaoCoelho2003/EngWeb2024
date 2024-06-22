var express = require('express');
var router = express.Router();
const compositorController = require('../controllers/compositores');

/* GET composers listing. */
router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    compositorController.list()
        .then(resp => {
            console.log(resp)
            res.status(200).render('compositoresListPage', {lista: resp, data: d, title: 'Compositores'})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching compositores'})
        })
});

router.get('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render('registerCompositorPage', {data: d, title: 'Register Compositor'})
});

router.post('/registo', function(req, res, next) {
    compositorController.insert(req.body)
        .then(resp => {
            res.status(200).redirect('/compositores')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error creating compositor'})
        })
});

router.get('/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    compositorController.lookUp(req.params.id)
        .then(resp => {
            res.status(200).render('compositorPage', {compositor: resp, data: d})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching compositor'})
        })
    });

router.get('/edit/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    compositorController.lookUp(req.params.id)
        .then(resp => {
            res.status(200).render('editCompositorPage', {compositor: resp, data: d, title: 'Edit Compositor'})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching compositor'})
        })
});

router.post('/edit/:id', function(req, res, next) {
    compositorController.update(req.params.id, req.body)
        .then(resp => {
            res.status(200).redirect('/compositores')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error updating compositor'})
        })
});

router.get('/delete/:id', function(req, res, next) {
    compositorController.delete(req.params.id)
        .then(resp => {
            res.status(200).redirect('/compositores')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error deleting compositor'})
        })
});

module.exports = router;

const express = require('express');
const router = express.Router();

const {
    _200,
    _500
} = require('../class/class_response');

const _class = require('../class/class_product');

router.get('/', async (req, res) => {
    try {
        const resultado = await _class.all_products();
        return res.json(_200(resultado));
    } catch (error) {
        return res.status(500).json(_500());
    }
});



router.get('/category/:id', async (req, res) => {
    try {
        const resultado = await _class.all_products_categories(req.params.id);
        return res.json(_200(resultado));
    } catch (error) {
        return res.status(500).json(_500());
    }
});

router.get('/:id', async (req, res) => {
    try {
        const resultado = await _class.product(req.params.id);
        return res.json(_200(resultado));
    } catch (error) {
        return res.status(500).json(_500());
    }
});

router.get('/related/:id', async (req, res) => {
    try {
        const resultado = await _class.related_product(req.params.id);
        return res.json(_200(resultado));
    } catch (error) {
        return res.status(500).json(_500());
    }
});

module.exports = router;
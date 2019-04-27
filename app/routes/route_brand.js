const express = require('express');
const router = express.Router();

const {
    _200,
    _500
} = require('../class/class_response'); //Status code

const _class = require('../class/class_brand'); // importamos la clase

router.get('/', async (req, res) => { // Se crea la URL amigable
    try {
        const resultado = await _class.all_brands();
        return res.json(_200(resultado)); // Retorna un 200 y la data
    } catch (error) { // en caso dato falle algo retorna un 500
        return res.status(500).json(_500());
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const resultado = await _class.all_products_brands(req.params.id);
        return res.json(_200(resultado));
    } catch (error) {
        return res.status(500).json(_500());
    }
});


module.exports = router;
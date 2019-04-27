const express = require('express');
const router = express.Router();

const {
    _200,
    _500
} = require('../class/class_response');

const _class = require('../class/class_cart');

router.post('/products', async (req, res) => {
    try {
        const resultado = await _class.all_products_cart(JSON.parse(req.body.product));
        return res.json(_200(resultado));
    } catch (error) {
        return res.status(500).json(_500());
    }
});


module.exports = router;
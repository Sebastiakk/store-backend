const express = require('express');
const router = express.Router();

const {
    _200,
    _500
} = require('../class/class_response');

const _class = require('../class/class_categories');

router.get('/', async (req, res) => {
    try {
        const resultado = await _class.all_categories();
        return res.json(_200(resultado));
    } catch (error) {
        return res.status(500).json(_500());
    }
});


module.exports = router;
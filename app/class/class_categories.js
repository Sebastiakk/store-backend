const mysql = require('./MySql');

class class_categories {

    constructor() {}

    async all_categories() {
        try {
            return await mysql.get(`SELECT categorias.id_categoria, categorias.nombre, COUNT( categoria_producto.id_producto ) AS existencias FROM categorias LEFT JOIN categoria_producto ON categoria_producto.id_categoria = categorias.id_categoria WHERE categorias.estado = 'ACTIVO' GROUP BY categorias.id_categoria`);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new class_categories();
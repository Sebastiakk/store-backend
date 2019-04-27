const path = require('path');
const mysql = require(path.join(__dirname, 'Mysql'));
class class_categories {

    constructor() {}
    // Todas estas funciones solo ejecutan un query 
    async all_categories() {
        try {
            return await mysql.get(`SELECT categorias.id_categoria, categorias.nombre,categorias.detalle, COUNT( categoria_producto.id_producto ) AS existencias FROM categorias LEFT JOIN categoria_producto ON categoria_producto.id_categoria = categorias.id_categoria WHERE categorias.estado = 'ACTIVO' GROUP BY categorias.id_categoria`);
        } catch (error) {
            throw new Error(error);
        }
    }

    async category(id) {
        try {
            let data = {};
            let result = await mysql.get(`SELECT categorias.id_categoria, categorias.nombre,categorias.detalle, COUNT( categoria_producto.id_producto ) AS existencias FROM categorias LEFT JOIN categoria_producto ON categoria_producto.id_categoria = categorias.id_categoria WHERE categorias.estado = 'ACTIVO' AND categorias.id_categoria = ? GROUP BY categorias.id_categoria;SELECT marcas.id_marca, marcas.nombre, marcas.logo FROM marcas INNER JOIN producto ON producto.id_marca = marcas.id_marca INNER JOIN categoria_producto ON categoria_producto.id_producto = producto.id_producto WHERE marcas.estado = 'ACTIVO' AND categoria_producto.id_categoria = ? GROUP BY marcas.id_marca ORDER BY marcas.nombre ASC;`, [id, id]);
            Object.assign(data, result[0][0]);
            Object.assign(data, {
                marcas: result[1]
            });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new class_categories();
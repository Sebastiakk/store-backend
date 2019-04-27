const mysql = require('./MySql');

class class_cart {

    constructor() {}

    async all_products_cart(id) {
        try {
            return await mysql.get(`SELECT producto.id_producto, producto.nombre_producto, producto.stock, producto.foto, producto.precio, producto.descripcion, producto.id_marca, producto.estado, producto.fecha_creaciom, marcas.nombre, marcas.logo FROM producto INNER JOIN marcas ON producto.id_marca = marcas.id_marca WHERE producto.id_producto IN ( ? )`, [id]);
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = new class_cart();
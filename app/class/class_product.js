const mysql = require('./MySql');

class class_products {

    constructor() {}

    async all_products() {
        try {
            return await mysql.get(`SELECT producto.*, marcas.nombre, marcas.logo FROM producto INNER JOIN marcas ON producto.id_marca = marcas.id_marca`);
        } catch (error) {
            throw new Error(error);
        }
    }

    async all_products_categories(data) {
        try {
            return await mysql.get(`SELECT producto.id_producto, producto.nombre_producto, producto.stock, producto.foto, producto.precio, producto.descripcion, producto.id_marca, producto.estado, producto.fecha_creaciom FROM producto INNER JOIN categoria_producto ON categoria_producto.id_producto = producto.id_producto WHERE categoria_producto.id_categoria = ?`, data);
        } catch (error) {
            throw new Error(error);
        }
    }

    async product(id) {
        try {
            let data = {};
            let result = await mysql.get(`SELECT producto.id_producto, producto.nombre_producto, producto.stock, producto.foto, producto.precio, producto.descripcion, producto.id_marca, producto.estado, producto.fecha_creaciom, marcas.nombre, marcas.logo FROM producto INNER JOIN marcas ON producto.id_marca = marcas.id_marca WHERE producto.id_producto = ? ;SELECT categorias.id_categoria, categorias.nombre, categorias.detalle, categorias.estado, categorias.fecha_creaciom, categoria_producto.id_producto FROM categorias INNER JOIN categoria_producto ON categoria_producto.id_categoria = categorias.id_categoria WHERE categoria_producto.id_producto =?;`, [id, id]);
            Object.assign(data, result[0][0]);
            Object.assign(data, {
                categories: result[1]
            });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = new class_products();
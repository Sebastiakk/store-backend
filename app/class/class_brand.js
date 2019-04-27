const path = require('path');
const mysql = require(path.join(__dirname, 'Mysql'));
class class_brand {

    constructor() {}
    // Todas estas funciones solo ejecutan un query 
    async all_brands() {
        try {
            return await mysql.get(`SELECT marcas.id_marca, marcas.nombre, marcas.logo FROM marcas WHERE marcas.estado = 'ACTIVO'`);
        } catch (error) {
            throw new Error(error);
        }
    }

    async all_products_brands(id) {
        try {
            let data = {};
            let result = await mysql.get(`SELECT marcas.id_marca, marcas.nombre, marcas.logo, producto.id_producto, producto.nombre_producto, producto.stock, producto.foto, producto.precio, producto.descripcion, producto.id_marca, producto.estado, producto.fecha_creaciom FROM marcas INNER JOIN producto ON producto.id_marca = marcas.id_marca WHERE marcas.estado = 'ACTIVO' AND marcas.id_marca = ? ORDER BY producto.nombre_producto ASC`, id);

            Object.assign(data, {
                brands: {
                    id_marca: result[0].id_marca,
                    nombre: result[0].nombre,
                    logo: result[0].logo,
                },
                products: result
            });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new class_brand();
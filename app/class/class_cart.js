const path = require('path');
const mysql = require(path.join(__dirname, 'Mysql'));
class class_cart {

    constructor() {}
    // Todas estas funciones solo ejecutan un query 
    async all_products_cart(id) {
        try {
            return await mysql.get(`SELECT producto.id_producto, producto.nombre_producto, producto.stock, producto.foto, producto.precio, producto.descripcion, producto.id_marca, producto.estado, producto.fecha_creaciom, marcas.nombre, marcas.logo FROM producto INNER JOIN marcas ON producto.id_marca = marcas.id_marca WHERE producto.id_producto IN ( ? )`, [id]);
        } catch (error) {
            throw new Error(error);
        }
    }
// Esta funcion actualiza el stock de los productos en la BD
// Pero antes de actualizar valida que la cantidad n de productos sea igual o menor para hacer la consulta
// Si en caso cualquier query no se puede ejecutar la funcion devuelve los datos justo antes del la transacción
    async shop(data, callback = (res) => {}) {
        mysql.beginTransaction(async () => {
            try {
                let sql = '',
                    datos = [],
                    error = false;
                for (const i of data) {
                    sql = sql + `UPDATE producto SET stock = (stock - ${i.amount}) WHERE id_producto = ${i.prodct} AND stock >= ${i.amount};`;
                }
                const result = await mysql.update(sql);
                for (const i in result) {
                    if (i.affectedRows === 0) {
                        error = true;
                    }
                }
                if (!error) {
                    mysql.commit();
                    callback(true);
                } else {
                    callback(false);
                }
            } catch (error) {
                console.log(error);
                mysql.rollback();
                callback(error);
            }
        });
    }
}
module.exports = new class_cart();
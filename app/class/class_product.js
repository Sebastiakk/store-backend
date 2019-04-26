const mysql = require('./MySql');

class class_products {

    constructor() {}

    async all_products() {
        try {
            return await mysql.get(`SELECT * FROM producto`);
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = new class_products();
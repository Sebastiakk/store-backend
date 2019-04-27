const colors = require('colors');
const {
    Mysql
} = require('../../configs/constants');

class MySql {
    constructor() {
        this.mysql = require('mysql2');
        this.conexion = this.conectar();
        this.estado();
    }

    conectar() {
        return this.mysql.createConnection({
            host: Mysql.host,
            user: Mysql.user,
            port: Mysql.port,
            password: Mysql.password,
            database: Mysql.database,
            multipleStatements: true,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    estado() {
        this.conexion.connect(function (err) {
            if (err) {
                console.log(colors.red.bold('[MySql] => \t Error en la conexion'))
            } else {
                console.log(colors.green.bold('[MySql] => \t Conectado'))
            }
        });
    }

    get(sql = '', values = []) {
        values = Array.isArray(values) === false ? [values] : values;
        return new Promise((resolve, reject) => {
            let resultado = null;
            this.conexion.query({
                    sql,
                    values
                },
                (err, result, fields) => {
                    if (err) {
                        reject(resultado);
                    } else {
                        resultado = result;
                        resolve(resultado);
                    }
                }
            );
        });
    }

    getOne(sql = '', values = []) {
        values = Array.isArray(values) === false ? [values] : values;
        return new Promise((resolve, reject) => {
            let resultado = null;
            this.conexion.query({
                sql,
                values
            }, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resultado = result[0];
                    if (Array.isArray(resultado)) {
                        if (resultado.length > 0) {
                            resultado = resultado[0];
                        } else {
                            resultado = null;
                        }
                    }
                    resolve(resultado);
                }
            });
        });
    }

    procedureOne(sql = '', values = []) {
        values = Array.isArray(values) === false ? [values] : values;
        return new Promise((resolve, reject) => {
            let resultado = null;
            this.conexion.query({
                    sql,
                    values
                },
                (err, result, fields) => {
                    if (err) {
                        reject(resultado);
                    } else {
                        resultado = result[0];
                        if (Array.isArray(resultado)) {
                            if (resultado.length > 0) {
                                resultado = resultado[0];
                            } else {
                                resultado = null;
                            }
                        }
                        resolve(resultado);
                    }
                }
            );
        });
    }

    procedure(sql = '', values = []) {
        values = Array.isArray(values) === false ? [values] : values;
        return new Promise((resolve, reject) => {
            let resultado = null;
            this.conexion.query({
                    sql,
                    values
                },
                (err, result, fields) => {
                    if (err) {
                        reject(resultado);
                    } else {
                        resultado = result[0];
                        resolve(resultado);
                    }
                }
            );
        });
    }

    query(sql = '', values = []) {
        values = Array.isArray(values) === false ? [values] : values;
        return new Promise((resolve, reject) => {
            let resultado = null;
            this.conexion.query({
                sql,
                values
            }, (err, result, fields) => {
                if (err) {
                    reject(resultado);
                } else {
                    resultado = true;
                    resolve(resultado);
                }
            });
        });
    }

    insert(sql = '', values = []) {
        values = Array.isArray(values) === false ? [values] : values;
        return new Promise((resolve, reject) => {
            this.conexion.query(sql, values, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    update(sql = '', values = []) {
        values = Array.isArray(values) === false ? [values] : values;
        return new Promise((resolve, reject) => {
            this.conexion.query(sql, values, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async describe(tabla, campo) {
        try {
            let opciones = '';
            const i = 6;
            const respuesta = await this.get(`describe ${tabla}`);
            respuesta.forEach(element => {
                if (element.Field === campo) {
                    opciones = element.Type;
                }
            });
            opciones = opciones.slice(0, -2);
            opciones = opciones.substr(i);
            opciones = opciones.split("','");
            return opciones;
        } catch (error) {
            return 'Error';
        }
    }

    beginTransaction(callback = () => {}) {
        this.conexion.beginTransaction((err) => {
            callback(err);
        });
    }

    commit() {
        this.conexion.commit((err) => {
            if (err) {
                return this.rollback(err);
            }
        });
    }

    rollback(error) {
        return this.conexion.rollback(() => {
            error
        });
    }
}

module.exports = new MySql();
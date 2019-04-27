const colors = require('colors');
const {
    Mysql
} = require('../../configs/constants'); // impoertados las credenciales de la base de datos 


// Esta clase Mysql es que nos permite hacer las consultas a la base de datos
class MySql {
    constructor() {
        this.mysql = require('mysql2');
        this.conexion = this.conectar();
        this.estado();
    }

    conectar() { // Retorna la conexion 
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

    estado() { // se conecta a la base dedatos y devuelve el estado
        this.conexion.connect(function (err) {
            if (err) {
                console.log(colors.red.bold('[MySql] => \t Error en la conexion'))
            } else {
                console.log(colors.green.bold('[MySql] => \t Conectado'))
            }
        });
    }
    // Se utiliza solo para los querys [SELECT] 
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
    // Se utiliza solo para los querys [SELECT] pero retorna 1 solo dato en formato JSON y no en Array como en las demas funciones 
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
    // Se utiliza si el procedimiento almacenado retorna un solo dato
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
    // Se utiliza si el procedimiento almacenado trae mas de 1 dato
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
    // Acepta cualquier query 
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
    // se usa solo para hacer quiery de insert
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
    // se usa solo para hacer quiery de update
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
    // Si hay un campo tipo enum esta funcion retorna los valores como un array
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
    // inicia la transacción en la base de datos por si ocurre algun problema en una consulta
    beginTransaction(callback = () => {}) {
        this.conexion.beginTransaction((err) => {
            callback(err);
        });
    }
    // guarda los datos en la DB
    commit() {
        this.conexion.commit((err) => {
            if (err) {
                return this.rollback(err);
            }
        });
    }
    // Restablece los datos al punto justo antes de iniciar la transacción
    rollback(error) {
        return this.conexion.rollback(() => {
            error
        });
    }
}

module.exports = new MySql();
module.exports = {
    Server: {
        puerto: 1105 || process.env.PORT,
        mensaje: function () {
            return `[Server]=> \t Corriendo en el puerto ${this.puerto}`;
        },
    },
    Mysql: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '',
        database: 'store'
    }
};
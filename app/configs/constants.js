module.exports = {
    Server: { //Cofiguracion del serivodr
        puerto: 1234 || process.env.PORT,
        mensaje: function () {
            return `[Server]=> \t Corriendo en el puerto ${this.puerto}`;
        },
    },
    Mysql: { // Credenciales de la base de datos
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'Flakers_824',
        database: 'store'
    }
};
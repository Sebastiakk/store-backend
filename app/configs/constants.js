module.exports = {
    Server: {
        puerto: 1105 || process.env.PORT,
        mensaje: function () {
            return `[Server]=> \t Corriendo en el puerto ${this.puerto}`;
        },
    },
    Mysql: {
        host: 'sql173.main-hosting.eu',
        user: 'u460864145_store',
        port: 3306,
        password: 'Gb8QIn2eRBCU',
        database: 'u460864145_store'
    }
};
module.exports = {
    HOST: "localhost",
    PORT: "1433",
    USER: "sportsxlogin",
    PASSWORD: "123456",
    DB: "sportsx",
    dialect: "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
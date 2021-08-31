module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Clientes", {
        nomeCliente: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        razaoSocial: {
            type: DataTypes.STRING(100),
            unique: true
        },
        CEP: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        classificacao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpfCnpj: {
            type: DataTypes.STRING
        },
        tipoCliente: {
            type: DataTypes.STRING(2)
        }
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false
        });
    return Customer;
};
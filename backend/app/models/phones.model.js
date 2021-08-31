module.exports = (sequelize, DataTypes) => {
    const Phones = sequelize.define("Telefones", {
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false
        });

    return Phones;
};
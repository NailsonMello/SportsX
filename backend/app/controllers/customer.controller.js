const db = require("../models");
const Customer = db.customers;
const Phone = db.phones;
const Op = db.Sequelize.Op;

const { validateData } = require('../util/validators')

// Create and Save a new Customer
const hasCPFCNPJ = async (pfPj) => await Customer.findOne({ where: { cpfCnpj: pfPj } })
const hasEmail = async (email) => await Customer.findOne({ where: { email } })

const validateRequest = async (req, res, idCliente) => {
    const { valid, errors } = validateData(req.body)
    if (!valid) return res.send(errors)
    
    const resultCPFCNPJ = await hasCPFCNPJ(req.body.cpfCnpj)
    const resultEMAIL = await hasEmail(req.body.email)

    if (resultCPFCNPJ !== null && Number(resultCPFCNPJ.id) !== Number(idCliente)) {
        return res.send({
            status: 0,
            message: "Já existe esse CPF ou CNPJ cadastrado!"
        });
    }

    if (resultEMAIL !== null && Number(resultEMAIL.id) !== Number(idCliente)) {
        return res.send({
            status: 0,
            message: "Já existe esse E-mail cadastrado!"
        });
    }
}

exports.create = async (req, res) => {
    // Validate request
    await validateRequest(req, res, null)

    // Create a Customer
    const customer = {
        nomeCliente: req.body.nomeCliente,
        razaoSocial: req.body.razaoSocial,
        CEP: req.body.CEP,
        email: req.body.email,
        classificacao: req.body.classificacao,
        cpfCnpj: req.body.cpfCnpj,
        tipoCliente: req.body.tipoCliente
    };

    const telefones = req.body.telefones;

    // Save Customer in the database
    Customer.create(customer)
        .then(data => {
            const listTelefones = telefones.split(',')
                .map((item) => Number(item.trim()))
                .map((telefone) => {
                    return {
                        telefone,
                        idCliente: data.id,
                    }
                });
            listTelefones.forEach(tel => {
                Phone.create(tel)
                    .then(result => {
                    })
                    .catch(err => {
                        res.send({
                            message: err.message || "Ocorreu algum erro ao criar o telefone."
                        });
                    });
            });
            const result = {
                nomeCliente: data.nomeCliente,
                razaoSocial: data.razaoSocial,
                CEP: data.CEP,
                email: data.email,
                classificacao: data.classificacao,
                cpfCnpj: data.cpfCnpj,
                tipoCliente: data.tipoCliente,
                telefones: listTelefones
            }
            res.status(201).send({
                status: 1,
                message: `Cliente ${data.nomeCliente} adicionado com sucesso!`,
                data: result
            });
        })
        .catch(err => {
            res.send({
                message:
                    err.message || "Ocorreu algum erro ao criar o cliente."
            });
        });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    const nomeCliente = req.query.nomeCliente;
    var condition = nomeCliente ? { nomeCliente: { [Op.like]: `%${nomeCliente}%` } } : null;

    Customer.hasMany(Phone, { foreignKey: 'idCliente' })
    Customer.findAll({ where: condition, include: [Phone] })
        .then(data => {
            let result = []
            data.forEach(e => {
                result.push({
                    idCliente: e.id,
                    nomeCliente: e.nomeCliente,
                    razaoSocial: e.razaoSocial,
                    CEP: e.CEP,
                    email: e.email,
                    classificacao: e.classificacao,
                    cpfCnpj: e.cpfCnpj,
                    tipoCliente: e.tipoCliente,
                    telefones: e.Telefones.map(item => item.telefone)
                })
            })
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro ao recuperar clientes."
            });
        });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Customer.hasMany(Phone, { foreignKey: 'idCliente' })
    Customer.findOne({ where: { id }, include: [Phone] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao recuperar o cliente com id=" + id
            });
        });
};

// Update a Customer by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    // Validate request
    await validateRequest(req, res, id)

    const customer = {
        nomeCliente: req.body.nomeCliente,
        razaoSocial: req.body.razaoSocial,
        CEP: req.body.CEP,
        email: req.body.email,
        classificacao: req.body.classificacao,
        cpfCnpj: req.body.cpfCnpj,
        tipoCliente: req.body.tipoCliente
    };

    const telefones = req.body.telefones;
    Phone.destroy({
        where: { idCliente: id }
    })

    Customer.update(customer, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                const listTelefones = telefones.split(',')
                    .map((item) => Number(item.trim()))
                    .map((telefone) => {
                        return {
                            telefone,
                            idCliente: id,
                        }
                    });
                listTelefones.forEach(tel => {
                    Phone.create(tel)
                        .then(result => {
                        })
                        .catch(err => {
                            res.send({
                                message: err.message || "Ocorreu algum erro ao criar o telefone."
                            });
                        });
                });

                res.status(200).send({
                    message: `Cliente ${customer.nomeCliente} alterado com sucesso!`
                });
            } else {
                res.send({
                    message: `Não é possível alterar o cliente com id=${id}. Talvez o cliente não tenha sido encontrado!`
                });
            }
        })
        .catch(err => {
            res.send({
                message: "Erro ao atualizar o cliente com id=" + id
            });
        });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Phone.destroy({
        where: { idCliente: id }
    })
    Customer.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    status: 1,
                    message: "Cliente excluido com sucesso!"
                });
            } else {
                res.send({
                    status: 0,
                    message: `Não é possível excluir o cliente com id=${id}. Talvez o cliente não tenha sido encontrado!`
                });
            }
        })
        .catch(err => {
            res.send({
                status: 0,
                message: "Não foi possível excluir o cliente com id=" + id
            });
        });
};
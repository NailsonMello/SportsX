
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false
}
const isEmpty = (string) => {
    if (string === undefined|| string.trim() === '') return true
    else return false
}

// Validate fields
exports.validateData = (data) => {
    let errors = {}

    if (isEmpty(data.nomeCliente))
        errors.message = "O campo nome cliente não pode ser vazio!"

    if (isEmpty(data.email))
        errors.message = "O campo email não pode ser vazio!"
    else if (!isEmail(data.email))
        errors.message = 'O email informado é invalido!'

    if (isEmpty(data.classificacao))
        errors.message = "O campo classificacao não pode ser vazio!"

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}
const maskCPF = (v) => {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return v
}

const maskCNPJ = (v) => {
    v = v.replace(/\D/g, "")
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
    v = v.replace(/(\d{4})(\d)/, "$1-$2")
    return v
}


export const validateCpfORCnpj = (value) => {
    let formatted = value.length <= 14 ? maskCPF(value) : maskCNPJ(value)
    return formatted
}

export const maskPhone = tel => {
    let number = tel
    number = number.replace(/\D/g, '')
    number = number.replace(/(.{0})(\d)/, '$1($2')
    number = number.replace(/(.{3})(\d)/, '$1)$2')
    number = number.replace(/(.{4})(\d)/, '$1 $2')
    if (number.length === 13) {
        number = number.replace(/(.{4})$/, '-$1')
    } else if (number.length === 14) {
        number = number.replace(/(.{4})$/, '-$1')
    }
    return number
}

export const maskZipCode = v => {

    v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{2})(\d)/,"$1-$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1-$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    return v
}
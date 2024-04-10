const Modalidade = require("../models/modalidade");

module.exports.list = () => {
    return Modalidade
        .find()
        .sort({ nome: 1 })
        .exec();
}

module.exports.findById = id => {
    return Modalidade
        .findOne({ _id: id })
        .exec();
}

module.exports.insert = modalidade => {
    if ((Modalidade.findOne({nome: modalidade.nome}).exec()) != null) {
        var newModalidade = new Modalidade(modalidade)
        return newModalidade.save()
    }
    else {
        return null
    }
}

module.exports.update = (id, modalidade) => {
    return Modalidade
        .findByIdAndUpdate(id, modalidade, { new: true })
        .exec();
}

module.exports.remove = id => {
    return Modalidade
        .findByIdAndDelete(id)
        .exec();
}

module.exports.addPessoa = (nome, person) => {
    return Modalidade
        .findOneAndUpdate({nome: nome}, {$push: {pessoas: person.id}})
        .exec()
}

module.exports.listPerOrder = () => {
    return Modalidade
        .find()
        .sort({ nome: 1 })
        .exec()
        .then(modalidades => {
            var modalidadesList = []
            var last = ""
            modalidades.forEach(modalidade => {
                if (modalidade.nome != last) {
                    modalidadesList.push(modalidade)
                    last = modalidade.nome
                }
            })
            return modalidadesList
        })
}


module.exports.getPessoasPerModalidade = () => {
    return Modalidade
        .find()
        .sort({ nome: 1 })
        .exec()
        .then(modalidades => {
            var modalidadesList = []
            var last = ""
            modalidades.forEach(modalidade => {
                if (modalidade.nome != last) {
                    modalidadesList.push(modalidade)
                    last = modalidade.nome
                }
            })
            return modalidadesList
        })
        .then(modalidades => {
            var pessoas = []
            modalidades.forEach(modalidade => {
                modalidade.pessoas.forEach(pessoa => {
                    pessoas.push(pessoa)
                })
            })
            return pessoas
        })
        .then(pessoas => {
            return pessoas.sort()
        })
}




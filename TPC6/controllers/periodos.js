var Periodo = require('../models/periodo');

module.exports.list = () => {
    return Periodo
        .find()
        .sort({_id: 1})
        .exec();
}

module.exports.lookUp = id => {
    return Periodo
        .findOne({_id: id})
        .exec();
}

module.exports.insert = periodo => {
    if(Periodo.findOne({_id: periodo.id}).length == 1){
        throw new Error("Periodo já existe");
    }
    var novo = new Periodo(periodo);
    return novo.save();
}

module.exports.delete = id => {
    return Periodo.deleteOne({_id: id}).exec();
}

module.exports.update = (id, periodo) => {
    return Periodo.updateOne({_id : id}, periodo).exec();
}
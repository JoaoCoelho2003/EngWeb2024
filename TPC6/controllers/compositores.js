var Compositor = require('../models/compositor');

module.exports.list = () => {
    return Compositor
        .find()
        .sort({nome: 1})
        .exec();
    
}

module.exports.lookUp = id => {
    return Compositor
        .findOne({_id: id})
        .exec();
}

module.exports.listByPeriodo = periodo => {
    return Compositor
        .find({periodo: periodo})
        .sort({nome: 1})
        .exec();
}

module.exports.insert = compositor => {
    if ((Compositor.findOne({_id: compositor._id}).exec()) != null) {
        var novo = new Compositor(compositor)
        return novo.save()
    }
    else {
        return null
    }
}

module.exports.delete = id => {
    return Compositor.deleteOne({_id: id}).exec();
}

module.exports.update = (id, compositor) => {
    return Compositor.updateOne({_id: id}, compositor).exec();
}
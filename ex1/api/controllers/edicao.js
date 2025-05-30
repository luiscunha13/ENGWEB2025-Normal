var Edicao = require('../models/edicao');

module.exports.list = () => {
    return Edicao.find()
        .sort({anoEdição: 1})
        .exec();
}

module.exports.getEdicaoById = id => {
    return Edicao.findById(id).exec();
}

module.exports.getEdicoesByOrganizador = org => {
    return Edicao.find({organizacao: org}, {
        anoEdição: 1,
        organizacao: 1,
        vencedor: 1,
        _id: 0
    })
    .sort({anoEdição: 1})
    .exec();
}

module.exports.getPaisesOrganizadores = () => {
    return Edicao.aggregate([
        { $group: { 
            _id: "$organizacao",
            anos: { $push: "$anoEdição" }
        }},
        { $sort: { _id: 1 } },
        { $project: {
            _id: 0,
            país: "$_id",
            anos: 1
        }}
    ]).exec();
}

module.exports.getPaisesVencedores = () => {
    return Edicao.aggregate([
        { $group: { 
            _id: "$vencedor",
            anos: { $push: "$anoEdição" }
        }},
        { $sort: { _id: 1 } },
        { $project: {
            _id: 0,
            país: "$_id",
            anos: 1
        }}
    ]).exec();
}

module.exports.getPaisesByPapel = (papel) => {
    const field = papel === 'org' ? 'organizacao' : 'vencedor';
    return Edicao.aggregate([
        { $group: { 
            _id: `$${field}`,
            anos: { $push: "$anoEdição" }
        }},
        { $sort: { _id: 1 } },
        { $project: {
            país: "$_id",
            anos: 1,
            _id: 0
        }}
    ]).exec();
}

module.exports.getInterpretes = () => {
    return Edicao.aggregate([
        { $unwind: "$musicas" },
        { $group: {
            _id: "$musicas.intérprete",
            país: { $first: "$musicas.país" }
        }},
        { $sort: { _id: 1 } },
        { $project: {
            intérprete: "$_id",
            país: 1,
            _id: 0
        }}
    ]).exec();
}

module.exports.insert = edicao => {
    var edicaoToSave = new Edicao(edicao);
    return edicaoToSave.save();
}

module.exports.update = (edicao, id) => {
    return Edicao.findOneAndUpdate({id: id}, edicao, {new: true}).exec();
}

module.exports.delete = id => {
    return Edicao.findOneAndDelete({id: id}).exec();
}
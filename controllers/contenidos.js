const { response, request} = require('express');
const { validationResult } = require('express-validator');

const Contenido = require('../models/content');
const {ValidarCampos, validarSince, validarLimit} = require('../middlewares/validate-fields');
const usuario = require('../models/user');

//MÉTODOS GET
const getContentsByType = async (req = request, res = response) => {
//Dynamic query fot the type content
    const { limit = 10, since = 0} = req.query;
    const query = {type: req.type};
    //It runs simultaneously
    const [ total, contenidos ] = await Promise.all([
        Contenido.find(query)
            .skip( since )
            .limit( limit ),
        Contenido.countDocuments(query)
    ])
    res.json({
        total,
        contenidos
    });
} 
const getContentsByTopic = async (req = request, res = response) => {
    //Dynamic query for the topic content
    const { limit = 10, since = 0} = req.query;
    const query = {topic: req.topic};
    //It runs simultaneously
    const [ total, contenidos ] = await Promise.all([
        Contenido.find(query)
                .skip( since )
                .limit( limit )
    ])
    res.json({
        total,
        contenidos
    });
}
const getContentsByStatus = async (req = request, res = response) => {
    //Dynamic query for the content status (approved or not)
    const { limit = 10, since = 0} = req.query;
    const query = {status: req.status};
    //It runs simultaneously
    const [ total, contenidos ] = await Promise.all([
        Contenido.find(query)
                 .skip( since )
                 .limit( limit )
    ])
    res.json([
        total,
        contenidos
    ]);
}

const getContentHiglight = async (req = request, res = response) => {
    //find a content by their id
    const { id } = req.params;
    const { __id, image, title, content, ...resto} = req.body;

    //extracts a frament of about 50 characters of "content"
    const contentFragment =  content.substring(0, 50);

    res.json({
        title,
        image,
        content: contentFragment
    });
} 

const getContentApprovedBy = async (req = request, res = response) => {
    //Dynamic query for the editor who has approved the content
    const { limit = 10, since = 0} = req.query;
    const query = { approved_by: req.approved_by};
    //It runs simultaneously
    const [ total, contenidos ] = await Promise.all([
        Contenido.find(query)
                .skip( since )
                .limit( limit )
    ])
    res.json([
        total,
        contenidos
    ])
}

//AUTHOR PAGE
const getContentApprovedCreatedBy = async (req = request, res = response) => {
    //Dynamic query for the author who has created the content
    const { limit = 10, since = 0} = req.query;
    const query = { author: req.author, status: true };
    //It runs simultaneously
    const [ total, contenidos ] = await Promise.all([
        Contenido.find(query)
                 .skip( since )
                 .limit( limit )
    ])
    res.json([
        total,
        contenidos
    ])
}
const getContentToBeApprovedCreatedBy = async (req = request, res = response) => {
    //Dynamic query for the editor who has approved the content
    const { limit = 10, since =0 } = req.query;
    const query = { author: req.author, status: false };
    //It runs simultaneously
    const [total, contenidos ] = await Promise.all([
        Contenido.find(query)
                 .skip( since )
                 .limit( limit )
    ])
    res.json([
        total,
        contenidos
    ])
}

async function contentsPost(req, res = response) {
    const {
        title,
        content,
        image,
        link, 
        topic, 
        type
    } = req.body;

    const contenido = new Contenido({title,
                                     content,
                                     image,
                                     link,
                                     topic,
                                     type});
    await contenido.save();
    res.json({
        contenido
    });
}

const contentsPut = async (req, res = response) => {
    const { id } = req.params;
    const { __id, title, topic, type, ...resto } = req.body;

    const contenido = await Contenido.findByIdAndUpdate( id, resto )

    res.json(contenido);
}


const approveContent = async (req, res = response) => {
    //A content is approved when their status is true,
    //when is not, false.
    const { id } = req.params;
    //Every content includes an id that identifies it
    const content = await Contenido.findByIdAndUpdate( id, {status: req.status});

    res.json( usuario );
}

module.exports = {
    getContentsByType,
    getContentsByTopic,
    getContentsByStatus,
    getContentHiglight,
    getContentApprovedBy,
    getContentApprovedCreatedBy,
    getContentToBeApprovedCreatedBy,
    contentsPost,
    contentsPut,
    approveContent
}